"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error || "That key was not recognised.");
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-md rounded-[1.6rem] bg-sheet p-7 shadow-paper-lg ring-1 ring-ink/5"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-sun">
        <KeyRound className="h-6 w-6" />
      </span>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink">Enquiry admin</h1>
      <p className="mt-2 text-sm leading-relaxed text-body">
        Booking enquiries contain child data, so this area is protected. Enter the administrator
        key provided by the nursery.
      </p>

      <label htmlFor="admin-key" className="mb-1.5 mt-5 block text-sm font-semibold text-ink">
        Administrator key
      </label>
      <input
        id="admin-key"
        type="password"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        autoComplete="current-password"
        className="w-full rounded-xl border border-ink/12 bg-white px-4 py-3.5 text-ink focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30"
        placeholder="••••••••"
      />
      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-coral">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy || !key}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-6 py-3.5 font-semibold text-white transition hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
        Unlock enquiries
      </button>

      <p className="mt-4 rounded-xl bg-sun-pale px-4 py-3 text-xs font-semibold leading-relaxed text-sun-deep">
        Prototype default key: <span className="font-mono">nursery-demo-key</span> — set the{" "}
        <span className="font-mono">ADMIN_KEY</span> environment variable before going live.
      </p>
    </form>
  );
}
