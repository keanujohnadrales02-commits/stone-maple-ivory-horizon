import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Award,
  Check,
  ChevronRight,
  CodeXml,
  Cpu,
  KeyRound,
  Network,
  Send,
  Webhook,
  X,
  Menu,
  Workflow,
  MessageSquare,
  Expand,
  Copy,
  Download,
  Mail,
  CheckCheck,
  RotateCcw,
  CalendarCheck,
  BellRing,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { PROJECTS, type Project } from "./projects";
import { CONTACT_EMAIL, ENQUIRY_WEBHOOK_URL } from "./contact-config";

const tools = ["GoHighLevel", "n8n", "Make.com", "Zapier", "Google Sheets", "Other"];
const navLinks = [
  ["What I build", "build"],
  ["Selected work", "work"],
  ["How it works", "how"],
];
const UPWORK_URL = "https://www.upwork.com/freelancers/~01bdfaac6589e3786e";
// Prices and reply time shown on the homepage.
const SETUP_PRICE = "$1,997";
const MONTHLY_PRICE = "$397";
const REPLY_TIME = "2 working days";
const roles = ["AI Front Desk for GoHighLevel", "Fewer missed enquiries", "Set up in writing, with almost no calls"];
const certificates = [
  { name: "HighLevel CRM", date: "May 12, 2026", src: "/certs/highlevel.png" },
  { name: "AI Automation with n8n", date: "April 21, 2026", src: "/certs/n8n.png" },
  { name: "No Code Automation with Make.com", date: "March 31, 2026", src: "/certs/make.png" },
  { name: "No Code Automation with Zapier", date: "March 26, 2026", src: "/certs/zapier.png" },
];
const techStack: { name: string; logo?: string; mono?: string; Icon?: LucideIcon }[] = [
  { name: "GoHighLevel", mono: "HL" },
  { name: "n8n", logo: "n8n" },
  { name: "Make.com", logo: "make" },
  { name: "Zapier", logo: "zapier" },
  { name: "Claude", logo: "claude" },
  { name: "Claude Code", logo: "claude" },
  { name: "ChatGPT", logo: "openai" },
  { name: "Gemini", logo: "googlegemini" },
  { name: "Vertex AI", logo: "googlecloud" },
  { name: "VAPI", mono: "VA" },
  { name: "Google Sheets", logo: "googlesheets" },
  { name: "Gmail", logo: "gmail" },
  { name: "Google Calendar", logo: "googlecalendar" },
  { name: "Slack", logo: "slack" },
  { name: "WhatsApp", logo: "whatsapp" },
  { name: "Messenger", logo: "messenger" },
  { name: "Typeform", mono: "TF" },
  { name: "Airtable", logo: "airtable" },
  { name: "Asana", logo: "asana" },
  { name: "Apollo", mono: "AP" },
  { name: "Xero", logo: "xero" },
  { name: "Webhooks", Icon: Webhook },
  { name: "REST APIs", Icon: Network },
  { name: "JSON", logo: "json" },
  { name: "OAuth 2.0", Icon: KeyRound },
  { name: "Git & GitHub", logo: "github" },
  { name: "VS Code", mono: "VS" },
  { name: "React", logo: "react" },
  { name: "TypeScript", logo: "typescript" },
  { name: "Vercel", logo: "vercel" },
];
const portfolioTabs = [
  { id: "projects", label: "Projects", Icon: CodeXml },
  { id: "certificates", label: "Certificates", Icon: Award },
  { id: "stack", label: "Tech Stack", Icon: Cpu },
];
const LOADER_MS = 1800;
const LOADER_MAX_WAIT_MS = 3500;
const prefersStill = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const jobs = [
  {
    icon: MessageSquare,
    title: "Answers questions",
    body: "It answers from a list you approve: hours, services, address and prices. If the answer isn’t on the list, it says so and offers to pass the question to you.",
  },
  {
    icon: CalendarCheck,
    title: "Offers real open times",
    body: "It checks your GoHighLevel calendar and offers times in your time zone. It never makes up a time.",
  },
  {
    icon: CheckCheck,
    title: "Books only after a clear yes",
    body: "It reads the details back and asks first. Then it saves the customer and books the appointment. A returning customer with the same email stays as one contact.",
  },
  {
    icon: BellRing,
    title: "Tells you what needs a person",
    body: "You get an email for each new booking. You also get one when someone wants to cancel, reschedule or talk to a person.",
  },
  {
    icon: ShieldCheck,
    title: "Fails safely",
    body: "If a step fails, it apologises and shares your booking page. It never says a booking worked when it didn’t. If the whole system has a problem, you get an alert.",
  },
];

