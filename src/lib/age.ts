import type { Room } from "@/content/rooms";

export type AgeResult = {
  /** Completed months between the date of birth and today */
  months: number;
  years: number;
  remainingMonths: number;
  label: string;
};

export type RoomMatch =
  | { status: "matched"; room: Room; age: AgeResult; reason: string }
  | { status: "review"; age: AgeResult | null; reason: string }
  | { status: "invalid"; reason: string };

const DAY = 86_400_000;

/** Parse a yyyy-mm-dd string into a local Date (avoids UTC off-by-one). */
export function parseDate(value: string): Date | null {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) {
    return null;
  }
  return d;
}

export function today(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

export function isFutureDate(d: Date): boolean {
  return d.getTime() > today().getTime();
}

/** Age in completed months between two dates. */
export function monthsBetween(dob: Date, ref: Date = today()): number {
  let months = (ref.getFullYear() - dob.getFullYear()) * 12 + (ref.getMonth() - dob.getMonth());
  if (ref.getDate() < dob.getDate()) months -= 1;
  return Math.max(0, months);
}

export function calculateAge(dob: Date, ref: Date = today()): AgeResult {
  const months = monthsBetween(dob, ref);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years === 1 ? "" : "s"}`);
  if (years === 0 || remainingMonths > 0) {
    parts.push(`${remainingMonths} month${remainingMonths === 1 ? "" : "s"}`);
  }
  return { months, years, remainingMonths, label: parts.join(" ") };
}

export function formatDisplayDate(value: string): string {
  const d = parseDate(value);
  if (!d) return "";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatLongDate(value: string): string {
  const d = parseDate(value);
  if (!d) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Describe a month band as human copy, e.g. "0–24 months". */
export function describeBand(room: Room): string {
  const lower = room.minMonths;
  const upper = room.maxMonths;
  if (upper % 12 === 0 && lower % 12 === 0) {
    const lo = lower / 12;
    const hi = upper / 12;
    return `${lo}–${hi} year${hi === 1 ? "" : "s"} (${lower}–${upper} months)`;
  }
  return `${lower}–${upper} months`;
}

/**
 * IF/ELSE room eligibility.
 *
 * Ranges are evaluated against completed months and are non-overlapping:
 *   if   age >= min && age < max   -> matched to that room
 *   else                           -> the nursery team must review
 */
export function recommendRoom(dobInput: string, configuredRooms: Room[]): RoomMatch {
  const dob = parseDate(dobInput);
  if (!dob) {
    return { status: "invalid", reason: "Please enter your child's date of birth." };
  }
  if (isFutureDate(dob)) {
    return {
      status: "invalid",
      reason: "Please enter a date of birth that is not in the future.",
    };
  }
  const age = calculateAge(dob);

  // Guard against obviously wrong entries (a typo in the year).
  if (age.months > 96) {
    return {
      status: "review",
      age,
      reason:
        "Based on the date of birth provided, our team will need to review the most suitable room for your child.",
    };
  }

  const sorted = [...configuredRooms].sort((a, b) => a.minMonths - b.minMonths);
  for (const room of sorted) {
    if (age.months >= room.minMonths && age.months < room.maxMonths) {
      return {
        status: "matched",
        room,
        age,
        reason: `${age.label} old — within the ${room.name} range of ${describeBand(room)}.`,
      };
    }
  }

  return {
    status: "review",
    age,
    reason:
      "Based on the date of birth provided, our team will need to review the most suitable room for your child.",
  };
}

export function ageLabelFromMonths(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years === 1 ? "" : "s"}`);
  if (years === 0 || rest > 0) parts.push(`${rest} month${rest === 1 ? "" : "s"}`);
  return parts.join(" ") || "under 1 month";
}

export { DAY };
