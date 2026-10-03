import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Check,
  ChevronRight,
  X,
  Menu,
  Workflow,
  MessageSquare,
  CalendarDays,
  Route as RouteIcon,
  Expand,
  Copy,
  Download,
  Mail,
  CheckCheck,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { PROJECTS, type Project } from "./projects";
import { CONTACT_EMAIL, ENQUIRY_WEBHOOK_URL } from "./contact-config";

const tools = ["GoHighLevel", "n8n", "Make.com", "Zapier", "Google Sheets", "Other"];
const outcomes = [
  "Keep every candidate and next step in one place.",
  "Connect patient conversations with appointment admin.",
  "Keep enquiries moving on the channel they came from.",
  "Give priority leads their own follow-up path.",
];
const icons = [Workflow, CalendarDays, MessageSquare, RouteIcon];

export function Portfolio() {
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    document.querySelectorAll("main > section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menu) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);
  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav-inner">
          <a href="#home" className="brand" aria-label="Keanu home" onClick={() => setMenu(false)}>
            <img src="/keanu-logo.svg" width="34" height="34" alt="" />
            <span>
              KEANU<span className="brand-dot">.</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="desktop-nav">
            <a href="#work" aria-current={active === "work" ? "location" : undefined}>
              Selected work
            </a>
            <a href="#how" aria-current={active === "how" ? "location" : undefined}>
              How it works
            </a>
          </nav>
          <a className="nav-cta" href="#contact">
            Let’s talk <ArrowUpRight size={16} />
          </a>
          <button
            id="menu-toggle"
            className="icon-button mobile-toggle"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav id="mobile-menu" className="mobile-menu container" aria-label="Mobile navigation">
            {[
              ["Selected work", "work"],
              ["How it works", "how"],
              ["Start a project", "contact"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main">
        <section id="home" className="hero-section container">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> INDEPENDENT AUTOMATION SPECIALIST
            </p>
            <h1>
              Less busywork.
              <br />
              More <span>follow-through.</span>
            </h1>
            <p className="hero-description">
              I connect your tools so enquiries become next steps. From the first message to the
              follow-up, build a workflow that keeps things moving.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button primary">
                Explore my work <ArrowDown size={18} />
              </a>
              <a href="#contact" className="text-link">
                Let’s map your workflow <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-note">
              <span className="note-line" /> Built around your process. Connected to your tools.
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Illustration of an enquiry becoming an organised follow-up"
          >
            <img className="portal-art" src="/keanu-portal.jpg" alt="" fetchPriority="high" />
            <div className="art-top">
              <span className="mini-mark">K / SYSTEMS</span>
              <span>01 — CONNECTED</span>
            </div>
            <div className="workflow-illustration">
              <div className="flow-label">FROM INBOX TO NEXT STEP</div>
              <div className="flow-node">
                <span className="node-icon">
                  <MessageSquare size={18} />
                </span>
                <div>
                  <strong>A new enquiry</strong>
                  <small>Your website, chat, or inbox</small>
                </div>
                <span className="node-dot" />
              </div>
              <div className="flow-connector">
                <span />
              </div>
              <div className="flow-node flow-main">
                <span className="node-icon">
                  <Workflow size={19} />
                </span>
                <div>
                  <strong>Everything, connected.</strong>
                  <small>Capture · route · follow up</small>
                </div>
                <Check size={17} />
              </div>
              <div className="flow-connector">
                <span />
              </div>
              <div className="flow-node flow-done">
                <span className="node-icon">
                  <CheckCheck size={20} />
                </span>
                <div>
                  <strong>The next step, handled</strong>
                  <small>Clear records. Fewer loose ends.</small>
                </div>
              </div>
            </div>
            <div className="art-bottom">
              <span className="status-dot" /> A LITTLE LESS MANUAL. A LOT MORE CONNECTED.
            </div>
          </div>
        </section>
        <div className="stack-strip container">
          <span>THE TOOLS BEHIND THE WORK</span>
          <div className="tools-marquee" role="region" aria-label="Tools I work with">
            <div
              className="tools-track"
              style={{ animationPlayState: marqueePaused ? "paused" : undefined }}
            >
              {[0, 1].map((copy) => (
                <div className="tools-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                  {["GoHighLevel", "n8n", "Make", "Zapier", "Google Sheets"].map((tool) => (
                    <span key={tool}>
                      {tool === "n8n" && <Workflow size={20} />}
                      {tool}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button
            className="marquee-toggle"
            type="button"
            aria-label={marqueePaused ? "Play tools marquee" : "Pause tools marquee"}
            onClick={() => setMarqueePaused((value) => !value)}
          >
            {marqueePaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
        <section id="work" className="work-section container section-space">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / SELECTED WORK</p>
              <h2>
                Real workflows.
                <br />
                <span>A closer look.</span>
              </h2>
            </div>
            <p>
              A look inside the systems I’ve built, with the actual setup, connected tools, and
              decisions behind each workflow.
            </p>
          </div>
          <div className="project-grid">
            {PROJECTS.map((p, i) => {
              const Icon = icons[i];
              return (
                <button
                  key={p.id}
                  className={`project-card ${p.lead ? "featured-project" : ""}`}
                  onClick={() => setProject(p)}
                  aria-label={`View ${p.title}`}
                >
                  <div className={`project-preview preview-${p.graph}`}>
                    <div className="preview-toolbar">
                      <span className="window-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span>
                        {p.kicker} / {p.lead ? "Pipeline overview" : "Workflow canvas"}
                      </span>
                      <Expand size={13} />
                    </div>
                    <div className="preview-image">
                      <img src={p.shot} alt={`${p.short} setup preview`} loading="lazy" />
                    </div>
                    {p.lead && (
                      <span className="preview-caption">
                        <span className="status-dot" /> PRACTICE ENVIRONMENT
                      </span>
                    )}
                  </div>
                  <div className="project-info">
                    <div className="project-meta">
                      <span>
                        <Icon size={15} /> {p.kicker}
                      </span>
                      <span>{p.lead ? "FEATURED / PRACTICE BUILD" : `0${i + 1}`}</span>
                    </div>
                    <h3>
                      {p.short}
                      <ArrowUpRight size={23} />
                    </h3>
                    <p>{outcomes[i]}</p>
                    {p.lead && (
                      <>
                        <div className="project-facts">
                          <div>
                            <strong>5</strong>
                            <span>pipeline stages</span>
                          </div>
                          <div>
                            <strong>20</strong>
                            <span>practice bookings</span>
                          </div>
                          <div>
                            <strong>Draft</strong>
                            <span>workflow status</span>
                          </div>
                        </div>
                        <p className="practice-note">
                          Fictional contacts. No live customer messages.
                        </p>
                      </>
                    )}
                    <span className="project-link">
                      {p.lead ? "Explore the CRM setup" : "Explore the workflow"}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
        <section id="how" className="how-section section-space">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / THE APPROACH</p>
                <h2>
                  Good systems start
                  <br />
                  with a clear <span>next step.</span>
                </h2>
              </div>
              <p>
                Start with the way your business actually works. Then connect the right tools, with
                a clear path for the unexpected.
              </p>
            </div>
            <div className="process-grid">
              {[
                {
                  title: "Map the process",
                  body: "Where do enquiries arrive? Who needs to act? We map the handoffs and decide what should happen next.",
                  detail: "A workflow map before the build",
                },
                {
                  title: "Connect the pieces",
                  body: "Capture the details, route them to the right place, and follow up through the tools you already use.",
                  detail: "Your tools, working together",
                },
                {
                  title: "Check the edges",
                  body: "Test replies, missing details, and failed steps. Make it clear when automation should stop and a person should take over.",
                  detail: "Clear checks and handoffs",
                },
              ].map((step, i) => (
                <article className="process-step" key={step.title}>
                  <div className="process-number">
                    <span>0{i + 1}</span>
                    {i < 2 && <ArrowRight size={20} />}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <div className="process-detail">
                    <Check size={15} />
                    {step.detail}
                  </div>
                </article>
              ))}
            </div>
            <div className="approach-note">
              <span className="note-symbol">↳</span>
              <p>
                The goal is simple:{" "}
                <strong>
                  less chasing, fewer missed handoffs, and a clear record of what happened.
                </strong>
              </p>
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section container section-space">
          <div className="contact-copy">
            <p className="eyebrow">03 / LET’S BUILD SOMETHING USEFUL</p>
            <h2>
              What’s taking up
              <br />
              too much of
              <br />
              <span>your time?</span>
            </h2>
            <p>
              Tell me what keeps getting done by hand. We’ll start there and map a better way
              through it.
            </p>
            <div className="contact-promise">
              <Workflow size={22} />
              <div>
                <strong>A clear plan comes first.</strong>
                <span>We’ll map the workflow before building it.</span>
              </div>
            </div>
            <a href="#work" className="text-link">
              See what a workflow can look like <ArrowUpRight size={17} />
            </a>
          </div>
          <BriefForm />
        </section>
      </main>
      <footer className="container site-footer">
        <a className="brand" href="#home">
          KEANU<span className="brand-dot">.</span>
        </a>
        <p>Thoughtful systems. Less manual work.</p>
        <a href="#home">
          Back to top <ArrowUpRight size={15} />
        </a>
        <span>© {new Date().getFullYear()} Keanu</span>
      </footer>
      <ProjectDialog project={project} onClose={() => setProject(null)} />
    </div>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [laneIndex, setLaneIndex] = useState(0);
  useEffect(() => {
    if (!project) return;
    setLaneIndex(0);
    const el = dialog.current!;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = "hidden";
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = Array.from(
        el.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'),
      );
      const first = items[0],
        last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    el.addEventListener("keydown", trapFocus);
    return () => {
      el.removeEventListener("keydown", trapFocus);
      el.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [project]);
  const lane = project?.lanes[laneIndex] ?? project?.lanes[0];
  return (
    <dialog
      className="project-dialog"
      ref={dialog}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="case-title"
    >
      {project && lane && (
        <div className="dialog-shell">
          <div className="dialog-header">
            <div>
              <p className="eyebrow">PROJECT NOTES / {project.kicker}</p>
              <h2 id="case-title">{project.title}</h2>
            </div>
            <button autoFocus className="icon-button" onClick={onClose} aria-label="Close project">
              <X />
            </button>
          </div>
          <div className="case-navigation" aria-label="Project views">
            {project.lanes.map((l, i) => (
              <button key={l.src} aria-pressed={i === laneIndex} onClick={() => setLaneIndex(i)}>
                {l.label}
              </button>
            ))}
          </div>
          <div className="case-content">
            <div className="case-visual">
              <a
                href={lane.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open full-size ${lane.label} screenshot`}
              >
                <img src={lane.src} alt={`${project.title}: ${lane.label}`} />
                <span className="enlarge-label">
                  <Expand size={15} /> Open full-size image
                </span>
              </a>
            </div>
            <div className="case-description" aria-live="polite">
              <p className="eyebrow">
                {String(laneIndex + 1).padStart(2, "0")} / {lane.label}
              </p>
              <h3>Inside the workflow</h3>
              <p>{lane.summary}</p>
              <ul>
                {lane.steps.map((step) => (
                  <li key={step}>
                    <Check size={15} />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <div className="case-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {project.caveat && <p className="case-caveat">{project.caveat}</p>}
            </div>
          </div>
          <div className="dialog-footer">
            <span>Actual setup screenshots</span>
            <button
              className="text-link"
              onClick={() => {
                onClose();
                document.getElementById("contact")?.scrollIntoView({
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "instant"
                    : "smooth",
                });
              }}
            >
              Discuss a similar workflow <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

type SendState = "idle" | "sending" | "sent" | "failed";

interface Enquiry {
  name: string;
  email: string;
  business: string;
  tools: string[];
  problem: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_PROBLEM_LENGTH = 20;
const SEND_TIMEOUT_MS = 15000;

const sendNotes: Record<SendState, string> = {
  idle: "",
  sending: "Sending your brief…",
  sent: "Sent. A short note is on its way.",
  failed: "The send failed. Your brief is still here.",
};

const sendIntros: Record<SendState, string> = {
  idle: "",
  sending: "Sending it to Keanu now.",
  sent: "Keanu has your brief. Keep a copy if you like.",
  failed: "Keanu has not received it yet. Try again, or copy or download it to share another way.",
};

async function postEnquiry(enquiry: Enquiry): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
  try {
    const response = await fetch(ENQUIRY_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...enquiry,
        page: window.location.href,
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function BriefForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [brief, setBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [sendState, setSendState] = useState<SendState>("idle");
  const enquiry = useRef<Enquiry | null>(null);
  const result = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (brief) result.current?.focus();
  }, [brief]);
  async function send(next: Enquiry) {
    setSendState("sending");
    setSendState((await postEnquiry(next)) ? "sent" : "failed");
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (key: string) => String(data.get(key) ?? "").trim();
    const next: Enquiry = {
      name: field("name"),
      email: field("email"),
      business: field("business"),
      tools: tools.filter((tool) => selected.includes(tool)),
      problem: field("brief"),
    };
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const briefInput = form.elements.namedItem("brief") as HTMLTextAreaElement;
    emailInput.setCustomValidity(
      EMAIL_PATTERN.test(next.email) ? "" : "Enter a full email address, like alex@company.com.",
    );
    briefInput.setCustomValidity(
      next.problem.length >= MIN_PROBLEM_LENGTH
        ? ""
        : `Add a little more detail. Minimum ${MIN_PROBLEM_LENGTH} characters.`,
    );
    if (!form.reportValidity()) return;
    setBrief(
      `Workflow enquiry\n\nName: ${next.name}\nReply to: ${next.email}\nBusiness: ${next.business || "Not specified"}\nTools: ${next.tools.join(", ") || "To discuss"}\n\n${next.problem}`,
    );
    setCopied(false);
    setCopyError(false);
    enquiry.current = next;
    void send(next);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(brief!);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([brief!], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow-brief.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="brief-panel">
      <form ref={formRef} onSubmit={submit} hidden={brief !== null}>
        <div className="form-heading">
          <h3>Tell me about your workflow</h3>
          <span>About 2 minutes</span>
        </div>
        <p className="form-intro">A few details are all we need to start.</p>
        <div className="form-row">
          <label htmlFor="brief-name">
            Your name <span>*</span>
            <input
              id="brief-name"
              name="name"
              autoComplete="name"
              required
              pattern=".*\S.*"
              maxLength={100}
              placeholder="Alex Taylor"
            />
          </label>
          <label htmlFor="brief-email">
            Email address <span>*</span>
            <input
              id="brief-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="alex@company.com"
              onInput={(e) => e.currentTarget.setCustomValidity("")}
            />
          </label>
        </div>
        <label htmlFor="brief-business">
          Business <span className="optional">Optional</span>
          <input
            id="brief-business"
            name="business"
            autoComplete="organization"
            maxLength={150}
            placeholder="Your business or team"
          />
        </label>
        <fieldset>
          <legend>
            Which tools do you use? <span className="optional">Optional</span>
          </legend>
          <div className="tool-options">
            {tools.map((tool) => (
              <button
                key={tool}
                type="button"
                aria-pressed={selected.includes(tool)}
                onClick={() =>
                  setSelected((prev) =>
                    prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool],
                  )
                }
              >
                {selected.includes(tool) && <Check size={13} />} {tool}
              </button>
            ))}
          </div>
        </fieldset>
        <label htmlFor="brief-description">
          What would you like to make easier? <span>*</span>
          <textarea
            id="brief-description"
            name="brief"
            required
            minLength={20}
            maxLength={5000}
            rows={4}
            placeholder="For example: Enquiries arrive in three places. I want to capture them in one sheet and follow up without chasing each one manually."
            aria-describedby="brief-help"
            onInput={(e) => e.currentTarget.setCustomValidity("")}
          />
        </label>
        <p id="brief-help" className="field-help">
          A sentence or two is perfect. Minimum 20 characters.
        </p>
        <button className="button primary form-submit" type="submit">
          Prepare my brief <ArrowRight size={18} />
        </button>
        <p className="form-disclosure">
          Sends your brief to Keanu. You can copy or download it too.
        </p>
      </form>
      {brief !== null && (
        <div className="brief-result" ref={result} tabIndex={-1}>
          <span className="result-icon">
            <Check size={25} />
          </span>
          <p className="eyebrow">READY TO SHARE</p>
          <h3>Your brief is ready.</h3>
          <p>{sendIntros[sendState]}</p>
          <pre>{brief}</pre>
          <div className="brief-actions">
            {sendState === "failed" && (
              <button
                className="button primary"
                onClick={() => enquiry.current && void send(enquiry.current)}
              >
                <RotateCcw size={16} /> Try sending again
              </button>
            )}
            {CONTACT_EMAIL && (
              <a
                className="button primary"
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let’s discuss a workflow")}&body=${encodeURIComponent(brief)}`}
              >
                <Mail size={17} /> Open email app
              </a>
            )}
            <button className="button secondary" onClick={copy}>
              <Copy size={16} />
              {copied ? "Copied" : "Copy brief"}
            </button>
            <button className="button secondary" onClick={download}>
              <Download size={16} />
              Download
            </button>
          </div>
          <p className="field-help" role="status">
            {copyError ? "Copy is unavailable. Download the brief instead." : sendNotes[sendState]}
          </p>
          <span className="sr-only" aria-live="polite">
            {copied ? "Brief copied to clipboard." : ""}
          </span>
          {(sendState === "idle" || sendState === "failed") && (
            <button
              className="text-link edit-brief"
              onClick={() => {
                setBrief(null);
                setSendState("idle");
                requestAnimationFrame(() => formRef.current?.querySelector("input")?.focus());
              }}
            >
              Edit my details <ChevronRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
