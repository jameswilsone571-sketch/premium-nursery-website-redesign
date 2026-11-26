import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COOKIE = "nursery_admin";

function adminKey(): string {
  return process.env.ADMIN_KEY || "nursery-demo-key";
}

function sessionToken(): string {
  return createHash("sha256").update(`nursery:${adminKey()}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: Request) {
  let body: { key?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const supplied = typeof body.key === "string" ? body.key : "";
  if (!safeEqual(supplied, adminKey())) {
    return NextResponse.json({ ok: false, error: "That key was not recognised." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
