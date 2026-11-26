export type Errors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(value: string): string | null {
  const v = value.trim();
  if (!v) return "Please provide a valid email address.";
  if (!EMAIL_RE.test(v)) return "Please provide a valid email address.";
  if (v.length > 254) return "Please provide a valid email address.";
  return null;
}

/** UK-friendly phone validation: digits, spaces, +, (), - ; 10–15 digits. */
export function validatePhone(value: string): string | null {
  const v = value.trim();
  if (!v) return "Please provide a contact telephone number.";
  if (!/^[0-9+\-() ]+$/.test(v)) {
    return "Please use numbers only, for example 01234 567890.";
  }
  const digits = v.replace(/\D/g, "");
  if (digits.length < 10) return "Please enter a full telephone number, for example 01234 567890.";
  if (digits.length > 15) return "Please check the telephone number you have entered.";
  return null;
}

export function validateName(value: string, field = "name"): string | null {
  const v = value.trim();
  if (!v) return `Please enter the ${field}.`;
  if (v.length < 2) return `Please enter the ${field}.`;
  if (v.length > 120) return `Please keep the ${field} under 120 characters.`;
  return null;
}

export function validateRequired(value: string, message: string): string | null {
  return value.trim() ? null : message;
}

export function validateDob(value: string, now = new Date()): string | null {
  if (!value) return "Please enter your child's date of birth.";
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return "Please enter your child's date of birth.";
  }
  const [y, m, d] = parts;
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return "Please check the date of birth you have entered.";
  }
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (date.getTime() > today.getTime()) {
    return "Your child's date of birth can't be in the future.";
  }
  const min = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
  if (date.getTime() < min.getTime()) {
    return "Please check the date of birth you have entered.";
  }
  return null;
}

export function validateStartDate(value: string, now = new Date()): string | null {
  if (!value) return "Please choose a preferred start date.";
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return "Please choose a preferred start date.";
  }
  const [y, m, d] = parts;
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return "Please check the start date you have entered.";
  }
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (date.getTime() < today.getTime()) {
    return "The preferred start date can't be in the past.";
  }
  const limit = new Date(today);
  limit.setFullYear(limit.getFullYear() + 2);
  if (date.getTime() > limit.getTime()) {
    return "Please choose a start date within the next two years.";
  }
  return null;
}

export function validateConsent(accepted: boolean): string | null {
  return accepted ? null : "Please tick the box to confirm you have read the privacy notice.";
}

export function formatPhoneForStorage(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}
