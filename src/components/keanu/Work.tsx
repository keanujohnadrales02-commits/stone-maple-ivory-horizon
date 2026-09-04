import { useCallback, useEffect, useState } from "react";
import { SiteNav, SceneHint } from "./SiteNav";

/* ------------------------------------------------------------------ *
 * Real captures live in public/projects/.
 * Each shot is HEAD-checked at runtime: if the PNG is not there yet the
 * card falls back to the SVG graph, and the moment the file exists both
 * the card and the dialog show the photo instead.
 * ------------------------------------------------------------------ */

const FRONT_DESK = {
  id: "front-desk",
  shot: "/projects/front-desk.png",
  extras: ["/projects/front-desk-error.png", "/projects/front-desk-reminders.png", "/projects/front-desk-leads.png"],
  badge: "● Built & Tested",
  title: "AI Front Desk for a Dental Practice",
  body: "Five n8n workflows as one system: booking, FAQ, lead capture, reminders and recall. An error handler watches the other four when they fail.",
  meta: "5 workflows · 1 error lane · live in clinic chat + Messenger",
  tags: ["n8n", "Google Calendar", "Gmail"],
  alt: "n8n canvas for the AI Front Desk system",
} as const;

const SOCIAL = {
  id: "social-followup",
  shot: "/projects/social-followup.png",
  extras: ["/projects/social-followup-sheet.png"],
  badge: "Sample",
  title: "Enquiry to Social Follow-up",
  body: "Multi-channel lead capture from website, Facebook, and WhatsApp.",
  meta: "",
  tags: ["Make.com", "Google Sheets", "Gmail"],
  alt: "Make.com scenario for the Enquiry to Social Follow-up flow",
} as const;

/** Zapier — its own card. Never merged with the n8n or Make work. */
const ZAPIER = {
  id: "zapier",
  shot: "/projects/zapier-lead-routing.png",
  extras: ["/projects/zapier-apollo.png"],
  badge: "Sample",
  title: "Form to Sheet, Gmail and Slack",
  body: "A webhook catches the enquiry, writes it to Google Sheets, sends the acknowledgement by Gmail, then posts the team notification to Slack. The second capture is the same intake split by Paths — high priority leads are written to Sheets and answered by an AI-drafted Gmail reply, everything else falls through to a notification.",
  meta: "",
  tags: ["Zapier", "Paths", "Google Sheets", "Gmail", "Slack"],
  alt: "Zapier canvas — webhook to Google Sheets, Gmail and Slack",
} as const;

type Project = typeof FRONT_DESK | typeof SOCIAL | typeof ZAPIER;

/** true = file exists and is an image, false = missing, null = still checking. */
function useShot(src: string) {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    let alive = true;
    fetch(src, { method: "HEAD" })
      .then((r) => {
        // Vite's SPA fallback answers 200 text/html for missing files, so the
        // content type is what actually decides whether a capture is there.
        const type = r.headers.get("content-type") ?? "";
        if (alive) setOk(r.ok && type.startsWith("image"));
      })
      .catch(() => {
        if (alive) setOk(false);
      });
    return () => {
      alive = false;
    };
  }, [src]);
  return ok;
}