export function Portfolio() {
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
      <SiteLoader />
      <Starfield />
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
            {navLinks.map(([label, id]) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>
                {label}
              </a>
            ))}
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
            {[...navLinks, ["Start a project", "contact"]].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setMenu(false)}
              >
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
            <h1>
              <span>An AI front desk</span> that answers enquiries and books into GoHighLevel
            </h1>
            <TypedRole />
            <p className="hero-description">
              It replies on your website at any hour, offers your real open times and books only
              after the customer says yes. You get an email for every booking. I set it up for you
              in writing, with almost no calls.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="button primary">
                Send a 2-minute brief <Send size={16} />
              </a>
              <a href="#work" className="button secondary">
                See the work <ArrowRight size={17} />
              </a>
            </div>
            <div className="find-me">
              <span>FIND ME</span>
              <a href={UPWORK_URL} target="_blank" rel="noreferrer">
                Upwork <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <HangingBadge />
        </section>
        <section id="build" className="container section-space">
          <p className="positioning">
            I sell one thing: an AI front desk, set up for small service businesses that take
            appointments, like salons, home services, tutors and clinics.{" "}
            <span>
              It runs on your own accounts and is tested before your customers use it. You pay a
              one-time setup fee and a monthly care plan, and we handle the work in writing. I work
              remotely from the Philippines.
              I have 3 years in customer support at TDCX, so I know what a customer needs to hear and
              what a team needs to see.
            </span>
          </p>
          <div className="section-heading">
            <h2>What the AI Front Desk does</h2>
            <p>One system. Five jobs.</p>
          </div>
          <div className="build-grid">
            {jobs.map((job, i) => (
              <article className={`build-card ${i === 0 ? "build-lead" : ""}`} key={job.title}>
                <div className="build-card-head">
                  <span className="node-icon">
                    <job.icon size={18} />
                  </span>
                  <span className="build-num">0{i + 1}</span>
                </div>
                <h3>{job.title}</h3>
                <p>{job.body}</p>
                {i === 0 && (
                  <div className="chat-demo" aria-hidden="true">
                    <span className="chat-label">EXAMPLE CONVERSATION</span>
                    <p className="bubble in">Hi, can I book a cleaning this week?</p>
                    <p className="bubble out">I have Thursday at 10:30 or 2:15. Which works for you?</p>
                    <p className="bubble in">2:15, please.</p>
                    <div className="flow-node flow-done chat-booked">
                      <span className="node-icon">
                        <CheckCheck size={18} />
                      </span>
                      <div>
                        <strong>Booked · Thursday 2:15</strong>
                        <small>Added to GoHighLevel</small>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
          <div className="fit-bar">
            <div>
              <p className="eyebrow">BUILT FOR</p>
              <p>
                Small service businesses that depend on booked appointments, like salons, cleaning
                and home services, and tutors. For clinics, it handles general questions and booking
                only. It is not HIPAA compliant and should not collect medical details.
              </p>
            </div>
            <div>
              <p className="eyebrow">WHAT YOU NEED</p>
              <ul className="fit-plain">
                {[
                  "A GoHighLevel account with a calendar",
                  "A website where one piece of code can be added",
                  "A Gmail account for your alerts",
                ].map((item) => (
                  <li key={item}>
                    <Check size={13} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">WHAT YOU DON’T NEED</p>
              <ul>
                {["Technical knowledge", "A long string of calls", "A big project to start"].map(
                  (item) => (
                    <li key={item}>
                      <X size={13} aria-hidden="true" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <p className="eyebrow">WHAT IT DOESN’T DO</p>
              <ul className="fit-plain">
                {[
                  "Change or cancel existing appointments. It sends those requests to you.",
                  "Give medical, legal or financial advice.",
                  "Pretend to be a person. If someone asks, it says it is an AI assistant.",
                  "Reply to phone calls, text messages, Facebook, Instagram or WhatsApp.",
                  "Promise a certain number of bookings.",
                ].map((item) => (
                  <li key={item}>
                    <X size={13} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">PRICING</p>
              <ul className="fit-plain">
                {[
                  `Setup: ${SETUP_PRICE}, one time. It covers one website and one calendar.`,
                  `Monthly Care Plan: ${MONTHLY_PRICE} per month.`,
                  "Your own tools are separate: GoHighLevel, n8n and AI use.",
                ].map((item) => (
                  <li key={item}>
                    <Check size={13} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">MONTHLY CARE PLAN</p>
              <ul className="fit-plain">
                {[
                  "Watching error alerts and fixing problems with the system",
                  "Small updates to your hours, services, prices and approved answers",
                  "Testing again after each change",
                  "A short monthly summary: chat bookings, problems found and changes made",
                  `A written reply to your requests within ${REPLY_TIME}`,
                ].map((item) => (
                  <li key={item}>
                    <Check size={13} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section id="work" className="container section-space">
          <div className="section-heading">
            <h2>Selected work</h2>
            <p>My own builds, tested with sample data. Each one shows what was tested and what wasn’t.</p>
          </div>
          <PortfolioTabs onOpen={setProject} />
        </section>
        <section id="how" className="how-section section-space">
          <div className="container">
            <div className="section-heading">
              <h2>How it works, with almost no calls</h2>
              <p>
                Everything is in writing, so you always have a record of what we agreed. If you ever
                want a short call, you can ask for one.
              </p>
            </div>
            <ol className="steps">
              {[
                {
                  owner: "Your part",
                  title: "Send the brief",
                  body: "Tell me how people book with you today. It takes about 2 minutes.",
                  detail: "No call needed",
                },
                {
                  owner: "My part",
                  title: "Get a written answer",
                  body: `Within ${REPLY_TIME}, I reply with whether it fits and what I need from you. If it isn’t a good fit, I’ll tell you.`,
                  detail: "Scope in writing",
                },
                {
                  owner: "My part",
                  title: "Build and test",
                  body: "You send your hours, services, prices and anything the assistant should never answer. You connect GoHighLevel by following my written steps, and you never send me a password. Then I build it and test a normal booking, a taken time, a repeat customer, a cancel request, a failed step and someone trying to break its rules.",
                  detail: "Test results sent to you in writing",
                },
                {
                  owner: "Your part",
                  title: "Try it yourself",
                  body: "You get a short screen recording and a private link. Try to book, then send me any changes in writing.",
                  detail: "Nothing goes live until you approve it",
                },
                {
                  owner: "Live",
                  title: "Launch and check",
                  body: "It goes on your website with one piece of code. For the first 2 weeks, we check your bookings and alert emails, and I fix what needs fixing.",
                  detail: "Error alerts stay on",
                },
              ].map((step, i, steps) => (
                <li className="step" key={step.title}>
                  <span className="step-marker">0{i + 1}</span>
                  {i < steps.length - 1 && (
                    <span className="step-wire" aria-hidden="true">
                      <i />
                    </span>
                  )}
                  <article className="step-card">
                    <span className={`step-owner owner-${step.owner.split(" ")[0].toLowerCase()}`}>
                      {step.owner}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <div className="step-detail">
                      <Check size={15} />
                      {step.detail}
                    </div>
                  </article>
                </li>
              ))}
            </ol>
            <div className="goal-bar">
              <p className="eyebrow">THE GOAL</p>
              <ul>
                {[
                  "Fewer missed enquiries",
                  "Clean bookings in GoHighLevel",
                  "An alert when something fails",
                ].map((goal) => (
                  <li key={goal}>
                    <Check size={15} aria-hidden="true" />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section id="contact" className="container section-space">
          <div className="section-heading">
            <h2>Next step</h2>
          </div>
          <div className="contact-section">
            <div className="contact-copy">
              <h3>Tell me how people book with you today</h3>
              <p>
                Send the brief and I’ll reply in writing with whether it fits and what happens next.
                There’s no call to book and no cost to ask.
              </p>
              <div className="contact-promise">
                <Workflow size={22} />
                <div>
                  <strong>You don’t need a call to start.</strong>
                  <span>The brief covers what a first call would.</span>
                </div>
              </div>
              <div className="find-me">
                <span>FIND ME</span>
                <a href={UPWORK_URL} target="_blank" rel="noreferrer">
                  Upwork <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <BriefForm />
          </div>
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
        <span>© {new Date().getFullYear()} Keanu John Adrales</span>
      </footer>
      <ProjectDialog project={project} onClose={() => setProject(null)} />
    </div>
  );
}

function SiteLoader() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (prefersStill()) {
      setProgress(100);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const ready = document.readyState === "complete" || elapsed > LOADER_MAX_WAIT_MS;
      const next = Math.min(Math.round((elapsed / LOADER_MS) * 100), ready ? 100 : 95);
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div className={`site-loader ${progress === 100 ? "done" : ""}`} role="status" aria-label="Loading">
      <p className="loader-count" aria-hidden="true">
        {progress}
        <span>%</span>
      </p>
      <span className="loader-line" aria-hidden="true">
        <i style={{ width: `${progress}%` }} />
      </span>
      <p className="loader-label" aria-hidden="true">
        {progress < 50 ? "Loading data…" : progress < 100 ? "Loading assets…" : "Ready"}
      </p>
    </div>
  );
}

function Starfield() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current!;
    const ctx = el.getContext("2d")!;
    const still = prefersStill();
    const stars = Array.from({ length: window.innerWidth < 800 ? 70 : 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 0.9 + 0.3,
      drift: Math.random() * 0.00012 + 0.00002,
      phase: Math.random() * 6.3,
    }));
    const streak = { x: 0, y: 0, life: 0 };
    let frame = 0;
    const draw = (now: number) => {
      const { width, height } = el;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#dbe7ff";
      for (const star of stars) {
        star.y = (star.y - star.drift + 1) % 1;
        ctx.globalAlpha = 0.25 + 0.7 * Math.abs(Math.sin(now / 1600 + star.phase));
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.size, 0, 6.3);
        ctx.fill();
      }
      if (streak.life > 0) {
        streak.x += 7;
        streak.y += 3;
        streak.life -= 0.02;
        ctx.globalAlpha = streak.life;
        ctx.strokeStyle = "#bcd2ff";
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(streak.x - 70, streak.y - 30);
        ctx.stroke();
      } else if (Math.random() < 0.004) {
        Object.assign(streak, { x: Math.random() * width * 0.7, y: Math.random() * height * 0.5, life: 1 });
      }
      if (!still) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      el.width = window.innerWidth;
      el.height = window.innerHeight;
      if (still) draw(0);
    };
    resize();
    window.addEventListener("resize", resize);
    if (!still) frame = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <canvas ref={canvas} className="starfield" aria-hidden="true" />;
}

function TypedRole() {
  const [text, setText] = useState(roles[0]);
  useEffect(() => {
    if (prefersStill()) return;
    let role = 0;
    let length = roles[0].length;
    let deleting = true;
    let timer = 0;
    const tick = () => {
      length += deleting ? -1 : 1;
      setText(roles[role].slice(0, length));
      let wait = deleting ? 35 : 70;
      if (!deleting && length === roles[role].length) {
        deleting = true;
        wait = 1800;
      } else if (deleting && length === 0) {
        deleting = false;
        role = (role + 1) % roles.length;
        wait = 300;
      }
      timer = window.setTimeout(tick, wait);
    };
    timer = window.setTimeout(tick, LOADER_MS + 1800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <p className="hero-role">
      <span className="sr-only">{roles[0]}</span>
      <span aria-hidden="true">
        {text}
        <i className="hero-caret" />
      </span>
    </p>
  );
}

function HangingBadge() {
  const rig = useRef<HTMLDivElement>(null);
  const drag = useRef({ target: null as number | null, moved: false, startX: 0, startY: 0 });
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    if (prefersStill()) return;
    const el = rig.current!;
    let angle = 0.16;
    let speed = 0;
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const step = Math.min((now - last) / 16.7, 3);
      last = now;
      const { target } = drag.current;
      if (target !== null) {
        speed = 0;
        angle += (target - angle) * 0.25 * step;
      } else {
        speed += (-angle * 0.006 + Math.sin(now / 1100) * 0.00022) * step;
        speed *= 0.992 ** step;
        angle += speed * step;
      }
      el.style.setProperty("--swing", `${angle}rad`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  function onPointerDown(e: ReactPointerEvent<HTMLButtonElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { target: null, moved: false, startX: e.clientX, startY: e.clientY };
  }
  function onPointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const d = drag.current;
    d.moved ||= Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 6;
    if (!d.moved) return;
    const box = rig.current!.parentElement!.getBoundingClientRect();
    const angle = Math.atan2(box.left + box.width / 2 - e.clientX, e.clientY - box.top);
    d.target = Math.max(-0.8, Math.min(0.8, angle));
  }
  function release() {
    drag.current.target = null;
  }
  return (
    <div className="badge-stage">
      <div className="badge-rig" ref={rig}>
        <span className="badge-strap" aria-hidden="true">
          <span>KEANU · KEANU · KEANU · KEANU · KEANU · KEANU</span>
        </span>
        <span className="badge-clip" aria-hidden="true" />
        <button
          type="button"
          className={`badge-card ${flipped ? "flipped" : ""}`}
          aria-label={flipped ? "Show the front of the ID badge" : "Show the certificates on the back of the ID badge"}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={release}
          onPointerCancel={release}
          onClick={() => {
            if (!drag.current.moved) setFlipped((value) => !value);
            drag.current.moved = false;
          }}
        >
          <span className="badge-inner">
            <span className="badge-face badge-front">
              <span className="badge-top">
                <span>K / SYSTEMS</span>
                <span>AI + CRM</span>
              </span>
              <b>AUTOMATION</b>
              <span className="badge-mark">
                <img src="/keanu-logo.svg" width="92" height="92" alt="" draggable={false} />
                <span>KEANU JOHN ADRALES</span>
              </span>
              <span className="badge-foot">
                <b>PORTFOLIO</b>
                <small>Tap to flip</small>
              </span>
            </span>
            <span className="badge-face badge-back">
              <small>CERTIFICATES</small>
              <b>Technical Virtual Assistants PH</b>
              <span className="badge-certs">
                {["HighLevel CRM", "AI Automation with n8n", "Make.com", "Zapier"].map((name) => (
                  <span key={name}>
                    <Check size={14} aria-hidden="true" /> {name}
                  </span>
                ))}
              </span>
              <small>GoHighLevel · n8n · Make · Zapier</small>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

function PortfolioTabs({ onOpen }: { onOpen: (project: Project) => void }) {
  const [tab, setTab] = useState("projects");
  return (
    <>
      <div className="work-tabs" role="group" aria-label="Portfolio sections">
        {portfolioTabs.map(({ id, label, Icon }) => (
          <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)}>
            <Icon size={17} aria-hidden="true" /> {label}
          </button>
        ))}
      </div>
      <div className="work-panel" key={tab}>
        {tab === "projects" && (
          <div className="work-grid">
            {PROJECTS.map((p) => (
              <article className="work-card" key={p.id}>
                <img
                  src={`${p.shot}-742.webp`}
                  srcSet={`${p.shot}-371.webp 371w, ${p.shot}-742.webp 742w`}
                  sizes="(max-width: 640px) calc(100vw - 66px), (max-width: 1000px) calc(50vw - 80px), min(371px, calc(33.3vw - 74px))"
                  width="371"
                  height="232"
                  alt={`${p.short} screenshot`}
                  loading="lazy"
                />
                <div className="work-card-body">
                  <p className="work-meta">
                    {p.kicker} · {p.label}
                  </p>
                  <h3>{p.short}</h3>
                  <p>{p.body}</p>
                  <button
                    type="button"
                    className="details-button"
                    aria-label={`Details: ${p.title}`}
                    onClick={() => onOpen(p)}
                  >
                    Details <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
            <a className="work-card work-cta" href="#contact">
              <h3>Want this on your website?</h3>
              <p>Send a 2-minute brief. I’ll reply in writing with whether it fits and what happens next.</p>
              <span className="details-button">
                Send a brief <ArrowRight size={16} />
              </span>
            </a>
          </div>
        )}
        {tab === "certificates" && (
          <div className="cert-grid">
            {certificates.map((cert) => (
              <a className="cert-card" key={cert.src} href={cert.src} target="_blank" rel="noreferrer">
                <img
                  src={cert.src}
                  width="2246"
                  height="1588"
                  alt={`${cert.name} certificate from Technical Virtual Assistants PH`}
                />
                <strong>{cert.name}</strong>
                <small>Technical Virtual Assistants PH · {cert.date}</small>
              </a>
            ))}
          </div>
        )}
        {tab === "stack" && (
          <ul className="tool-grid">
            {techStack.map(({ name, logo, mono, Icon }) => (
              <li className="tool-tile" key={name}>
                {logo && <img src={`/tools/${logo}.svg`} width="40" height="40" alt="" loading="lazy" />}
                {mono && (
                  <span className="tool-mono" aria-hidden="true">
                    {mono}
                  </span>
                )}
                {Icon && <Icon size={38} aria-hidden="true" />}
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
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
    el.scrollTop = 0;
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
      aria-labelledby="case-title"
    >
      {project && lane && (
        <div className="case-page container">
          <div className="case-bar">
            <button type="button" className="case-back" onClick={onClose}>
              <ArrowLeft size={16} /> Back
            </button>
            <span>Projects</span>
            <ChevronRight size={15} aria-hidden="true" />
            <strong>{project.short}</strong>
          </div>
          <div className="case-top">
            <div>
              <p className="eyebrow">
                {project.kicker} · {project.label}
              </p>
              <h2 id="case-title">{project.title}</h2>
              <p className="case-lede">{project.body}</p>
              <h3>
                <CodeXml size={19} aria-hidden="true" /> Technologies Used
              </h3>
              <div className="case-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="case-shot">
              <div className="case-navigation" role="group" aria-label="Project views">
                {project.lanes.map((l, i) => (
                  <button key={l.label} type="button" aria-pressed={i === laneIndex} onClick={() => setLaneIndex(i)}>
                    {l.label}
                  </button>
                ))}
              </div>
              <a
                href={lane.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open full-size ${lane.label} screenshot`}
              >
                <img src={lane.src} width="1600" height="1000" alt={`${project.title}: ${lane.label}`} />
                <span className="enlarge-label">
                  <Expand size={15} /> Open full-size image
                </span>
              </a>
              {lane.caption && <p className="evidence-caption">{lane.caption}</p>}
            </div>
          </div>
          {project.leadForm && <LeadForm />}
          <div className="case-bottom">
            <div className="case-steps" aria-live="polite">
              <h3>Inside the workflow: {lane.label}</h3>
              <p>{lane.summary}</p>
              <ul>
                {lane.steps.map((step) => (
                  <li key={step}>
                    <Check size={15} aria-hidden="true" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <dl className="case-brief">
              {[
                ["The problem", project.brief.problem],
                ["What I built", project.brief.built],
                ["What was tested", project.brief.tested],
              ].map(([term, text]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
          {project.caveat && <p className="case-caveat">{project.caveat}</p>}
          <button
            type="button"
            className="button primary"
            onClick={() => {
              onClose();
              document.getElementById("contact")?.scrollIntoView({
                behavior: prefersStill() ? "instant" : "smooth",
              });
            }}
          >
            Send a brief <ArrowUpRight size={16} />
          </button>
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

const sendHeadings: Record<SendState, [string, string]> = {
  idle: ["", ""],
  sending: ["SENDING", "Sending your brief…"],
  sent: ["BRIEF SENT", "Your brief was sent."],
  failed: ["NOT SENT YET", "Your brief didn’t send."],
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

const LEAD_SOURCES = [
  ["referral", "A referral"],
  ["google", "Google search"],
  ["facebook", "Facebook"],
  ["other", "Other"],
];
const LEAD_START_STEPS = [
  ["1. Lead Comes In", "Webhooks by Zapier"],
  ["2. Split into paths", "Paths"],
];
const LEAD_HIGH_PRIORITY_STEPS = [
  ["3. Path conditions", "Source is exactly “referral”"],
  ["4. Save High Priority Leads", "Google Sheets"],
  ["5. Create Email Draft for Client", "AI by Zapier"],
  ["6. Send Email to Client", "Gmail"],
];
const LEAD_FALLBACK_STEPS = [
  ["7. Path conditions", "Every other source"],
  ["8. Send a Notification to Sales Team", "Gmail"],
];

function LeadForm() {
  const [lead, setLead] = useState<Record<string, string> | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (key: string) => String(data.get(key) ?? "").trim();
    setLead({
      Name: field("name"),
      Email: field("email"),
      Company: field("company"),
      Domain: field("domain"),
      Source: field("source"),
    });
  }
  const highPriority = lead?.Source === "referral";
  return (
    <section className="lead-section" aria-labelledby="lead-form-title">
      <div>
        <h3 id="lead-form-title">The lead form</h3>
        <p>
          This is where a lead fills in their details. When they send the form, the details go to step
          1 in Zapier, and the Zap picks the path.
        </p>
        <p>Choose “A referral” to see the high priority path. Choose anything else to see the other one.</p>
        <p className="lead-note">Preview only. This form isn’t connected yet, so nothing is sent.</p>
      </div>
      <div className="brief-panel">
        {lead ? (
          <div className="lead-result" role="status">
            <h3>What goes to Zapier</h3>
            <dl>
              {Object.entries(lead).map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value || "Left blank"}</dd>
                </div>
              ))}
            </dl>
            <ol className="lead-flow">
              {[...LEAD_START_STEPS, ...(highPriority ? LEAD_HIGH_PRIORITY_STEPS : LEAD_FALLBACK_STEPS)].map(
                ([step, app]) => (
                  <li key={step}>
                    <Check size={15} aria-hidden="true" />
                    <span>
                      <strong>{step}</strong>
                      <small>{app}</small>
                    </span>
                  </li>
                ),
              )}
            </ol>
            <p className="lead-path">
              Path: <strong>{highPriority ? "High Priority" : "Fallback"}</strong>
            </p>
            <button type="button" className="button secondary" onClick={() => setLead(null)}>
              Try another lead
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="form-heading">
              <h3>Request a quote</h3>
              <span>Preview</span>
            </div>
            <p className="form-intro">For a fictional business.</p>
            <div className="form-row">
              <label htmlFor="lead-name">
                Your name <span>*</span>
                <input id="lead-name" name="name" required pattern=".*\S.*" maxLength={100} placeholder="Jane Doe" />
              </label>
              <label htmlFor="lead-email">
                Email address <span>*</span>
                <input id="lead-email" name="email" type="email" required maxLength={254} placeholder="jane@example.com" />
              </label>
            </div>
            <div className="form-row">
              <label htmlFor="lead-company">
                Company <span className="optional">Optional</span>
                <input id="lead-company" name="company" maxLength={150} placeholder="Doe Home Services" />
              </label>
              <label htmlFor="lead-domain">
                Website <span className="optional">Optional</span>
                <input id="lead-domain" name="domain" maxLength={150} placeholder="example.com" />
              </label>
            </div>
            <label htmlFor="lead-source">
              How did you hear about us? <span>*</span>
              <select id="lead-source" name="source" required defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                {LEAD_SOURCES.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <button className="button primary form-submit" type="submit">
              See where this lead goes <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
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
          <h3>Send your brief</h3>
          <span>Takes about 2 minutes</span>
        </div>
        <p className="form-intro">A few details are all I need.</p>
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
          How do people book with you today? <span>*</span>
          <textarea
            id="brief-description"
            name="brief"
            required
            minLength={20}
            maxLength={5000}
            rows={4}
            placeholder="For example: Customers message us on the website and Facebook. We reply when we can and book them by hand in GoHighLevel."
            aria-describedby="brief-help"
            onInput={(e) => e.currentTarget.setCustomValidity("")}
          />
        </label>
        <p id="brief-help" className="field-help">
          A sentence or two is perfect. Minimum 20 characters.
        </p>
        <button className="button primary form-submit" type="submit">
          Send my brief <ArrowRight size={18} />
        </button>
        <p className="form-disclosure">
          This goes straight to me. I reply in writing within {REPLY_TIME}.
        </p>
      </form>
      {brief !== null && (
        <div className="brief-result" ref={result} tabIndex={-1}>
          <span className={`result-icon result-${sendState}`}>
            {sendState === "failed" ? <X size={25} /> : <Check size={25} />}
          </span>
          <p className="eyebrow">{sendHeadings[sendState][0]}</p>
          <h3>{sendHeadings[sendState][1]}</h3>
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
