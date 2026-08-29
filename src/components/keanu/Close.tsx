import { useState, type FormEvent, type ReactNode } from "react";
import { Check } from "lucide-react";
import { SiteNav } from "./SiteNav";
import { useDoor } from "./DoorTheater";

const TOOLS = [
  "n8n",
  "Make.com",
  "Google Sheets",
  "Gmail",
  "Calendar",
  "Messenger",
  "WhatsApp",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  business: string;
  tools: string[];
  brief: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  business: "",
  tools: [],
  brief: "",
};

export function Close() {
  const { goTo } = useDoor();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<FormState | null>(null);

  function toggleTool(tool: string) {
    setForm((f) => ({
      ...f,
      tools: f.tools.includes(tool) ? f.tools.filter((t) => t !== tool) : [...f.tools, tool],
    }));
    setErrors((e) => ({ ...e, tools: undefined }));
  }

  function validate(next: FormState) {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (next.name.trim().length < 2) e.name = "Add your name.";
    if (!EMAIL_RE.test(next.email.trim())) e.email = "Use a real email so I can reply.";
    if (next.tools.length === 0) e.tools = "Pick at least one tool you already use.";
    if (next.brief.trim().length < 20) e.brief = "Give me a sentence or two about the workflow.";
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 450));
    try {
      localStorage.setItem(
        "keanu-inquiry",
        JSON.stringify({ ...form, at: Date.now() }),
      );
    } catch {
      /* private mode */
    }
    setSending(false);
    setSent(form);
  }

  return (
    <section className="flex min-h-dvh flex-col bg-bg">
      <SiteNav />
      <div className="relative mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-6 py-8 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(124_92_252_/_0.14),transparent_52%)]"
          aria-hidden
        />

        {sent ? (
          <Success name={sent.name} email={sent.email} onBack={() => goTo(0)} />
        ) : (
          <div className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="mb-3.5 text-[11px] font-medium tracking-[0.18em] text-violet">
                START A PROJECT
              </p>
              <h2 className="font-display text-[34px] leading-[1.05] font-normal tracking-tight text-fg md:text-[44px]">
                Need a workflow built?
              </h2>
              <p className="mt-4 max-w-[420px] text-[15px] leading-relaxed text-fg/55">
                Tell me the tools you already use and what should happen when a
                lead comes in. I’ll map the system before we write a single node.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted">
                {[
                  "Reply in two working days",
                  "Workflow map before any build",
                  "n8n, Make, Sheets, Gmail, chat",
                ].map((line) => (
                  <li key={line} className="flex items-center gap-2.5">
                    <span className="size-1.5 rounded-full bg-violet" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-[20px] border border-line bg-surface p-6 md:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                    className={inputClass(errors.name)}
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    autoComplete="email"
                    className={inputClass(errors.email)}
                    placeholder="you@studio.com"
                  />
                </Field>
              </div>

              <Field label="Business" error={undefined} className="mt-4">
                <input
                  value={form.business}
                  onChange={(e) => setForm({ ...form, business: e.target.value })}
                  className={inputClass()}
                  placeholder="Practice, studio, or company — optional"
                />
              </Field>

              <div className="mt-5">
                <p className="mb-2.5 text-[11px] tracking-[0.14em] text-muted uppercase">
                  Tools you already use
                </p>
                <div className="flex flex-wrap gap-2">
                  {TOOLS.map((tool) => {
                    const on = form.tools.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleTool(tool)}
                        className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                          on
                            ? "border-violet/50 bg-violet/20 text-fg"
                            : "border-line bg-fg/5 text-fg/70 hover:text-fg"
                        }`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
                {errors.tools ? (
                  <p className="mt-2 text-xs text-red-400">{errors.tools}</p>
                ) : null}
              </div>

              <Field label="What should the system do?" error={errors.brief} className="mt-5">
                <textarea
                  value={form.brief}
                  onChange={(e) => setForm({ ...form, brief: e.target.value })}
                  rows={4}
                  className={`${inputClass(errors.brief)} min-h-[112px] resize-y py-3`}
                  placeholder="e.g. Website chat and Messenger leads should land in Sheets and get a reply within a minute."
                />
              </Field>

              <button
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-violet text-[15px] font-medium text-fg transition-transform duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              >
                {sending ? "Sending brief…" : "Send the brief"}
              </button>
            </form>
          </div>
        )}
      </div>

      <footer className="border-t border-line px-6 py-7 lg:px-8">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[16px] font-medium text-fg">
            Keanu
            <span className="ml-2.5 text-[13px] font-normal text-muted">
              AI automation specialist
            </span>
          </p>
          <p className="text-[13px] text-muted">n8n · Make.com · OpenAI · Claude</p>
          <div className="flex gap-4 text-[13px] text-muted">
            <span>in</span>
            <span>gh</span>
            <span>x</span>
          </div>
        </div>
        <p className="mx-auto mt-2 max-w-[1180px] text-center text-xs text-fg/30 sm:text-left">
          © 2026 Keanu
        </p>
      </footer>
    </section>
  );
}

function Success({
  name,
  email,
  onBack,
}: {
  name: string;
  email: string;
  onBack: () => void;
}) {
  return (
    <div className="relative mx-auto max-w-lg py-10 text-center">
      <span className="mx-auto mb-6 flex size-12 items-center justify-center rounded-full bg-violet/20 text-violet">
        <Check className="size-5" strokeWidth={2.4} />
      </span>
      <p className="mb-3.5 text-[11px] font-medium tracking-[0.18em] text-violet">
        BRIEF RECEIVED
      </p>
      <h2 className="font-display text-[34px] leading-[1.05] font-normal tracking-tight text-fg md:text-[44px]">
        Thanks, {name.split(" ")[0]}.
      </h2>
      <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-relaxed text-fg/55">
        I’ll map the workflow and reply to {email} within two working days —
        before we write a single node.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-8 text-xs tracking-[0.16em] text-muted uppercase hover:text-fg"
      >
        Back to the door
      </button>
    </div>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block text-left ${className ?? ""}`}>
      <span className="mb-2 block text-[11px] tracking-[0.14em] text-muted uppercase">
        {label}
      </span>
      {children}
      {error ? <span className="mt-1.5 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}

function inputClass(error?: string) {
  return `h-11 w-full rounded-xl border bg-fg/5 px-3.5 text-sm text-fg outline-none placeholder:text-muted/50 focus:border-violet/60 ${
    error ? "border-red-400/50" : "border-line"
  }`;
}