function useShots(srcs: readonly string[]) {
  const [found, setFound] = useState<string[]>([]);
  useEffect(() => {
    let alive = true;
    Promise.all(
      srcs.map((src) =>
        fetch(src, { method: "HEAD" })
          .then((r) => {
            const type = r.headers.get("content-type") ?? "";
            return r.ok && type.startsWith("image") ? src : null;
          })
          .catch(() => null),
      ),
    ).then((list) => {
      if (alive) setFound(list.filter((s): s is string => s !== null));
    });
    return () => {
      alive = false;
    };
  }, [srcs]);
  return found;
}

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const frontDeskShot = useShot(FRONT_DESK.shot);
  const socialShot = useShot(SOCIAL.shot);
  const zapierShot = useShot(ZAPIER.shot);

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

        {/* ---------------- Flagship ---------------- */}
        <button
          type="button"
          onClick={() => setOpen(FRONT_DESK)}
          aria-label={`Open project: ${FRONT_DESK.title}`}
          className="group block w-full overflow-hidden rounded-[20px] border border-line bg-surface text-left transition-colors hover:border-violet/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/70"
        >
          <div className="grid min-h-[58dvh] grid-cols-1 lg:min-h-[560px] lg:grid-cols-[1.75fr_0.85fr]">
            <div className="relative overflow-hidden bg-[#101018]">
              {frontDeskShot ? (
                <img
                  src={FRONT_DESK.shot}
                  alt={FRONT_DESK.alt}
                  className="absolute inset-0 h-full w-full object-cover object-left-top"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-7">
                  <FrontDeskGraph />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center border-t border-line px-7 py-8 lg:border-t-0 lg:border-l">
              <span className="mb-3.5 inline-flex w-fit items-center rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] text-emerald-300">
                {FRONT_DESK.badge}
              </span>
              <h3 className="mb-3 font-display text-[26px] font-medium tracking-tight text-fg">
                {FRONT_DESK.title}
              </h3>
              <p className="mb-5 text-[14.5px] leading-relaxed text-muted">
                {FRONT_DESK.body}
              </p>
              <TagRow tags={FRONT_DESK.tags} />
              <p className="mt-4 text-xs tracking-wide text-muted">{FRONT_DESK.meta}</p>
              <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-violet">
                Open project
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </div>
        </button>

        {/* ---------------- Also shipped ---------------- */}
        <p className="mt-6 mb-3 text-xs tracking-[0.14em] text-muted">ALSO SHIPPED</p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <button
            type="button"
            onClick={() => setOpen(SOCIAL)}
            aria-label={`Open project: ${SOCIAL.title}`}
            className="group block overflow-hidden rounded-[20px] border border-line bg-surface text-left transition-colors hover:border-violet/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/70"
          >
            <div
              className="relative h-[240px] overflow-hidden"
              style={{ background: socialShot ? "#101018" : "#f3f1ec" }}
            >
              {socialShot ? (
                <img
                  src={SOCIAL.shot}
                  alt={SOCIAL.alt}
                  className="absolute inset-0 h-full w-full object-cover object-left-top"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <SocialGraph />
              )}
            </div>
            <div className="px-6 py-5">
              <span className="mb-2.5 inline-flex rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] text-amber-300">
                {SOCIAL.badge}
              </span>
              <h3 className="mt-2 mb-2 text-xl font-medium text-fg">{SOCIAL.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">{SOCIAL.body}</p>
              <TagRow tags={SOCIAL.tags} />
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-violet">
                Open project
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </button>

          {/* Zapier — separate card. Not merged with n8n or Make. */}
          <button
            type="button"
            onClick={() => setOpen(ZAPIER)}
            aria-label={`Open project: ${ZAPIER.title}`}
            className="group block overflow-hidden rounded-[20px] border border-line bg-surface text-left transition-colors hover:border-violet/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/70"
          >
            <div
              className="relative h-[240px] overflow-hidden"
              style={{ background: zapierShot ? "#f4f2ee" : "#101018" }}
            >
              {zapierShot ? (
                <img
                  src={ZAPIER.shot}
                  alt={ZAPIER.alt}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <ZapierGraph />
              )}
            </div>
            <div className="px-6 py-5">
              <span className="mb-2.5 inline-flex rounded-full bg-orange-500/15 px-2.5 py-1 text-[11px] text-orange-300">
                {ZAPIER.badge}
              </span>
              <h3 className="mt-2 mb-2 text-xl font-medium text-fg">{ZAPIER.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">{ZAPIER.body}</p>
              <TagRow tags={ZAPIER.tags} />
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-violet">
                Open project
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </button>

          {/* Stack on the bench — reference only, never a case study. */}
          <article className="overflow-hidden rounded-[20px] border border-line bg-surface">
            <div className="relative h-[240px] bg-[#101018]">
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
              <TagRow tags={["n8n", "Make.com", "OpenAI", "Claude"]} />
            </div>
          </article>
        </div>
      </div>
      <div className="pb-6">
        <SceneHint label="Step through" />
      </div>

      {open ? <ProjectDialog project={open} onClose={close} /> : null}
    </section>
  );
}

function TagRow({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-lg border border-line bg-fg/5 px-2.5 py-1 text-xs text-fg/80"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------ Dialog ------------------------------ */

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const hasShot = useShot(project.shot);
  const extras = useShots(project.extras);

  // The room warp listens on window in the bubble phase. Capture-phase
  // listeners here stop wheel / swipe / arrow keys from changing rooms
  // underneath the open dialog.
  useEffect(() => {
    const swallow = (e: Event) => e.stopPropagation();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(e.key)) {
        e.stopPropagation();
      }
    };
    window.addEventListener("wheel", swallow, { capture: true, passive: false });
    window.addEventListener("touchstart", swallow, true);
    window.addEventListener("touchend", swallow, true);
    window.addEventListener("keydown", onKey, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("wheel", swallow, true);
      window.removeEventListener("touchstart", swallow, true);
      window.removeEventListener("touchend", swallow, true);
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] w-[min(96vw,1180px)] overflow-y-auto rounded-[20px] border border-line bg-surface shadow-2xl"
      >
        <div className="relative">
          <div className="relative h-[58dvh] w-full overflow-hidden rounded-t-[20px] bg-[#0b0b12]">
            {hasShot ? (
              <img
                src={project.shot}
                alt={project.alt}
                className="absolute inset-0 h-full w-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                {project.id === "front-desk" ? (
                  <FrontDeskGraph />
                ) : project.id === "zapier" ? (
                  <ZapierGraph />
                ) : (
                  <SocialGraph dark />
                )}
                <p className="text-xs tracking-wide text-muted">
                  Capture not added yet — drop {project.shot.replace("/projects/", "")} into
                  public/projects/
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 grid size-9 place-items-center rounded-full border border-white/15 bg-black/60 text-fg transition-colors hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/70"
          >
            ✕
          </button>
        </div>

        {extras.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto border-b border-line px-6 py-4">
            {extras.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${project.title} — additional capture`}
                className="h-[128px] w-auto shrink-0 rounded-lg border border-line object-cover object-left-top"
                loading="lazy"
              />
            ))}
          </div>
        ) : null}

        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-3 font-display text-[26px] font-medium tracking-tight text-fg">
            {project.title}
          </h3>
          <p className="mb-5 max-w-[70ch] text-[15px] leading-relaxed text-muted">
            {project.body}
          </p>
          <TagRow tags={project.tags} />
          {project.meta ? (
            <p className="mt-4 text-xs tracking-wide text-muted">{project.meta}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Graphs ------------------------------ */

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

/** n8n only. Never shows a Make module. */
function FrontDeskGraph() {
  return (
    <div className="relative h-[280px] w-full max-w-[640px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 640 280"
        fill="none"
        aria-hidden
      >
        <path d="M150 140 H250" stroke="rgba(139,124,255,.7)" strokeWidth="1.5" />
        <path
          d="M360 140 C430 140, 430 48, 500 48"
          stroke="rgba(139,124,255,.55)"
          strokeWidth="1.5"
        />
        <path d="M360 140 H500" stroke="rgba(139,124,255,.55)" strokeWidth="1.5" />
        <path
          d="M360 140 C430 140, 430 200, 500 200"
          stroke="rgba(139,124,255,.55)"
          strokeWidth="1.5"
        />
        <path
          d="M360 140 C400 140, 400 250, 240 250"
          stroke="rgba(248,113,113,.55)"
          strokeWidth="1.5"
        />
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

/** Make.com only. Never shows an n8n node. */
function SocialGraph({ dark }: { dark?: boolean }) {
  return (
    <div className="relative h-full min-h-[180px] w-full">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 520 180"
        fill="none"
        aria-hidden
      >
        <path d="M90 45 C180 45, 180 90, 260 90" stroke="#7c6cf0" strokeWidth="1.6" />
        <path d="M90 135 C180 135, 180 90, 260 90" stroke="#7c6cf0" strokeWidth="1.6" />
        <path d="M340 90 H430" stroke="#7c6cf0" strokeWidth="1.6" />
      </svg>
      <Node
        className="top-6 left-3"
        color="bg-violet"
        label="Facebook Messenger"
        light={!dark}
      />
      <Node
        className="bottom-6 left-3"
        color="bg-emerald-400"
        label="WhatsApp"
        light={!dark}
      />
      <Node
        className="top-[72px] left-[210px]"
        color="bg-amber"
        label="Google Sheets"
        light={!dark}
      />
      <Node className="top-[72px] left-[390px]" color="bg-blue-400" label="Gmail" light={!dark} />
    </div>
  );
}

/** Zapier only. Never shows an n8n node or a Make module. */
function ZapierGraph() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 px-5">
      {[
        { color: "bg-orange-400", label: "Webhooks by Zapier" },
        { color: "bg-emerald-400", label: "Google Sheets" },
        { color: "bg-red-400", label: "Gmail" },
        { color: "bg-violet", label: "Slack" },
      ].map((n, i) => (
        <div key={n.label} className="flex flex-col items-center gap-2.5">
          {i > 0 ? (
            <svg className="h-3 w-2" viewBox="0 0 8 12" fill="none" aria-hidden>
              <path d="M4 0 V12" stroke="rgba(139,124,255,.6)" strokeWidth="1.6" />
            </svg>
          ) : null}
          <Chip color={n.color} label={n.label} />
        </div>
      ))}
    </div>
  );
}

/**
 * Two independent lanes. n8n and Make are never wired into the same graph.
 *   OpenAI → n8n  → Sheets
 *   Claude → Make → Gmail
 */
function StackGraph() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-5 px-5 py-5">
      <Lane
        from={{ color: "bg-violet", label: "OpenAI" }}
        via={{ color: "bg-amber", label: "n8n" }}
        to={{ color: "bg-emerald-400", label: "Sheets" }}
        stroke="rgba(139,124,255,.65)"
      />
      <Lane
        from={{ color: "bg-magenta", label: "Claude" }}
        via={{ color: "bg-indigo", label: "Make" }}
        to={{ color: "bg-blue-400", label: "Gmail" }}
        stroke="rgba(52,211,153,.55)"
      />
    </div>
  );
}

function Lane({
  from,
  via,
  to,
  stroke,
}: {
  from: { color: string; label: string };
  via: { color: string; label: string };
  to: { color: string; label: string };
  stroke: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Chip color={from.color} label={from.label} />
      <Connector stroke={stroke} />
      <Chip color={via.color} label={via.label} />
      <Connector stroke={stroke} />
      <Chip color={to.color} label={to.label} />
    </div>
  );
}

function Connector({ stroke }: { stroke: string }) {
  return (
    <svg className="h-2 min-w-[18px] flex-1" viewBox="0 0 40 8" fill="none" aria-hidden>
      <path d="M0 4 H40" stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

function Chip({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-[10px] border border-white/10 bg-[#1a1b24] px-3 py-2 text-xs whitespace-nowrap text-fg">
      <span className={`size-1.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}
