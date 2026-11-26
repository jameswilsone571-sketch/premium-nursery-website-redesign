"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronRight,
  Clock,
  Pencil,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { describeBand, formatDisplayDate, formatLongDate, recommendRoom } from "@/lib/age";
import { rooms, statusLabels, type Room } from "@/content/rooms";
import {
  validateConsent,
  validateDob,
  validateEmail,
  validateName,
  validatePhone,
  validateRequired,
  validateStartDate,
  type Errors,
} from "@/lib/validation";

const STEPS = [
  { n: 1, label: "Parent or guardian", short: "About you" },
  { n: 2, label: "Child details", short: "Your child" },
  { n: 3, label: "Recommended room", short: "Room match" },
  { n: 4, label: "Booking details", short: "Enquiry" },
  { n: 5, label: "Review and submit", short: "Review" },
];

const CONTACT_METHODS = ["Phone call", "Email", "Text message"];

const ENQUIRY_TYPES = [
  "Book a nursery visit",
  "Enquire about availability",
  "Request childcare information",
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

type Values = {
  parentName: string;
  email: string;
  phone: string;
  contactMethod: string;
  childName: string;
  dob: string;
  startDate: string;
  enquiryType: string;
  preferredDays: string[];
  additionalInfo: string;
  questions: string;
  consent: boolean;
  website: string; // honeypot
};

const EMPTY: Values = {
  parentName: "",
  email: "",
  phone: "",
  contactMethod: "",
  childName: "",
  dob: "",
  startDate: "",
  enquiryType: ENQUIRY_TYPES[0],
  preferredDays: [],
  additionalInfo: "",
  questions: "",
  consent: false,
  website: "",
};

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3.5 text-[0.97rem] text-ink placeholder:text-body/85 transition focus:outline-none focus:ring-2 focus:ring-sky/40";

function fieldClass(error?: string) {
  return `${inputBase} ${error ? "border-coral" : "border-ink/12"}`;
}

function newClientToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `t-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function BookingForm({ preselectedRoom }: { preselectedRoom?: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Values>(() => ({
    ...EMPTY,
    enquiryType:
      preselectedRoom && rooms.some((r) => r.slug === preselectedRoom)
        ? "Enquire about availability"
        : EMPTY.enquiryType,
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverErrors, setServerErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const tokenRef = useRef<string>(newClientToken());
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = Boolean(reduce);

  const preselected = useMemo(
    () => rooms.find((r) => r.slug === preselectedRoom),
    [preselectedRoom],
  );

  const match = useMemo(() => recommendRoom(values.dob, rooms), [values.dob]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const toggleDay = (day: string) => {
    setValues((v) => ({
      ...v,
      preferredDays: v.preferredDays.includes(day)
        ? v.preferredDays.filter((d) => d !== day)
        : [...v.preferredDays, day],
    }));
  };

  function validateStep(current: number, v: Values): Errors {
    const e: Errors = {};
    if (current === 1) {
      const nameError = validateName(v.parentName, "your full name");
      if (nameError) e.parentName = nameError;
      const emailError = validateEmail(v.email);
      if (emailError) e.email = emailError;
      const phoneError = validatePhone(v.phone);
      if (phoneError) e.phone = phoneError;
      const methodError = validateRequired(
        v.contactMethod,
        "Please choose how you would like us to contact you.",
      );
      if (methodError) e.contactMethod = methodError;
    }
    if (current === 2) {
      const childError = validateName(v.childName, "your child's first name");
      if (childError) e.childName = childError;
      const dobError = validateDob(v.dob);
      if (dobError) e.dob = dobError;
      const startError = validateStartDate(v.startDate);
      if (startError) e.startDate = startError;
    }
    if (current === 3) {
      if (match.status === "invalid") e.dob = match.reason;
    }
    if (current === 4) {
      const typeError = validateRequired(
        v.enquiryType,
        "Please choose the type of enquiry.",
      );
      if (typeError) e.enquiryType = typeError;
    }
    if (current === 5) {
      const consentError = validateConsent(v.consent);
      if (consentError) e.consent = consentError;
    }
    return e;
  }

  const goTo = (target: number) => {
    setErrors({});
    setServerError("");
    setStep(target);
    window.requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  };

  const next = () => {
    const found = validateStep(step, values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      window.requestAnimationFrame(() => {
        const first = cardRef.current?.querySelector<HTMLElement>("[data-invalid='true']");
        first?.focus();
      });
      return;
    }
    setStep((s) => Math.min(5, s + 1));
    window.requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  };

  const back = () => {
    setErrors({});
    setServerError("");
    setStep((s) => Math.max(1, s - 1));
    window.requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  };

  const submit = async () => {
    const found = validateStep(5, values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      window.requestAnimationFrame(() => {
        const first = cardRef.current?.querySelector<HTMLElement>("[data-invalid='true']");
        first?.focus();
      });
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, clientToken: tokenRef.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 400 && data.errors) {
        setServerErrors(data.errors);
        setStatus("error");
        setServerError("Please check the highlighted fields and try again.");
        return;
      }
      if (!res.ok || !data.ok) throw new Error(data.error || "Request failed");
      setServerErrors(data.errors || {});
      setReference(data.reference);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error && err.message
          ? err.message
          : "We couldn't send your enquiry just now. Please try again or call the nursery.",
      );
    }
  };

  // Reset the idempotency token if the parent starts a fresh enquiry after success.
  useEffect(() => {
    if (status === "done") tokenRef.current = newClientToken();
  }, [status]);

  if (status === "done") {
    return <SuccessPanel reference={reference} />;
  }

  const matchedRoom: Room | null = match.status === "matched" ? match.room : null;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* ---------- Progress rail ---------- */}
      <aside className="lg:col-span-4">
        <div className="sticky top-20 rounded-[1.6rem] bg-sheet p-4 shadow-paper ring-1 ring-ink/5 lg:top-28 lg:p-6">
          <p className="eyebrow hidden text-coral lg:block">Book a visit</p>
          <p className="mt-2 hidden font-display text-xl font-semibold text-ink lg:block">
            Your enquiry, step by step
          </p>

          {/* desktop rail */}
          <ol className="mt-6 hidden lg:block">
            {STEPS.map((s) => {
              const isDone = step > s.n;
              const isCurrent = step === s.n;
              const reachable = s.n < step;
              return (
                <li key={s.n}>
                  <button
                    type="button"
                    disabled={!reachable}
                    onClick={() => reachable && goTo(s.n)}
                    className={`group flex w-full items-start gap-3 rounded-xl px-2 py-2.5 text-left transition ${
                      isCurrent ? "bg-paper" : reachable ? "hover:bg-paper" : "cursor-default"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-display text-sm font-semibold transition ${
                        isDone
                          ? "border-mint bg-mint text-white"
                          : isCurrent
                            ? "border-coral bg-coral text-white"
                            : "border-ink/15 bg-white text-body/85"
                      }`}
                    >
                      {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : s.n}
                    </span>
                    <span>
                      <span
                        className={`block text-sm font-semibold ${
                          isCurrent ? "text-ink" : isDone ? "text-ink" : "text-body/85"
                        }`}
                      >
                        {s.label}
                      </span>
                      {isCurrent && (
                        <span className="hand block text-base text-coral">you are here</span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* mobile progress */}
          <div className="mt-5 lg:hidden">
            <div className="flex items-center gap-1.5">
              {STEPS.map((s) => (
                <span
                  key={s.n}
                  className={`h-2 flex-1 rounded-full transition ${
                    step > s.n ? "bg-mint" : step === s.n ? "bg-coral" : "bg-ink/10"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">
              Step {step} of 5 · {STEPS[step - 1].short}
            </p>
          </div>

          <div className="mt-6 hidden rounded-xl bg-mint-pale p-4 lg:block">
            <p className="flex items-start gap-2 text-xs font-semibold leading-relaxed text-mint-deep">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              Your details are sent securely, stored privately and never shown publicly. Nothing is
              booked until the nursery confirms it with you.
            </p>
          </div>

          <p className="mt-4 hidden text-xs leading-relaxed text-body/85 lg:block">
            Creating an enquiry is not a confirmed place or appointment.
          </p>
        </div>
      </aside>

      {/* ---------- Step card ---------- */}
      <div ref={cardRef} className="scroll-mt-32 lg:col-span-8">
        <div className="rounded-[1.75rem] bg-sheet p-5 shadow-paper-lg ring-1 ring-ink/5 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -22 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 1 && (
                <StepShell
                  eyebrow="Step 1 of 5"
                  title="Tell us about you"
                  intro="We will only use these details to reply to your enquiry."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="parentName"
                      label="Parent or guardian full name"
                      required
                      error={errors.parentName}
                    >
                      <input
                        id="parentName"
                        value={values.parentName}
                        onChange={(e) => set("parentName", e.target.value)}
                        data-invalid={errors.parentName ? "true" : undefined}
                        aria-invalid={Boolean(errors.parentName)}
                        autoComplete="name"
                        placeholder="Jane Smith"
                        className={fieldClass(errors.parentName)}
                      />
                    </Field>

                    <Field id="email" label="Email address" required error={errors.email}>
                      <input
                        id="email"
                        type="email"
                        inputMode="email"
                        value={values.email}
                        onChange={(e) => set("email", e.target.value)}
                        data-invalid={errors.email ? "true" : undefined}
                        aria-invalid={Boolean(errors.email)}
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={fieldClass(errors.email)}
                      />
                    </Field>

                    <Field id="phone" label="Contact telephone number" required error={errors.phone}>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        value={values.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        data-invalid={errors.phone ? "true" : undefined}
                        aria-invalid={Boolean(errors.phone)}
                        autoComplete="tel"
                        placeholder="01234 567890"
                        className={fieldClass(errors.phone)}
                      />
                    </Field>
                  </div>

                  <fieldset className="mt-6">
                    <legend className="mb-2 text-sm font-semibold text-ink">
                      Preferred contact method <span className="text-coral">*</span>
                    </legend>
                    <div className="flex flex-wrap gap-2.5">
                      {CONTACT_METHODS.map((method) => (
                        <label
                          key={method}
                          className={`cursor-pointer rounded-full border px-5 py-3 text-sm font-semibold transition ${
                            values.contactMethod === method
                              ? "border-coral bg-coral text-white"
                              : "border-ink/12 bg-white text-ink hover:border-ink/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={values.contactMethod === method}
                            onChange={(e) => set("contactMethod", e.target.value)}
                            className="sr-only"
                            data-invalid={errors.contactMethod ? "true" : undefined}
                          />
                          {method}
                        </label>
                      ))}
                    </div>
                    {errors.contactMethod && (
                      <p className="mt-2 text-sm font-medium text-coral">{errors.contactMethod}</p>
                    )}
                  </fieldset>

                  {/* honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={values.website}
                    onChange={(e) => set("website", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                </StepShell>
              )}

              {step === 2 && (
                <StepShell
                  eyebrow="Step 2 of 5"
                  title="Tell us about your child"
                  intro="We calculate your child's age automatically — there is no need to work it out yourself."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="childName"
                      label="Child's first name"
                      required
                      error={errors.childName}
                    >
                      <input
                        id="childName"
                        value={values.childName}
                        onChange={(e) => set("childName", e.target.value)}
                        data-invalid={errors.childName ? "true" : undefined}
                        aria-invalid={Boolean(errors.childName)}
                        autoComplete="off"
                        placeholder="Alex"
                        className={fieldClass(errors.childName)}
                      />
                    </Field>

                    <Field id="dob" label="Child's date of birth" required error={errors.dob}>
                      <input
                        id="dob"
                        type="date"
                        value={values.dob}
                        max={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => set("dob", e.target.value)}
                        data-invalid={errors.dob ? "true" : undefined}
                        aria-invalid={Boolean(errors.dob)}
                        className={fieldClass(errors.dob)}
                      />
                    </Field>

                    <Field
                      id="startDate"
                      label="Preferred start date"
                      required
                      error={errors.startDate}
                      hint="An estimate is fine — we will confirm availability with you."
                    >
                      <input
                        id="startDate"
                        type="date"
                        value={values.startDate}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => set("startDate", e.target.value)}
                        data-invalid={errors.startDate ? "true" : undefined}
                        aria-invalid={Boolean(errors.startDate)}
                        className={fieldClass(errors.startDate)}
                      />
                    </Field>
                  </div>

                  <AgePanel dob={values.dob} />
                </StepShell>
              )}

              {step === 3 && (
                <StepShell
                  eyebrow="Step 3 of 5"
                  title="Your recommended room"
                  intro="This is calculated from your child's date of birth against the nursery's configured age ranges."
                >
                  {preselected && (
                    <p className="mb-5 rounded-xl bg-sky-pale px-4 py-3 text-sm font-semibold text-sky-deep">
                      You asked about the {preselected.name} ({preselected.ageLabel}). We will check
                      it against your child's age below.
                    </p>
                  )}

                  {match.status === "invalid" && (
                    <div className="rounded-2xl border border-coral/30 bg-peach-pale p-6">
                      <p className="font-semibold text-peach-deep">{match.reason}</p>
                      <button
                        type="button"
                        onClick={() => goTo(2)}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit date of birth
                      </button>
                    </div>
                  )}

                  {match.status === "review" && (
                    <motion.div
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 180, damping: 22 }}
                      className="rounded-2xl border border-ink/10 bg-sun-pale p-6"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <Sparkles className="h-6 w-6 text-sun-deep" />
                      </span>
                      <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                        Our team will review this one
                      </h3>
                      <p className="mt-2 text-[0.97rem] leading-relaxed text-body">
                        {match.reason}
                      </p>
                      {match.age && (
                        <p className="mt-3 text-sm font-semibold text-ink">
                          Age calculated: {match.age.label} ({match.age.months} months)
                        </p>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-body/85">
                        We will look at your child's date of birth and get in touch to talk through
                        the options — including any room that may be a good fit outside the ranges
                        published here.
                      </p>
                      <button
                        type="button"
                        onClick={() => goTo(2)}
                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/40"
                      >
                        <Pencil className="h-4 w-4" />
                        Change date of birth
                      </button>
                    </motion.div>
                  )}

                  {matchedRoom && match.status === "matched" && (
                    <motion.div
                      key={matchedRoom.slug}
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 190, damping: 24 }}
                      className="overflow-hidden rounded-[1.5rem] ring-1 ring-ink/8"
                    >
                      <div className="grid sm:grid-cols-5">
                        <div className="relative sm:col-span-2">
                          <img
                            src={matchedRoom.image}
                            alt={matchedRoom.alt}
                            width={640}
                            height={480}
                            decoding="async"
                            className="h-full min-h-44 w-full object-cover"
                          />
                          <span className="absolute left-3 top-3 rounded-full bg-sheet/95 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink">
                            {statusLabels[matchedRoom.status]}
                          </span>
                        </div>
                        <div className={`p-6 sm:col-span-3 ${matchedRoom.tint}`}>
                          <p className="eyebrow text-body/85">Recommended room</p>
                          <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                            {matchedRoom.name}
                          </h3>
                          <p className="mt-1 text-sm font-semibold text-ink/80">
                            {matchedRoom.ageLabel} · {matchedRoom.minMonths}–
                            {matchedRoom.maxMonths} months
                          </p>
                          <p className="mt-3 text-[0.95rem] leading-relaxed text-body">
                            Based on your child's date of birth, the most suitable room appears to
                            be our {matchedRoom.name}.
                          </p>
                          <p className="mt-3 rounded-lg bg-white/70 px-3 py-2 text-sm font-semibold text-ink">
                            {match.status === "matched" ? match.reason : ""}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-body/90">
                            {matchedRoom.blurb}
                          </p>
                          <button
                            type="button"
                            onClick={() => goTo(2)}
                            className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/35"
                          >
                            <Pencil className="h-4 w-4" />
                            Change date of birth
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {rooms.map((room) => {
                      const isMatch = matchedRoom?.slug === room.slug;
                      return (
                        <div
                          key={room.slug}
                          className={`rounded-xl border px-4 py-3 transition ${
                            isMatch
                              ? "border-mint bg-mint-pale"
                              : "border-ink/10 bg-white opacity-75"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-ink">{room.name}</span>
                            {isMatch && (
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-mint text-white">
                                <Check className="h-3 w-3" strokeWidth={3} />
                              </span>
                            )}
                          </div>
                          <span className="mt-0.5 block text-xs text-body/85">
                            {describeBand(room)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-body/85">
                    IF/ELSE logic: a child is matched when their completed age in months is greater
                    than or equal to the room's minimum and below its maximum, so ranges never
                    overlap. Age bands are editable records and may be changed by the nursery.
                  </p>
                </StepShell>
              )}

              {step === 4 && (
                <StepShell
                  eyebrow="Step 4 of 5"
                  title="Your booking details"
                  intro="This creates an enquiry — a place or appointment is never confirmed automatically."
                >
                  <fieldset>
                    <legend className="mb-2 text-sm font-semibold text-ink">
                      Type of enquiry <span className="text-coral">*</span>
                    </legend>
                    <div className="grid gap-2.5">
                      {ENQUIRY_TYPES.map((type) => (
                        <label
                          key={type}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-semibold transition ${
                            values.enquiryType === type
                              ? "border-coral bg-peach-pale text-ink"
                              : "border-ink/12 bg-white text-ink hover:border-ink/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="enquiryType"
                            value={type}
                            checked={values.enquiryType === type}
                            onChange={(e) => set("enquiryType", e.target.value)}
                            className="sr-only"
                            data-invalid={errors.enquiryType ? "true" : undefined}
                          />
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                              values.enquiryType === type ? "border-coral" : "border-ink/25"
                            }`}
                          >
                            {values.enquiryType === type && (
                              <span className="h-2.5 w-2.5 rounded-full bg-coral" />
                            )}
                          </span>
                          {type}
                        </label>
                      ))}
                    </div>
                    {errors.enquiryType && (
                      <p className="mt-2 text-sm font-medium text-coral">{errors.enquiryType}</p>
                    )}
                  </fieldset>

                  <fieldset className="mt-6">
                    <legend className="mb-2 text-sm font-semibold text-ink">
                      Preferred days <span className="font-normal text-body/85">(optional)</span>
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {DAYS.map((day) => {
                        const active = values.preferredDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            aria-pressed={active}
                            className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                              active
                                ? "border-mint bg-mint text-white"
                                : "border-ink/12 bg-white text-ink hover:border-ink/30"
                            }`}
                          >
                            {day.slice(0, 3)}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-6 grid gap-5">
                    <Field
                      id="additionalInfo"
                      label="Anything we should know about your child?"
                      hint="Settling, routines, interests, additional needs — whatever helps us prepare."
                    >
                      <textarea
                        id="additionalInfo"
                        rows={4}
                        value={values.additionalInfo}
                        onChange={(e) => set("additionalInfo", e.target.value)}
                        className={`${inputBase} border-ink/12 resize-y`}
                        placeholder="Optional"
                      />
                    </Field>

                    <Field
                      id="questions"
                      label="Questions for the nursery team"
                      hint="Fees, sessions, funding, availability — ask us anything."
                    >
                      <textarea
                        id="questions"
                        rows={3}
                        value={values.questions}
                        onChange={(e) => set("questions", e.target.value)}
                        className={`${inputBase} border-ink/12 resize-y`}
                        placeholder="Optional"
                      />
                    </Field>
                  </div>
                </StepShell>
              )}

              {step === 5 && (
                <StepShell
                  eyebrow="Step 5 of 5"
                  title="Review and submit"
                  intro="Check everything looks right, then send your enquiry to the nursery team."
                >
                  {serverError && (
                    <p
                      role="alert"
                      className="mb-5 rounded-xl bg-peach-pale px-4 py-3 text-sm font-semibold text-peach-deep"
                    >
                      {serverError}
                    </p>
                  )}

                  <div className="space-y-4">
                    <SummaryBlock
                      title="Parent or guardian"
                      onEdit={() => goTo(1)}
                      rows={[
                        ["Full name", values.parentName],
                        ["Email", values.email],
                        ["Telephone", values.phone],
                        ["Preferred contact", values.contactMethod || "—"],
                      ]}
                    />

                    <SummaryBlock
                      title="Child details"
                      onEdit={() => goTo(2)}
                      rows={[
                        ["First name", values.childName],
                        ["Date of birth", formatDisplayDate(values.dob) || "—"],
                        [
                          "Calculated age",
                          match.status === "review" && match.age
                            ? `${match.age.label} (${match.age.months} months)`
                            : match.status === "matched"
                              ? `${match.age.label} (${match.age.months} months)`
                              : "—",
                        ],
                        ["Preferred start", formatLongDate(values.startDate) || "—"],
                      ]}
                    />

                    <SummaryBlock
                      title="Recommended room"
                      onEdit={() => goTo(3)}
                      rows={[
                        [
                          "Room",
                          matchedRoom
                            ? `${matchedRoom.name} (${matchedRoom.ageLabel})`
                            : "To be reviewed by the nursery team",
                        ],
                        ["Age band", matchedRoom ? describeBand(matchedRoom) : "Not applicable"],
                        ["Why", match.status === "invalid" ? "—" : match.reason],
                      ]}
                    />

                    <SummaryBlock
                      title="Enquiry details"
                      onEdit={() => goTo(4)}
                      rows={[
                        ["Enquiry type", values.enquiryType],
                        ["Preferred days", values.preferredDays.join(", ") || "No preference"],
                        ["Notes", values.additionalInfo || "None"],
                        ["Questions", values.questions || "None"],
                      ]}
                    />
                  </div>

                  <div className="mt-6 rounded-2xl bg-paper p-5 ring-1 ring-ink/5">
                    <p className="eyebrow text-coral">Privacy notice</p>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      We use these details only to respond to your enquiry and to arrange a visit if
                      you ask for one. Child information is stored securely, is visible only to the
                      nursery team, and is never published on the website. We keep enquiry records
                      only as long as needed to deal with your request and meet our legal
                      obligations. Read the full{" "}
                      <a
                        href="/legal#privacy"
                        className="font-semibold text-sky-deep underline underline-offset-2"
                      >
                        privacy policy
                      </a>
                      .
                    </p>

                    <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm font-medium leading-relaxed text-ink">
                      <input
                        type="checkbox"
                        checked={values.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        data-invalid={errors.consent ? "true" : undefined}
                        aria-invalid={Boolean(errors.consent)}
                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink/25 accent-coral"
                      />
                      <span>
                        I have read the privacy notice and consent to the nursery contacting me
                        about this enquiry. *
                        {errors.consent && (
                          <span className="mt-1 block font-medium text-coral">{errors.consent}</span>
                        )}
                      </span>
                    </label>
                  </div>

                  <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-body/85">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                    You will receive a unique enquiry reference after submitting. The nursery team
                    will be in touch to discuss availability — nothing is reserved until they
                    confirm it with you.
                  </p>
                </StepShell>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ---------- Nav ---------- */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ink/8 pt-6">
            <button
              type="button"
              onClick={back}
              disabled={step === 1 || status === "sending"}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/35 disabled:invisible"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {step < 5 ? (
              <button
                type="button"
                onClick={next}
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-sheet transition hover:bg-ink-soft"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(206,83,64,1)] transition hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending…
                  </>
                ) : (
                  <>
                    <CalendarCheck className="h-4 w-4" />
                    Submit enquiry
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function StepShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow text-coral">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-ink">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-body">{intro}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-coral">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-body/85">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1.5 text-sm font-medium text-coral">
          {error}
        </p>
      )}
    </div>
  );
}

function AgePanel({ dob }: { dob: string }) {
  const match = recommendRoom(dob, rooms);
  const hasDob = Boolean(dob);

  return (
    <div className="mt-6 overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/8">
      <div className="grid gap-0 sm:grid-cols-2">
        <div className="p-5">
          <p className="eyebrow text-body/85">Calculated automatically</p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            {hasDob && match.status !== "invalid"
              ? match.status === "matched" || match.status === "review"
                ? match.age
                  ? match.age.label
                  : "—"
                : "—"
              : "Enter a date of birth"}
          </p>
          <p className="mt-1 text-sm text-body">
            {hasDob && match.status !== "invalid" && (match.status === "matched" || match.status === "review") && match.age
              ? `${match.age.months} completed months · from ${formatDisplayDate(dob)}`
              : "We work out the age in years and months for you."}
          </p>
        </div>
        <div className="border-t border-ink/8 p-5 sm:border-l sm:border-t-0">
          <p className="eyebrow text-body/85">Room eligibility</p>
          <p className="mt-2 text-sm font-semibold text-ink">
            {match.status === "matched"
              ? `Suggested: ${match.room.name}`
              : match.status === "review"
                ? "Team review needed"
                : "Awaiting date of birth"}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-body/80">
            {match.status === "matched"
              ? match.reason
              : match.status === "review"
                ? match.reason
                : "Add a date of birth and we will recommend a room straight away."}
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryBlock({
  title,
  rows,
  onEdit,
}: {
  title: string;
  rows: [string, string][];
  onEdit: () => void;
}) {
  return (
    <section className="rounded-2xl bg-paper p-5 ring-1 ring-ink/5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink transition hover:border-coral hover:text-coral"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>
      <dl className="mt-3 space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-3">
            <dt className="text-xs font-bold uppercase tracking-[0.1em] text-body/85">{label}</dt>
            <dd className="break-words text-sm text-ink">{value || "—"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function SuccessPanel({ reference }: { reference: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-[1.75rem] bg-sheet shadow-paper-lg ring-1 ring-ink/5"
    >
      <div className="bg-mint-pale px-6 py-10 text-center sm:px-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint text-white">
          <Check className="h-8 w-8" strokeWidth={3} />
        </span>
        <h2 className="mt-5 text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold text-ink text-balance">
          Thank you for your enquiry!
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-body">
          We've received your details and our nursery team will be in touch to discuss your
          requirements. We look forward to welcoming you and your little one.
        </p>
        <div className="mx-auto mt-6 inline-flex flex-col items-center rounded-2xl bg-white px-6 py-4 ring-1 ring-ink/8">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-body/85">
            Enquiry reference
          </span>
          <span className="mt-1 font-display text-xl font-semibold tracking-wide text-ink">
            {reference}
          </span>
        </div>
        <p className="mt-4 text-xs text-body/85">
          Demonstration submission — the enquiry is stored securely in the nursery's admin area and
          is not visible anywhere on the public site.
        </p>
      </div>

      <div className="grid gap-6 px-6 py-8 sm:grid-cols-3 sm:px-10">
        {[
          {
            icon: UserRound,
            title: "What happens next",
            body: "The team reviews your enquiry and replies using your preferred contact method.",
          },
          {
            icon: CalendarCheck,
            title: "Your visit",
            body: "If you asked for a visit, we will agree a time that works around your day.",
          },
          {
            icon: Clock,
            title: "Nothing is confirmed yet",
            body: "A place or appointment is only ever confirmed after we have spoken with you.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title}>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-coral">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{item.body}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-3 border-t border-ink/8 px-6 py-6 sm:px-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-sheet transition hover:bg-ink-soft"
        >
          Back to home
          <ChevronRight className="h-4 w-4" />
        </a>
        <a
          href="/parent-information"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/35"
        >
          Parent information
        </a>
      </div>
    </motion.div>
  );
}
