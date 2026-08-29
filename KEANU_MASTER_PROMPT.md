# MASTER PROMPT — Recreate the “Keanu” website exactly

Build a pixel-faithful, fully mobile-responsive one-page portfolio called **Keanu**. Follow every specification literally — exact copy, exact hex values, exact motion math, exact room order. Do not substitute, round, simplify, or “improve” anything. Do not turn this into a SaaS landing page.

This is a dark cinematic portfolio for an **AI automation specialist**. The visitor does not scroll a long page. They stand in a stone doorway, then get sucked into the next room.

---

## 0. WHO THIS IS

Keanu builds custom workflows in n8n, Make.com, Sheets, Gmail, Calendar, Messenger, and WhatsApp. The site is the portfolio — not a product, not a waitlist, not an agency brochure.

**Positioning (use this, not a name stacked on the door):**
- AI specialist
- Workflow automation
- Automation engineering

**Tone:** calm, precise, operator-to-operator.
**Forbidden copy:** “Stop losing jobs to unread leads”, “Get started / View work”, “Book a demo”, “Unlock growth”, “Relied on by brands across the globe”, any giant “KEANU” painted on the hero image.

The name **Keanu** appears only as the nav wordmark and in the footer.

---

## 1. STACK

- Vite + React + TypeScript + Tailwind CSS
- Icons: `lucide-react` — use only `ChevronDown`, `Menu`, `X`, `Check`
- Body: **Geist Sans** (Google Fonts, weights 400/500/600/700)
- Display / headlines: **General Sans** from Fontshare  
  `https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap`
- No Framer Motion, no GSAP, no IntersectionObserver. Pure CSS + `requestAnimationFrame` + one 2D canvas
- `package.json` type: `"module"`

---

## 2. THEME (index.css / @theme — exact)

```
--color-bg:        hsl(260 87% 3%);
--color-fg:        hsl(40 6% 95%);
--color-hero-sub:  hsl(40 6% 82%);
--color-muted:     hsl(40 6% 62%);
--color-line:      rgb(255 255 255 / 0.08);
--color-violet:    #8b7cff;
--color-amber:     #fcd34d;
--color-indigo:    #6366f1;
--color-magenta:   #a855f7;
--color-surface:   rgb(255 255 255 / 0.03);
--font-sans:       "Geist", ui-sans-serif, system-ui, sans-serif;
--font-display:    "General Sans", "Geist", ui-sans-serif, system-ui, sans-serif;
```

`html, body, #app { height: 100%; background: var(--color-bg); color: var(--color-fg); overscroll-behavior: none; }`
`body { overflow: hidden; -webkit-font-smoothing: antialiased; }`
`button, [role=button] { cursor: pointer; }`
`theme-color: #07040f`
Document title: `Keanu — AI Automation`
Meta description: `Keanu — AI automation specialist. Custom workflows in n8n, Make.com, and the AI layer between your tools.`

---

## 3. LIQUID GLASS (utility class, used on every pill)

