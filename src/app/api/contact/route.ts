import { randomBytes, randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/contact-schema";
import { validateConsent, validateEmail, validateName, validatePhone } from "@/lib/validation";

export const dynamic = "force-dynamic";

const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < 60_000);
  list.push(now);
  hits.set(key, list);
  return list.length > 6;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const values = {
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone),
    subject: str(body.subject),
    message: str(body.message),
    consent: body.consent === true,
  };

  const errors: Record<string, string> = {};
  const nameError = validateName(values.name, "your name");
  if (nameError) errors.name = nameError;
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;
  if (values.phone.trim()) {
    const phoneError = validatePhone(values.phone);
    if (phoneError) errors.phone = phoneError;
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please tell us a little more so we can help.";
  }
  if (values.message.length > 4000) {
    errors.message = "Please keep your message under 4000 characters.";
  }
  if (!values.subject || values.subject.length > 120) {
    errors.subject = "Please choose a subject.";
  }
  const consentError = validateConsent(values.consent);
  if (consentError) errors.consent = consentError;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  try {
    await db.insert(contactMessages).values({
      id: randomUUID() || `m-${randomBytes(8).toString("hex")}`,
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim() || null,
      subject: values.subject.trim(),
      message: values.message.trim(),
      consent: 1,
    });
  } catch (error) {
    console.error("Failed to store contact message", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message just now. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
