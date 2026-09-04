import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { SiteNav, SceneHint } from "./SiteNav";

type Lane = {
  src: string;
  label: string;
  summary: string;
  steps: string[];
};

type Project = {
  id: string;
  kicker: string;
  title: string;
  short: string;
  body: string;
  tags: string[];
  shot: string;
  lanes: Lane[];
  graph: "front" | "social" | "zapier";
  dark: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "front-desk",
    kicker: "n8n",
    title: "AI Front Desk for a Dental Practice",
    short: "AI Front Desk",
    body: "Chat books the visit. Reminders, leads, and an error lane sit beside it.",
    tags: ["n8n", "Anthropic", "Google Calendar", "Gmail", "Sheets"],
    shot: "/projects/front-desk.png",
    dark: true,
    graph: "front",
    lanes: [
      {
        src: "/projects/front-desk.png",
        label: "Booking",
        summary: "A patient writes in website chat. One agent runs the appointment.",
        steps: [
          "Reads the calendar and existing bookings",
          "Books, moves, or cancels the visit",
          "Emails the confirmation",
          "Logs the booking on a sheet",
        ],
      },
      {
        src: "/projects/front-desk-error.png",
        label: "Errors",
        summary: "If another workflow fails, this one catches it so the rest keep running.",
        steps: [
          "Classifies what broke",
          "Writes it to an error log",
          "Retries when it is safe to retry",
          "Emails the team only if it is critical",
        ],
      },
      {
        src: "/projects/front-desk-reminders.png",
        label: "Reminders",
        summary: "Two clocks. Nobody on staff has to send these emails.",
        steps: [
          "Every day at 8am: people with a visit in the next 1–2 days get a reminder",
          "Every Monday at 8am: people from about six months ago get a recall",
          "Each send is written back to the patient sheet",
        ],
      },
      {
        src: "/projects/front-desk-leads.png",
        label: "Leads",
        summary: "A form on the website becomes a row, a reply, and a ping to staff.",
        steps: [
          "The form posts into n8n",
          "Fields are cleaned up",
          "The lead is saved to Google Sheets",
          "The person gets an auto-reply",
          "Staff get an email",
        ],
      },
    ],
  },
  {
    id: "social-followup",
    kicker: "Make.com",
    title: "Enquiry to Social Follow-up",
    short: "Social follow-up",
    body: "Enquiry is logged, then answered on email, Messenger, or WhatsApp.",
    tags: ["Make.com", "Google Sheets", "Gmail", "Messenger", "WhatsApp"],
    shot: "/projects/social-followup.png",
    dark: false,
    graph: "social",
    lanes: [
      {
        src: "/projects/social-followup.png",
        label: "Scenario",
        summary: "This is Make, not n8n. One webhook, one sheet, then a split by channel.",
        steps: [
          "The enquiry arrives",
          "It is saved as a row",
          "If they came from Facebook, Messenger replies",
          "If they came from WhatsApp, WhatsApp replies",
          "You also get an email",
        ],
      },
      {
        src: "/projects/social-followup-sheet.png",
        label: "The sheet",
        summary: "This is the log the scenario writes to.",
        steps: [
          "Columns: time, name, email, phone, channel, message, status",
          "Each new enquiry becomes one row",
          "Nothing is typed in by hand",
        ],
      },
    ],
  },
  {
    id: "zapier-routing",
    kicker: "Zapier",
    title: "Lead Routing with Priority Paths",
    short: "Lead routing",
    body: "Referrals get a drafted email. Everyone else notifies sales.",
    tags: ["Zapier", "Google Sheets", "Gmail", "AI by Zapier"],
    shot: "/projects/zapier-apollo.png",
    dark: false,
    graph: "zapier",
    lanes: [
      {
        src: "/projects/zapier-apollo.png",
        label: "Paths",
        summary: "One webhook. Two paths. Referrals get a drafted email. Everyone else notifies sales.",
        steps: [
          "The lead hits the webhook",
          "If they are a referral: save the row, AI drafts a reply, Gmail sends it to the client",
          "Anyone else: Gmail notifies the sales team",
        ],
      },
    ],
  },
];

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [laneSrc, setLaneSrc] = useState<string | null>(null);
  const open = PROJECTS.find((p) => p.id === openId) ?? null;
  const lane =
    open?.lanes.find((l) => l.src === laneSrc) ?? open?.lanes[0] ?? null;

  useEffect(() => {
    setLaneSrc(open?.shot ?? null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="relative flex min-h-dvh flex-col bg-bg">
      <SiteNav />
      <div className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col justify-center px-6 py-8 lg:px-8">
        <p className="mb-2 text-[11px] font-medium tracking-[0.18em] text-violet">
          PROJECTS
        </p>
        <h2 className="font-display mb-8 text-[28px] leading-[1.1] font-normal tracking-tight text-fg md:text-[36px]">
          What I've built
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </div>
      </div>
      <div className="pb-6">
        <SceneHint label="Step through" />
      </div>

      {open && lane ? (
        <div
          className="absolute inset-0 z-30 flex items-end justify-center bg-[#05040a]/80 p-3 backdrop-blur-md md:items-center md:p-6"
          onWheel={(e) => e.stopPropagation()}
          onClick={() => setOpenId(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="max-h-[min(94dvh,900px)] w-full max-w-[1120px] overflow-hidden rounded-[20px] border border-line bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid max-h-[min(94dvh,900px)] grid-cols-1 overflow-y-auto lg:grid-cols-[1.2fr_0.9fr]">
              <div className={`relative min-h-[240px] ${open.dark ? "bg-[#101018]" : "bg-[#eceae4]"}`}>
                <Shot
                  src={lane.src}
                  className="max-h-[56dvh] min-h-[240px] object-contain lg:max-h-none lg:min-h-full"
                >
                  <Graph id={open.graph} />
                </Shot>
              </div>

              <div className="flex flex-col border-t border-line px-7 py-7 lg:border-t-0 lg:border-l">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <p className="text-[11px] font-medium tracking-[0.18em] text-violet">
                    {open.kicker}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpenId(null)}
                    className="liquid-glass flex size-9 shrink-0 items-center justify-center rounded-full"
                    aria-label="Close project"
                  >
                    <X className="size-4 text-fg" />
                  </button>
                </div>

                <h3
                  id="project-title"
                  className="font-display text-[26px] leading-[1.1] font-medium tracking-tight text-fg md:text-[30px]"
                >
                  {open.title}
                </h3>

                {open.lanes.length > 1 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {open.lanes.map((l) => {
                      const active = l.src === lane.src;
                      return (
                        <button
                          key={l.src}
                          type="button"
                          onClick={() => setLaneSrc(l.src)}
                          className={`rounded-full px-3 py-1.5 text-[11px] tracking-[0.12em] uppercase ${
                            active
                              ? "bg-violet/20 text-fg"
                              : "text-muted hover:text-fg"
                          }`}
                        >
                          {l.label}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                <p className="mt-5 text-[15px] leading-relaxed text-muted">{lane.summary}</p>

                <ul className="mt-5 space-y-2.5">
                  {lane.steps.map((step) => (
                    <li key={step} className="flex gap-3 text-[14px] leading-relaxed text-fg/85">
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-violet" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  {open.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-line px-2.5 py-1 text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group overflow-hidden rounded-[18px] border border-line bg-surface text-left transition-colors hover:border-violet/40"
    >
      <div
        className={`relative h-[168px] ${project.dark ? "bg-[#101018]" : "bg-[#eceae4]"}`}
      >
        <Shot src={project.shot} className="h-full object-contain p-3">
          <Graph id={project.graph} />
        </Shot>
      </div>
      <div className="px-5 py-4">
        <p className="mb-2 text-[10px] font-medium tracking-[0.18em] text-violet">
          {project.kicker}
        </p>
        <h3 className="mb-1.5 text-[17px] font-medium tracking-tight text-fg">
          {project.short}
        </h3>
        <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-muted">
          {project.body}
        </p>
        <p className="text-[10px] tracking-[0.16em] text-muted uppercase group-hover:text-violet">
          View workflow
        </p>
      </div>
    </button>
  );
}

function Graph({ id }: { id: Project["graph"] }) {
  if (id === "front") return <FrontDeskGraph />;
  if (id === "social") return <SocialGraph />;
  return <ZapierGraph />;
}

function Shot({
  src,
  className,
  children,
}: {
  src: string;
  className?: string;
  children: ReactNode;
}) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    let live = true;
    setOk(false);
    fetch(src, { method: "HEAD" })
      .then((r) => {
        if (live && r.ok) setOk(true);
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, [src]);
  if (!ok) return <div className={className}>{children}</div>;
  return <img src={src} alt="" className={`h-full w-full ${className ?? ""}`} />;
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
    <div className="relative h-full min-h-[240px] w-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 280" fill="none" aria-hidden>
        <path d="M150 140 H250" stroke="rgba(139,124,255,.7)" strokeWidth="1.5" />
        <path d="M360 140 C430 140, 430 48, 500 48" stroke="rgba(139,124,255,.55)" strokeWidth="1.5" />
        <path d="M360 140 H500" stroke="rgba(139,124,255,.55)" strokeWidth="1.5" />
        <path d="M360 140 C430 140, 430 200, 500 200" stroke="rgba(139,124,255,.55)" strokeWidth="1.5" />
      </svg>
      <Node className="top-[118px] left-4" color="bg-blue-400" label="Website Chat" />
      <Node className="top-[118px] left-[248px]" color="bg-violet" label="Booking Agent" />
      <Node className="top-7 left-[500px]" color="bg-emerald-400" label="Calendar" />
      <Node className="top-[118px] left-[500px]" color="bg-amber" label="Gmail" />
    </div>
  );
}

function SocialGraph() {
  return (
    <div className="relative h-full w-full">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 180" fill="none" aria-hidden>
        <path d="M90 90 H250" stroke="#7c6cf0" strokeWidth="1.6" />
        <path d="M250 90 H400" stroke="#7c6cf0" strokeWidth="1.6" />
      </svg>
      <Node className="top-[72px] left-3" color="bg-violet" label="Webhook" light />
      <Node className="top-[72px] left-[210px]" color="bg-amber" label="Sheet" light />
      <Node className="top-[72px] left-[390px]" color="bg-emerald-400" label="Router" light />
    </div>
  );
}

function ZapierGraph() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f7f6f3]">
      <Node className="top-4 left-[180px]" color="bg-orange-400" label="Catch Hook" light />
      <Node className="top-[72px] left-[168px]" color="bg-emerald-400" label="Google Sheets" light />
      <Node className="bottom-4 left-[196px]" color="bg-red-400" label="Gmail" light />
    </div>
  );
}