```css
.liquid-glass {
  background: rgb(255 255 255 / 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgb(255 255 255 / 0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgb(255 255 255 / 0.45) 0%,
    rgb(255 255 255 / 0.15) 20%,
    rgb(255 255 255 / 0) 40%,
    rgb(255 255 255 / 0) 60%,
    rgb(255 255 255 / 0.15) 80%,
    rgb(255 255 255 / 0.45) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

Portal still:

```css
.portal-still {
  transform-origin: 50% 48%;
  animation: portal-breathe 22s ease-in-out infinite alternate;
}
@keyframes portal-breathe {
  from { transform: scale(1); }
  to   { transform: scale(1.035); }
}
@media (prefers-reduced-motion: reduce) {
  .portal-still { animation: none; }
}
```

---

## 4. SITE STRUCTURE — FOUR ROOMS, NOT A SCROLL

The homepage is a `DoorTheater`. Four full-viewport rooms, one visible at a time:

| index | id    | room                         |
|------:|-------|------------------------------|
| 0     | hero  | Doorway hero                 |
| 1     | how   | How it works                 |
| 2     | work  | Projects                     |
| 3     | close | Start a project form + footer |

Expose `goTo(i)` and `index` on a React context so the nav, CTAs, and “enter” hints can change rooms.

**This is not a long page.** `body` never scrolls. Each room is `h-dvh` and may scroll internally if content overflows. Changing rooms is a **constellation warp** (being sucked into a dimension) — never a swinging 3D door, never plain `scroll-behavior: smooth`.

### 4.1 Warp rules

- `prefers-reduced-motion: reduce` → instant swap, no video, no canvas
- **Leaving hero (from === 0):** duration **2400ms**. Play `/keanu-warp.mp4` muted + `playsInline`. Set `playbackRate = 6 / 2.4` so the 6s clip fits. `currentTime = 0` on start. Pause + reset on end. Video opacity = `smoothstep(0.02, 0.12, p) * (1 - smoothstep(0.72, 0.96, p))`
- **Room → room:** duration **1600ms**. Canvas stars only. Video opacity 0
- Keep **both** the leaving room and the entering room mounted for the whole warp. Do not unmount by swapping a single child
- Leaving: `scale = 1 + pow(p, 1.05) * (fromHero ? 2.8 : 1.6)`, opacity fades `smoothstep(0.04, fromHero ? 0.38 : 0.48, p)`
- Entering: `scale = 0.18 + smoothstep(0.42, 1, p) * 0.82`, opacity `smoothstep(0.5, 0.86, p)`, brightness `1.7 - smoothstep(0.55, 1, p) * 0.7`
- Bloom overlay (z-45): radial `circle at 50% 52%`, gold `252 211 77 / 0.28` → violet `139 124 255 / 0.22` → transparent. Opacity `3.6 * p * (1-p)`
- Vignette overlay (z-50): `ellipse at 50% 52%`, transparent 18% → `rgb(4 1 12 / 0.88)`. Opacity `4.2 * p * (1-p)`
- Canvas mounts **only while `transitioning`**. Unmount when idle
- Wheel / ArrowDown / PageDown / Space / swipe-up → next room, **only if the current room is scrolled to its bottom**
- Wheel / ArrowUp / PageUp / swipe-down → previous, only at top
- Ignore `|deltaY| < 18`. Ignore keys while focus is in `input/textarea/select/contenteditable`. Ignore if a warp is already running
- Desktop right-edge room dots: 8×8px, `lg:flex`, current `scale-125 bg-fg`, others `bg-fg/30`
- Screen-reader live region: `Entering {sceneId}` during warp

`smoothstep(a,b,x)` = classic Hermite: `t = clamp((x-a)/(b-a)); return t*t*(3-2*t)`

### 4.2 Warp canvas (constellation suction)

Full-screen `<canvas>`, `pointer-events-none`, z-40. 520 stars.

Each star: `x,y ∈ [-1,1]`, `z ∈ [0,1]`, `gold = random > 0.62`, `size = 0.6 + random*1.6`.

Each frame:
```
warp = 0.006 + progress² * 0.09
star.z -= warp
if z < 0.04: respawn at z ≈ 0.95–1.15
project around (50vw, 52vh) with k = 0.55 / z
draw streak from previous projected point to current
stroke = gold ? rgba(252,211,77,0.9) : rgba(167,151,255,0.85)
lineWidth = size * (0.7 + progress * 2.4)
```
Canvas fade: `smoothstep(0.02, 0.14, p) * (1 - smoothstep(0.82, 1, p))`.
Also draw 8 rotating ring segments around the vanishing point, radius `(1-p) * min(w,h) * 0.28 + 12`, stroke `rgba(139,124,255,0.55)`.

If `/keanu-warp.mp4` is missing, still run the canvas. Never fall back to a door-leaf animation.

---

## 5. NAVBAR (identical on every room)

`header` full width, `px-6 py-5 lg:px-8`, `z-20`.

**Left** — button “Keanu”, `font-display text-lg font-medium tracking-tight text-fg`. Click → `goTo(0)`.

**Center** (hidden below `lg`):
| label         | chevron | goes to |
|---------------|---------|---------|
| How it works  | yes     | 1       |
| Projects      | no      | 2       |
| Plans         | no      | 3       |
| Learning      | yes     | 3       |

Links: `text-sm text-fg/90`, `gap-8`, ChevronDown `size-3.5 opacity-70`. Hover opacity 70%.

**Right** (desktop): liquid-glass pill “Start a project”, `rounded-full px-4 py-2 text-sm` → `goTo(3)`.

**Hairline** under the bar: `mt-[3px] h-px bg-gradient-to-r from-transparent via-fg/20 to-transparent`.

**Mobile:** 44×44 liquid-glass circle. Menu and X stacked, 300ms rotate/scale morph. Open drawer `max-h-80 pt-4`, closed `max-h-0`. Drawer links `rounded-xl px-4 py-3`. Start a project pill at the bottom of the drawer.

---

## 6. ROOM 0 — HERO

`section.relative.flex.min-h-dvh.flex-col.overflow-hidden.bg-bg`

**Background still** `/keanu-portal.jpg`:
- Gothic stone arch doorway, **empty** — no letters, no “Keanu”, no “AI AUTOMATION”
- Infinite dark corridor, violet circuit traces, gold constellation nodes, purple vanishing point
- `absolute inset-0 h-full w-full object-cover object-center`, class `portal-still`
- If you must generate it: *Photoreal dark-fantasy gothic stone arch doorway, empty portal, no text, no letters, no name, no people. Infinite corridor of violet circuit traces and gold star-nodes receding to a distant purple light. 16:9.*

**Warp video** `/keanu-warp.mp4` (6s, 16:9): *Camera pulled forward through the empty stone arch into the infinite violet circuit corridor. Gold star nodes streak past. Magical suction into another dimension. No text, no people, no UI.*

**Overlays (pointer-events-none):**
1. Radial `ellipse at 50% 48%, transparent 36%, rgb(4 2 10 / 0.55) 100%`
2. Top `h-24 bg-gradient-to-b from-bg/80`
3. Bottom `h-32 bg-gradient-to-t from-bg/90`

**Copy, centered in the door — HTML, never baked into the JPEG:**

```
AI SPECIALIST
Workflow automation
Automation engineering for operators who need the system to run.
```

- Eyebrow: `text-[11px] font-medium tracking-[0.28em] text-violet uppercase`, `mb-3`
- H1: `font-display max-w-[16ch] text-[40px] leading-[1.08] font-normal tracking-tight text-fg sm:text-[52px] md:text-[64px]`
- Sub: `mt-3 max-w-md text-[15px] leading-relaxed text-hero-sub/80 sm:text-base`

**Bottom chrome** (`flex flex-col items-center gap-4 px-6 pb-7`):
- Liquid-glass pill “Start a project”, `rounded-full px-8 py-3.5 text-sm` → `goTo(3)`
- Hint “ENTER THE DOOR”: `text-xs tracking-[0.18em] uppercase text-fg/50` + `h-8 w-px` hairline. Click → `goTo(1)`

No marquee. No second CTA. No “View work”. No 220px headline.

---

## 7. ROOM 1 — HOW IT WORKS

Eyebrow: `HOW IT WORKS` — `text-[11px] font-medium tracking-[0.18em] text-violet`, `mb-3.5`  
H2: `One system. Three guarantees.` — `font-display text-[34px] leading-[1.05] md:text-[44px]`

Content max-width `1180px`, `px-6 lg:px-8`. Desktop grid `1fr auto 1fr auto 1fr` with 12×16px violet rails (1.5px dot + gradient line) between columns.

| k                 | title                 | body |
|-------------------|-----------------------|------|
| 01 — CAPTURE      | Every enquiry in      | Website forms, Facebook, WhatsApp — every lead lands in Sheets the moment it arrives. |
| 02 — FOLLOW-UP    | Automatic follow-up   | A first reply on the same channel immediately. A second send 24 hours later if they stay quiet. |
| 03 — STOP ON REPLY| Stops when they reply | Reply detection kills the sequence. Tracker flips to replied. No double-messages. |

k: `text-[11px] tracking-[0.16em] text-violet`  
title: `text-xl font-medium text-fg`  
body: `max-w-xs text-sm leading-relaxed text-muted`

Hint: **ENTER THE WORK** → next room.

---

## 8. ROOM 2 — PROJECTS

Eyebrow: `PROJECTS`  
H2: `What I've built` — same type scale as How.

