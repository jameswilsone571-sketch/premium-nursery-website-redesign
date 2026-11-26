"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { validateConsent, validateEmail, validateName, validatePhone, type Errors } from "@/lib/validation";

const subjects = [
  "General question",
  "Book a nursery visit",
  "Ask about availability",
  "Fees and funding",
  "Something else",
];

const fieldClass =
  "w-full rounded-xl border bg-sheet px-4 py-3.5 text-[0.97rem] text-ink placeholder:text-body/85 transition focus:outline-none focus:ring-2 focus:ring-sky/40";

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set = (key: keyof typeof values, value: string | boolean) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    const nameError = validateName(values.name, "your name");
    if (nameError) next.name = nameError;
    const emailError = validateEmail(values.email);
    if (emailError) next.email = emailError;
    if (values.phone.trim()) {
      const phoneError = validatePhone(values.phone);
      if (phoneError) next.phone = phoneError;
    }
    if (values.message.trim().length < 10) {
      next.message = "Please tell us a little more so we can help.";
    }
    const consentError = validateConsent(values.consent);
    if (consentError) next.consent = consentError;
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error && err.message
          ? err.message
          : "We couldn't send your message just now. Please try again or call the nursery.",
      );
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[1.6rem] bg-mint-pale p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-mint-deep" strokeWidth={1.7} />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">Message sent</h3>
        <p className="mx-auto mt-3 max-w-md text-body">
          Thank you for getting in touch. The nursery team will reply to the email address you
          provided — usually within one working day.
        </p>
        <p className="mt-4 text-xs text-body/85">
          Demonstration submission — in the live build this is delivered to the nursery's inbox and
          stored securely in the admin area.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[1.6rem] bg-sheet p-6 shadow-paper sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-ink">Send us a message</h2>
      <p className="mt-2 text-sm text-body">
        Fields marked with * are required. This form is for general questions — for a place or a
        tour, please use the booking form.
      </p>

      {serverError && (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-peach-pale px-4 py-3 text-sm font-semibold text-peach-deep"
        >
          {serverError}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-sm font-semibold text-ink">
            Your name *
          </label>
          <input
            id="c-name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            data-invalid={errors.name ? "true" : undefined}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "c-name-error" : undefined}
            className={`${fieldClass} ${errors.name ? "border-coral" : "border-ink/12"}`}
            placeholder="Jane Smith"
            autoComplete="name"
          />
          {errors.name && (
            <p id="c-name-error" className="mt-1.5 text-sm font-medium text-coral">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-sm font-semibold text-ink">
            Email address *
          </label>
          <input
            id="c-email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            data-invalid={errors.email ? "true" : undefined}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "c-email-error" : undefined}
            className={`${fieldClass} ${errors.email ? "border-coral" : "border-ink/12"}`}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <p id="c-email-error" className="mt-1.5 text-sm font-medium text-coral">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="c-phone" className="mb-1.5 block text-sm font-semibold text-ink">
            Telephone (optional)
          </label>
          <input
            id="c-phone"
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            data-invalid={errors.phone ? "true" : undefined}
            aria-invalid={Boolean(errors.phone)}
            className={`${fieldClass} ${errors.phone ? "border-coral" : "border-ink/12"}`}
            placeholder="01234 567890"
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="mt-1.5 text-sm font-medium text-coral">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="c-subject" className="mb-1.5 block text-sm font-semibold text-ink">
            Subject *
          </label>
          <select
            id="c-subject"
            value={values.subject}
            onChange={(e) => set("subject", e.target.value)}
            className={`${fieldClass} border-ink/12`}
          >
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-semibold text-ink">
          Your message *
        </label>
        <textarea
          id="c-message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          data-invalid={errors.message ? "true" : undefined}
          aria-invalid={Boolean(errors.message)}
          className={`${fieldClass} resize-y ${errors.message ? "border-coral" : "border-ink/12"}`}
          placeholder="How can we help?"
        />
        {errors.message && (
          <p className="mt-1.5 text-sm font-medium text-coral">{errors.message}</p>
        )}
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-body">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(e) => set("consent", e.target.checked)}
          data-invalid={errors.consent ? "true" : undefined}
          className="mt-1 h-5 w-5 shrink-0 rounded border-ink/25 accent-coral"
        />
        <span>
          I am happy for the nursery to contact me about this message and understand my details will
          be stored securely in line with the privacy notice. *
          {errors.consent && (
            <span className="mt-1 block font-medium text-coral">{errors.consent}</span>
          )}
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-7 py-4 font-semibold text-white transition hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
