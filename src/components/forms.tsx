"use client";

import { useState, type ReactNode } from "react";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Front-end only forms. Submission is simulated until the backend/CMS is connected.
 * TODO(backend): POST to an API route with server-side validation, rate limiting, CAPTCHA and email notification.
 */

const inputClass =
  "mt-2 block w-full rounded-xl bg-paper px-4 py-3 text-[0.95rem] text-ink-950 ring-1 ring-transparent outline-none transition placeholder:text-ink-400 focus:bg-white focus:ring-2 focus:ring-gold-400 aria-[invalid=true]:ring-red-500";

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
  className,
  error,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  error?: string;
  inputMode?: "tel" | "email" | "text";
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium text-ink-800">
        {label}
        {required && <span className="text-gold-700"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
  error,
  defaultValue = "",
}: {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  error?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink-800">
        {label}
        {required && <span className="text-gold-700"> *</span>}
      </label>
      <select id={name} name={name} required={required} defaultValue={defaultValue} aria-invalid={!!error} className={cn(inputClass, "appearance-none")}>
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function TextArea({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor={name} className="text-sm font-medium text-ink-800">
        {label}
      </label>
      <textarea id={name} name={name} rows={4} placeholder={placeholder} className={cn(inputClass, "resize-y")} />
    </div>
  );
}

type Errors = Record<string, string>;

const MAX_UPLOAD_MB = 5;

function makeReference(prefix: string) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  return `${prefix}-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}

function validate(form: HTMLFormElement): Errors {
  const errors: Errors = {};
  for (const el of Array.from(form.elements) as HTMLInputElement[]) {
    if (!el.name || !el.willValidate) continue;
    if (el.type === "file" && el.files) {
      const tooBig = Array.from(el.files).some((f) => f.size > MAX_UPLOAD_MB * 1024 * 1024);
      if (tooBig) errors[el.name] = `Each file must be under ${MAX_UPLOAD_MB} MB.`;
      continue;
    }
    if (el.validity.valueMissing) errors[el.name] = el.type === "checkbox" ? "Please accept to continue." : "This field is required.";
    else if (el.validity.typeMismatch) errors[el.name] = el.type === "email" ? "Enter a valid email address." : "Enter a valid value.";
    else if (el.name === "phone" && el.value.replace(/\D/g, "").length < 10) errors[el.name] = "Enter a valid 10-digit phone number.";
  }
  return errors;
}

function FormShell({
  children,
  success,
  submitLabel,
  refPrefix,
}: {
  children: (errors: Errors) => ReactNode;
  success: ReactNode | ((reference: string) => ReactNode);
  submitLabel: string;
  /** When set, a reference number like "MKM-27-4F8K2" is generated on submit. */
  refPrefix?: string;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [reference, setReference] = useState("");

  if (status === "sent") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-ink-950/[0.04] sm:p-12" role="status">
        <CircleCheck className="mx-auto size-12 text-gold-500" aria-hidden />
        {typeof success === "function" ? success(reference) : success}
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const errs = validate(e.currentTarget);
        setErrors(errs);
        if (Object.keys(errs).length) {
          e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
          return;
        }
        setStatus("sending");
        await new Promise((r) => setTimeout(r, 700)); // simulated until backend is connected
        if (refPrefix) setReference(makeReference(refPrefix)); // TODO(backend): the server should issue this
        setStatus("sent");
      }}
      className="rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.04] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">{children(errors)}</div>
      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm text-ink-600">
          <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-ink-950" aria-invalid={!!errors.consent} />
          <span>
            I agree that IIIAES may store and use these details to respond to my enquiry, as described in the privacy policy.
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 ml-7 text-xs text-red-600">{errors.consent}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-ink-950 px-8 text-sm font-semibold text-white transition-colors hover:bg-ink-800 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}

export function ContactForm({ courses }: { courses: string[] }) {
  return (
    <FormShell
      submitLabel="Send enquiry"
      success={
        <>
          <p className="mt-4 font-display text-2xl font-medium text-ink-950">Thank you — we’ve received your enquiry.</p>
          <p className="mt-2 text-sm text-ink-500">The admissions office will contact you shortly.</p>
        </>
      }
    >
      {(errors) => (
        <>
          <Field label="Full name" name="name" required autoComplete="name" error={errors.name} />
          <Field label="Phone / WhatsApp" name="phone" type="tel" inputMode="tel" required autoComplete="tel" error={errors.phone} />
          <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" error={errors.email} />
          <SelectField label="Interested in" name="course" options={[...courses, "General enquiry"]} required error={errors.course} />
          <TextArea label="Message" name="message" placeholder="How can we help?" />
        </>
      )}
    </FormShell>
  );
}

export function AffiliationForm({ courses }: { courses: string[] }) {
  return (
    <FormShell
      submitLabel="Submit affiliation enquiry"
      success={
        <>
          <p className="mt-4 font-display text-2xl font-medium text-ink-950">Enquiry received.</p>
          <p className="mt-2 text-sm text-ink-500">The affiliation office will review your details and get in touch.</p>
        </>
      }
    >
      {(errors) => (
        <>
          <Field label="Institution name" name="institution" required error={errors.institution} className="sm:col-span-2" />
          <Field label="Contact person" name="name" required autoComplete="name" error={errors.name} />
          <Field label="Location" name="location" required placeholder="City, district, state" error={errors.location} />
          <Field label="Email" name="email" type="email" inputMode="email" required autoComplete="email" error={errors.email} />
          <Field label="Phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" error={errors.phone} />
          <SelectField label="Interested programme" name="programme" options={courses} required error={errors.programme} />
          <Field label="Years in operation" name="years" type="number" placeholder="e.g. 5" />
          <TextArea label="Existing institution & infrastructure details" name="details" placeholder="Classrooms, practical facilities, faculty strength…" />
          <TextArea label="Additional message" name="message" />
        </>
      )}
    </FormShell>
  );
}

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="grid gap-5 sm:col-span-2 sm:grid-cols-2">
      <legend className="mb-1 text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase sm:col-span-2">{legend}</legend>
      {children}
    </fieldset>
  );
}

/** Full admission application for the academy (front-end only until the backend is connected). */
export function ApplicationForm({
  courses,
  modes = ["Offline", "Online", "Hybrid"],
  batches,
  defaultCourse,
}: {
  courses: string[];
  modes?: readonly string[];
  batches: string[];
  defaultCourse?: string;
}) {
  return (
    <FormShell
      submitLabel="Submit application"
      refPrefix="MKM-27"
      success={(ref) => (
        <>
          <p className="mt-4 font-display text-2xl font-medium text-ink-950">Application received.</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-500">
            Keep your reference number. The admissions office will contact you to verify your details and documents.
          </p>
          <p className="mx-auto mt-6 w-fit rounded-2xl bg-paper px-6 py-4">
            <span className="block text-xs text-ink-500">Reference number</span>
            <span className="font-display text-2xl font-semibold tracking-wider text-ink-950">{ref}</span>
          </p>
        </>
      )}
    >
      {(errors) => (
        <>
          <Fieldset legend="Personal details">
            <Field label="Full name (as in certificates)" name="name" required autoComplete="name" error={errors.name} className="sm:col-span-2" />
            <Field label="Date of birth" name="dob" type="date" required error={errors.dob} />
            <SelectField label="Gender" name="gender" options={["Female", "Male", "Prefer not to say"]} />
            <Field label="Phone / WhatsApp" name="phone" type="tel" inputMode="tel" required autoComplete="tel" error={errors.phone} />
            <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" error={errors.email} />
            <TextArea label="Address" name="address" placeholder="House name, place, district, PIN" />
          </Fieldset>
          <Fieldset legend="Programme">
            <SelectField label="Course" name="course" options={courses} required error={errors.course} defaultValue={defaultCourse} />
            <SelectField label="Preferred learning mode" name="mode" options={modes} required error={errors.mode} />
            <SelectField label="Preferred batch" name="batch" options={batches} />
            <SelectField
              label="Highest qualification"
              name="qualification"
              options={["SSLC / Class 10", "Plus Two / Class 12", "Diploma", "Bachelor's degree", "Master's degree", "Other"]}
              required
              error={errors.qualification}
            />
          </Fieldset>
          <div className="sm:col-span-2">
            <label htmlFor="documents" className="text-sm font-medium text-ink-800">
              Documents <span className="font-normal text-ink-400">(optional — mark sheet, ID; PDF/JPG, max {MAX_UPLOAD_MB} MB each)</span>
            </label>
            <input
              id="documents"
              name="documents"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              aria-invalid={!!errors.documents}
              className="mt-2 block w-full rounded-xl bg-paper px-4 py-3 text-sm text-ink-600 file:mr-4 file:rounded-full file:border-0 file:bg-ink-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            {errors.documents && <p className="mt-1.5 text-xs text-red-600">{errors.documents}</p>}
          </div>
        </>
      )}
    </FormShell>
  );
}