### 8.1 Flagship card

`rounded-[20px] border border-line bg-surface`, inner grid `lg:grid-cols-[1.35fr_0.85fr]`, min-height 340px.

**Left** `#101018`, SVG node graph (not a photo, not an empty slot):

```
Website Chat Trigger  →  Booking Agent  →  Calendar
                                      →  Sheets
                                      →  Gmail
                         (red lane)  →  Error handler
```

Nodes: `rounded-[10px] border-white/10 bg-[#1a1b24] px-3 py-2 text-xs` with a 6px color dot (blue / violet / emerald / amber / red).

**Right** `px-7 py-8`:
- Pill `● Built & Tested` — `bg-emerald-500/15 text-emerald-300 text-[11px] rounded-full px-2.5 py-1`
- H3 `AI Front Desk for a Dental Practice` — `font-display text-[26px] font-medium`
- Body `text-[14.5px] leading-relaxed text-muted`:  
  Five n8n workflows as one system: booking, FAQ, lead capture, reminders and recall. An error handler watches the other four when they fail.
- Tags: `n8n` · `Google Calendar` · `Gmail` — `rounded-lg border border-line bg-fg/5 px-2.5 py-1 text-xs`
- Footer line `text-xs tracking-wide text-muted`: `5 workflows · 1 error lane · live in clinic chat + Messenger`

