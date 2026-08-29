import { SiteNav, SceneHint } from "./SiteNav";

export function Work() {
  return (
    <section className="flex min-h-dvh flex-col bg-bg">
      <SiteNav />
      <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-6 py-8 lg:px-8">
        <p className="mb-3.5 text-[11px] font-medium tracking-[0.18em] text-violet">
          PROJECTS
        </p>
        <h2 className="font-display mb-7 text-[34px] leading-[1.05] font-normal tracking-tight text-fg md:text-[44px]">
          What I've built
        </h2>

        <article className="overflow-hidden rounded-[20px] border border-line bg-surface">
          <div className="grid min-h-[340px] grid-cols-1 lg:grid-cols-[1.35fr_0.85fr]">
            <div className="relative bg-[#101018] p-7">
              <FrontDeskGraph />
            </div>
            <div className="flex flex-col justify-center border-t border-line px-7 py-8 lg:border-t-0 lg:border-l">
              <span className="mb-3.5 inline-flex w-fit items-center rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] text-emerald-300">
                ● Built & Tested
              </span>
              <h3 className="mb-3 font-display text-[26px] font-medium tracking-tight text-fg">
                AI Front Desk for a Dental Practice
              </h3>
              <p className="mb-5 text-[14.5px] leading-relaxed text-muted">
                Five n8n workflows as one system: booking, FAQ, lead capture, reminders
                and recall. An error handler watches the other four when they fail.
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {["n8n", "Google Calendar", "Gmail"].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-line bg-fg/5 px-2.5 py-1 text-xs text-fg/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-xs tracking-wide text-muted">
                5 workflows · 1 error lane · live in clinic chat + Messenger
              </p>
            </div>
          </div>
        </article>

        <p className="mt-6 mb-3 text-xs tracking-[0.14em] text-muted">ALSO SHIPPED</p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="overflow-hidden rounded-[20px] border border-line bg-surface">
            <div className="relative h-[180px] bg-[#f3f1ec]">
              <SocialGraph />
            </div>
            <div className="px-6 py-5">
              <span className="mb-2.5 inline-flex rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] text-amber-300">
                Sample
              </span>
              <h3 className="mt-2 mb-2 text-xl font-medium text-fg">
                Enquiry to Social Follow-up
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Multi-channel lead capture from website, Facebook, and WhatsApp.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Make.com", "Google Sheets", "Gmail"].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-line bg-fg/5 px-2.5 py-1 text-xs text-fg/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
          <article className="overflow-hidden rounded-[20px] border border-line bg-surface">
            <div className="relative h-[180px] bg-[#101018]">
              <StackGraph />
            </div>
            <div className="px-6 py-5">
              <p className="mb-2.5 text-[11px] tracking-[0.18em] text-violet">
                STACK ON THE BENCH
              </p>
              <h3 className="mt-2 mb-2 text-xl font-medium text-fg">
                n8n · Make · OpenAI · Claude
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">
                Sheets, Gmail, Calendar, Messenger, WhatsApp. The workflow is the
                portfolio — not a grid of empty slots.
              </p>
              <div className="flex flex-wrap gap-2">
                {["n8n", "Make.com", "OpenAI", "Claude"].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-line bg-fg/5 px-2.5 py-1 text-xs text-fg/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
      <div className="pb-6">
        <SceneHint label="Step through" />
      </div>
    </section>
  );
}

function Node({
  className,
  color,
  label,
  light,
}: {
  className: string;
  color: string;
  label: string;
  light?: boolean;
}) {
  return (
    <span
      className={`absolute inline-flex items-center gap-2 rounded-[10px] border px-3 py-2 text-xs whitespace-nowrap ${className} ${
        light
          ? "border-[#e7e2d8] bg-white text-zinc-900"
          : "border-white/10 bg-[#1a1b24] text-fg"
      }`}
    >
      <span className={`size-1.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function FrontDeskGraph() {
  return (
    <div className="relative h-[280px] w-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 280" fill="none" aria-hidden>
        <path d="M150 140 H250" stroke="rgba(139,124,255,.7)" strokeWidth="1.5" />
        <path d="M360 140 C430 140, 430 48, 500 48" stroke="rgba(139,124,255,.55)" strokeWidth="1.5" />
        <path d="M360 140 H500" stroke="rgba(139,124,255,.55)" strokeWidth="1.5" />
        <path d="M360 140 C430 140, 430 200, 500 200" stroke="rgba(139,124,255,.55)" strokeWidth="1.5" />
        <path d="M360 140 C400 140, 400 250, 240 250" stroke="rgba(248,113,113,.55)" strokeWidth="1.5" />
      </svg>
      <Node className="top-[118px] left-4" color="bg-blue-400" label="Website Chat Trigger" />
      <Node className="top-[118px] left-[248px]" color="bg-violet" label="Booking Agent" />
      <Node className="top-7 left-[500px]" color="bg-emerald-400" label="Calendar" />
      <Node className="top-[118px] left-[500px]" color="bg-emerald-400" label="Sheets" />
      <Node className="top-[186px] left-[500px]" color="bg-amber" label="Gmail" />
      <Node className="top-[236px] left-[200px]" color="bg-red-400" label="Error handler" />
    </div>
  );
}

function SocialGraph() {
  return (
    <div className="relative h-full w-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 180" fill="none" aria-hidden>
        <path d="M90 45 C180 45, 180 90, 260 90" stroke="#7c6cf0" strokeWidth="1.6" />
        <path d="M90 135 C180 135, 180 90, 260 90" stroke="#7c6cf0" strokeWidth="1.6" />
        <path d="M340 90 H430" stroke="#7c6cf0" strokeWidth="1.6" />
      </svg>
      <Node className="top-6 left-3" color="bg-violet" label="Facebook Messenger" light />
      <Node className="bottom-6 left-3" color="bg-emerald-400" label="WhatsApp" light />
      <Node className="top-[72px] left-[210px]" color="bg-amber" label="Google Sheets" light />
      <Node className="top-[72px] left-[390px]" color="bg-blue-400" label="Gmail" light />
    </div>
  );
}

function StackGraph() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 180" fill="none" aria-hidden>
        <path d="M120 42 C190 42, 190 90, 260 90" stroke="rgba(139,124,255,.7)" strokeWidth="1.6" />
        <path d="M120 138 C190 138, 190 90, 260 90" stroke="rgba(139,124,255,.55)" strokeWidth="1.6" />
        <path d="M260 90 H360" stroke="rgba(252,211,77,.5)" strokeWidth="1.6" />
        <path d="M360 90 C420 90, 420 42, 430 42" stroke="rgba(139,124,255,.5)" strokeWidth="1.6" />
        <path d="M360 90 C420 90, 420 138, 430 138" stroke="rgba(52,211,153,.5)" strokeWidth="1.6" />
      </svg>
      <div className="relative flex h-full items-stretch justify-between px-5 py-5">
        <div className="flex flex-col justify-between">
          <Chip color="bg-violet" label="OpenAI" />
          <Chip color="bg-magenta" label="Claude" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Chip color="bg-amber" label="n8n" />
          <Chip color="bg-indigo" label="Make" />
        </div>
        <div className="flex flex-col justify-between">
          <Chip color="bg-emerald-400" label="Sheets" />
          <Chip color="bg-blue-400" label="Gmail" />
        </div>
      </div>
    </div>
  );
}

function Chip({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-[#1a1b24] px-3 py-2 text-xs whitespace-nowrap text-fg">
      <span className={`size-1.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}
