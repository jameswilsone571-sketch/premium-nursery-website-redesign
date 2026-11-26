import { randomBytes, randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { calculateAge, parseDate, recommendRoom } from "@/lib/age";
import { rooms } from "@/content/rooms";
import {
  validateConsent,
  validateDob,
  validateEmail,
  validateName,
  validatePhone,
  validateRequired,
  validateStartDate,
} from "@/lib/validation";

export const dynamic = "force-dynamic";

/** Best-effort in-memory rate limit (per instance). */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_HITS = 8;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_HITS;
}

function makeReference(): string {
  const d = new Date();
  const stamp =
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  const suffix = randomBytes(2).toString("hex").toUpperCase();
  return `LL-${stamp}-${suffix}`;
}

type Body = Record<string, unknown>;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never see this field.
  if (asString(body.website).trim().length > 0) {
    return NextResponse.json({ ok: true, reference: "LL-DEMO-0000" });
  }

  const clientToken = asString(body.clientToken).trim();
  if (!clientToken || clientToken.length > 64) {
    return NextResponse.json(
      { ok: false, errors: { form: "Please try submitting the form again." } },
      { status: 400 },
    );
  }

  const values = {
    parentName: asString(body.parentName),
    email: asString(body.email),
    phone: asString(body.phone),
    contactMethod: asString(body.contactMethod),
    childName: asString(body.childName),
    dob: asString(body.dob),
    startDate: asString(body.startDate),
    enquiryType: asString(body.enquiryType),
    preferredDays: Array.isArray(body.preferredDays)
      ? (body.preferredDays as unknown[]).filter((d): d is string => typeof d === "string")
      : [],
    additionalInfo: asString(body.additionalInfo),
    questions: asString(body.questions),
    consent: body.consent === true,
  };

  // ---- Server-side validation (never trust the browser) ----
  const errors: Record<string, string> = {};
  const nameError = validateName(values.parentName, "your full name");
  if (nameError) errors.parentName = nameError;
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;
  const phoneError = validatePhone(values.phone);
  if (phoneError) errors.phone = phoneError;
  const methodError = validateRequired(
    values.contactMethod,
    "Please choose how you would like us to contact you.",
  );
  if (methodError) errors.contactMethod = methodError;
  if (!["Phone call", "Email", "Text message"].includes(values.contactMethod)) {
    errors.contactMethod = "Please choose how you would like us to contact you.";
  }

      const childError = validateName(values.childName, "your child's first name");
      if (childError) errors.childName = childError;
  const dobError = validateDob(values.dob);
  if (dobError) errors.dob = dobError;
  const startError = validateStartDate(values.startDate);
  if (startError) errors.startDate = startError;

  const typeError = validateRequired(values.enquiryType, "Please choose the type of enquiry.");
  if (typeError) errors.enquiryType = typeError;
  if (
    ![
      "Book a nursery visit",
      "Enquire about availability",
      "Request childcare information",
    ].includes(values.enquiryType)
  ) {
    errors.enquiryType = "Please choose the type of enquiry.";
  }

  const consentError = validateConsent(values.consent);
  if (consentError) errors.consent = consentError;

  const allowedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const preferredDays = values.preferredDays.filter((d) => allowedDays.includes(d));

  // ---- Age + room recommendation recomputed on the server ----
  const match = recommendRoom(values.dob, rooms);
  const dob = parseDate(values.dob);
  const age = dob ? calculateAge(dob) : null;

  if (!age || !dob) {
    errors.dob = errors.dob || "Please enter your child's date of birth.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const reference = makeReference();

  try {
    await db
      .insert(enquiries)
      .values({
        id: randomUUID(),
        reference,
        clientToken,
        source: "booking",
        parentName: values.parentName.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        contactMethod: values.contactMethod,
        childName: values.childName.trim(),
        dob: values.dob,
        ageMonths: age!.months,
        ageLabel: age!.label,
        roomSlug: match.status === "matched" ? match.room.slug : null,
        roomName:
          match.status === "matched" ? match.room.name : "To be reviewed by the nursery team",
        startDate: values.startDate,
        enquiryType: values.enquiryType,
        preferredDays: preferredDays.join(", ") || null,
        message: [values.additionalInfo, values.questions]
          .map((s) => s.trim())
          .filter(Boolean)
          .join("\n\n"),
        consent: 1,
      })
      .onConflictDoNothing({ target: enquiries.clientToken });
  } catch (error) {
    console.error("Failed to store enquiry", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send your enquiry just now. Please try again in a moment, or call the nursery directly.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, reference }, { status: 201 });
}