### 8.2 Also shipped

Label `ALSO SHIPPED` — `mt-6 mb-3 text-xs tracking-[0.14em] text-muted`  
Two columns `gap-5`, cards `rounded-[20px] border-line bg-surface`.

**Card A** — graph on `#f3f1ec` (light nodes):
Facebook Messenger + WhatsApp → Google Sheets → Gmail  
Pill `Sample` amber (`bg-amber-500/15 text-amber-300`)  
H3 `Enquiry to Social Follow-up`  
Multi-channel lead capture from website, Facebook, and WhatsApp.  
Tags: Make.com · Google Sheets · Gmail

**Card B** — graph on `#101018`:
OpenAI / Claude → n8n / Make → Sheets / Gmail  
Eyebrow `STACK ON THE BENCH` violet  
H3 `n8n · Make · OpenAI · Claude`  
Sheets, Gmail, Calendar, Messenger, WhatsApp. The workflow is the portfolio — not a grid of empty slots.  
Tags: n8n · Make.com · OpenAI · Claude

Hint: **STEP THROUGH**

---

## 9. ROOM 3 — START A PROJECT + FOOTER

Layout `lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16`, max-width 1180px. Soft violet radial behind: `ellipse at top, rgb(124 92 252 / 0.14), transparent 52%`.

### 9.1 Left copy (exact)

```
START A PROJECT
Need a workflow built?
Tell me the tools you already use and what should happen when a
lead comes in. I’ll map the system before we write a single node.

• Reply in two working days
• Workflow map before any build
• n8n, Make, Sheets, Gmail, chat
```

H2 same 34/44 display scale. Body `text-[15px] leading-relaxed text-fg/55 max-w-[420px]`. Bullets: 6px violet dots.

### 9.2 Form (native, not mailto)

Card: `rounded-[20px] border border-line bg-surface p-6 md:p-8`

| field | ui | validation |
|-------|-----|------------|
| Name | input, placeholder “Your name”, autocomplete name | trim length < 2 → “Add your name.” |
| Email | type=email, placeholder “you@studio.com” | must match `^[^\s@]+@[^\s@]+\.[^\s@]+$` → “Use a real email so I can reply.” |
| Business | optional, placeholder “Practice, studio, or company — optional” | none |
| Tools you already use | chips, multi-select | at least one → “Pick at least one tool you already use.” |
| What should the system do? | textarea 4 rows, min-h 112px | trim length < 20 → “Give me a sentence or two about the workflow.” |

