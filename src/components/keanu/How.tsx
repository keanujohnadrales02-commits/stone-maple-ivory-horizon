import { SiteNav, SceneHint } from "./SiteNav";

const STAGES = [
  {
    k: "01 — CAPTURE",
    t: "Every enquiry in",
    b: "Website forms, Facebook, WhatsApp — every lead lands in Sheets the moment it arrives.",
  },
  {
    k: "02 — FOLLOW-UP",
    t: "Automatic follow-up",
    b: "A first reply on the same channel immediately. A second send 24 hours later if they stay quiet.",
  },
  {
    k: "03 — STOP ON REPLY",
    t: "Stops when they reply",
    b: "Reply detection kills the sequence. Tracker flips to replied. No double-messages.",
  },
];

export function How() {
  return (
    <section className="flex min-h-dvh flex-col bg-bg">
      <SiteNav />
      <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-6 py-10 lg:px-8">
        <p className="mb-3.5 text-[11px] font-medium tracking-[0.18em] text-violet">
          HOW IT WORKS
        </p>
        <h2 className="font-display text-[34px] leading-[1.05] font-normal tracking-tight text-fg md:text-[44px]">
          One system. Three guarantees.
        </h2>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {STAGES.flatMap((s, i) => {
            const stage = (
              <div key={s.k}>
                <p className="mb-2.5 text-[11px] tracking-[0.16em] text-violet">{s.k}</p>
                <h3 className="mb-2.5 text-xl font-medium text-fg">{s.t}</h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted">{s.b}</p>
              </div>
            );
            if (i === STAGES.length - 1) return [stage];
            const rail = (
              <div key={`rail-${s.k}`} className="relative hidden h-16 w-12 md:block" aria-hidden>
                <span className="absolute top-7 right-0 left-0 h-px bg-gradient-to-r from-transparent via-violet/70 to-transparent" />
                <span className="absolute top-6 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-violet" />
              </div>
            );
            return [stage, rail];
          })}
        </div>
      </div>
      <div className="pb-6">
        <SceneHint label="Enter the work" />
      </div>
    </section>
  );
}