Tool chips, in this order: `n8n`, `Make.com`, `Google Sheets`, `Gmail`, `Calendar`, `Messenger`, `WhatsApp`, `Other`.  
Off: `border-line bg-fg/5 text-fg/70`. On: `border-violet/50 bg-violet/20 text-fg`.

Inputs: `h-11 w-full rounded-xl border bg-fg/5 px-3.5 text-sm text-fg`, focus `border-violet/60`, error `border-red-400/50`. Labels `text-[11px] tracking-[0.14em] text-muted uppercase`. Errors `text-xs text-red-400`.

Textarea placeholder (exact):  
`e.g. Website chat and Messenger leads should land in Sheets and get a reply within a minute.`

Submit: full-width `h-12 rounded-full bg-violet text-[15px] font-medium text-fg`. Label **Send the brief** / **Sending brief…** (disable + opacity 60 while pending ~450ms).

On success:
1. `localStorage.setItem("keanu-inquiry", JSON.stringify({ name, email, business, tools, brief, at: Date.now() }))`
2. Replace the two-column layout with a centered success:
   - 48px violet circle + Check icon
   - `BRIEF RECEIVED`
   - `Thanks, {firstName}.`
   - `I’ll map the workflow and reply to {email} within two working days — before we write a single node.`
   - `BACK TO THE DOOR` → `goTo(0)`

Do not use `mailto:`. Do not leave this room empty. Do not open a new tab.

### 9.3 Footer (this room only)

`border-t border-line px-6 py-7 lg:px-8`  
Row, max-width 1180px, space-between on `sm+`:

- `Keanu` (`text-[16px] font-medium`) + `AI automation specialist` (`text-[13px] text-muted`, margin-left 10px)
- `n8n · Make.com · OpenAI · Claude` (`text-[13px] text-muted`)
- placeholders `in` `gh` `x` (`gap-4 text-[13px] text-muted`)

Copyright: `© 2026 Keanu` — `text-xs text-fg/30`, left on `sm+`, center on mobile.

---

## 10. SCENE HINT (rooms 0–2)

Centered button, `text-fg/50 hover:text-fg/80`:
- Label `text-xs tracking-[0.18em] uppercase`
- `h-8 w-px bg-fg/30` hairline under it
- Click → `goTo(index + 1)`
- Hidden on the last room

Labels: `Enter the door` / `Enter the work` / `Step through`

---

## 11. RESPONSIVE

- Hero type steps 40 → 52 → 64. Never larger. Never fills the arch with a name
- How-it-works columns stack on mobile; hide the violet rails below `md`
- Project flagship stacks (graph then copy). Also-shipped stacks to 1 column
- Form fields Name/Email are 2-col from `sm`, 1-col below
- Nav center + desktop CTA hidden below `lg`; hamburger shown
- Room dots hidden below `lg`
- No horizontal overflow at 390×844 or 1280×800

---

## 12. HARD NO’S

- Do not paint “Keanu” or “AI AUTOMATION” onto the doorway image
- Do not use a swinging 3D door, CSS `rotateY` leaves, or an aperture iris
- Do not use plain vertical scrolling between rooms
- Do not add a client-logo marquee
- Do not write “Get started”, “View work”, or “Stop losing jobs…”
- Do not leave the Start-a-project room as a `mailto` or an empty card
- Do not put photos in the project cards — SVG node graphs only
- Do not keep the warp canvas mounted while idle
- Do not clip the H1. Hero type is HTML over the still
- Do not add extra sections (blog, testimonials, pricing table, FAQ)

---

## 13. DONE WHEN

- [ ] Hero reads **AI specialist / Workflow automation / Automation engineering…** over an empty stone door
- [ ] Name “Keanu” lives in the nav and footer only
- [ ] First enter plays the warp video + stars for 2.4s
- [ ] Later room changes are a 1.6s constellation suction
- [ ] How it works is three guarantees, one row
- [ ] Projects show workflow graphs, not empty image slots
- [ ] Start a project is a validated form with a named success state
- [ ] Reduced-motion users skip the warp
- [ ] 390px and 1280px layouts do not overflow
