# CLAUDE BUILD PROMPT — paste this whole file

You are building **Keanu**, a one-page portfolio for an AI automation specialist. Recreate this site exactly. Do not invent a SaaS landing page. Do not put a giant name on the hero. Do not use “Stop losing jobs to unread leads” or any salesy conversion copy.

This is a dark cinematic portfolio: a stone doorway you get sucked through, then rooms for the work.

---

## Who it is

Keanu is an **AI specialist / workflow automation / automation engineer**. He builds n8n and Make.com systems that capture leads, follow up, and stop when someone replies. The site is the portfolio, not a product.

Tone: calm, precise, operator-to-operator. Never “unlock growth”. Never “book a demo”.

---

## Stack

- Vite + React + TypeScript + Tailwind CSS
- `lucide-react` icons only: `ChevronDown`, `Menu`, `X`, `Check`
- Body font: **Geist Sans**
- Display font: **General Sans** from Fontshare  
  `https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap`
- No animation library. No IntersectionObserver scroll-spy. Pure rAF + canvas + CSS.

If you are on Next.js / Lovable / v0, keep the same UX. Do not change the copy or the room structure.

---

## Colors (exact)

```
bg:        hsl(260 87% 3%)     /* #07040f-ish deep blue-purple */
fg:        hsl(40 6% 95%)      /* off-white */
hero-sub:  hsl(40 6% 82%)
muted:     hsl(40 6% 62%)
line:      rgb(255 255 255 / 0.08)
violet:    #8b7cff
amber:     #fcd34d
indigo:    #6366f1
magenta:   #a855f7
surface:   rgb(255 255 255 / 0.03)
```

`html, body` are `overflow: hidden`. The site is **not** a long scrolling page. It is four full-viewport **rooms**. Changing rooms is a warp, not a scroll.

---

## Liquid glass (every pill button)

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

Use this on: nav “Start a project”, mobile menu button, hero CTA.

---

## Architecture — four rooms, one theater

Rooms, in order:

0. **hero** — doorway
1. **how** — How it works
2. **work** — Projects
3. **close** — Start a project form + footer

Wrap them in a `DoorTheater` that:

- Holds one room visible at a time (`h-dvh overflow-hidden`)
- Exposes `goTo(index)` via React context so nav / CTAs / hints can change rooms
- On `goTo`, if `prefers-reduced-motion`: swap instantly
- Else run a warp:
  - **Leaving hero (index 0 → anything):** 2400ms. Play `/keanu-warp.mp4` (muted, playsInline) at `playbackRate = 6 / 2.4` so the 6s clip fits the 2.4s warp. Video opacity: fade in 0.02→0.12, fade out 0.72→0.96.
  - **Room to room:** 1600ms. Canvas stars only. No video.
- Leaving room scales up (`1 → 1 + progress^1.05 * 2.8` from hero, `* 1.6` otherwise) and fades out fast
- Entering room starts at `scale(0.18)`, brightness 1.7, fades in from progress 0.5
- Overlay a gold/violet radial bloom and a dark vignette that both peak mid-warp (`4.2 * p * (1-p)`)
- Mount a full-screen canvas **only while transitioning** (unmount when idle)
- Wheel / ArrowDown / PageDown / Space / swipe-up go to next room **only when the current room is scrolled to its bottom**. Wheel / ArrowUp go previous only at top. Ignore wheel delta < 18px. Ignore keys while typing in inputs.
- Right-edge room dots on desktop (`lg:flex`), 8px, current one `scale-125 bg-fg`
- Body scroll lock. Never unmount rooms by swapping a single child — keep leave + enter both mounted during the warp.

### Warp canvas (constellation, being sucked into a dimension)

520 stars. Each: random x/y in [-1,1], z in [0,1], ~38% gold (`#fcd34d`), rest violet (`#a797ff`). Each frame:

```
warp = 0.006 + progress² * 0.09
star.z -= warp
project around (50vw, 52vh)
draw a streak from previous z to current z
lineWidth = size * (0.7 + progress * 2.4)
```

When `z < 0.04`, respawn at z ≈ 1. Fade the whole canvas in 0.02→0.14 and out 0.82→1. Draw 8 rotating dashed-ring segments around the vanishing point. This is the magic. Do not use swinging 3D door leaves.

---

## Navbar (every room)

Full width, `px-6 py-5 lg:px-8`.

- Left: wordmark **Keanu** — `font-display text-lg font-medium`. Click → room 0. This is the **only** place the name appears large. Never paint “Keanu” onto the doorway image.
- Center (desktop): How it works · Projects · Plans · Learning  
  How it works + Learning have a 14px `ChevronDown`.  
  How it works → room 1. Projects → room 2. Plans + Learning → room 3.
- Right: liquid-glass pill **Start a project** → room 3
- Under the bar: 1px gradient hairline `from-transparent via-fg/20 to-transparent`
- Mobile: 44px liquid-glass circle, Menu morphs to X. Drawer max-height 320px.

---

## ROOM 0 — Hero

Full-bleed gothic stone arch doorway. **Empty arch. No letters on the image.** Corridor of violet circuit traces and gold star-nodes receding to a distant purple light. Image path `/keanu-portal.jpg`, `object-cover object-center`, Ken Burns `scale 1 → 1.035` over 22s alternate.

If you must generate the still, prompt:

> Photoreal dark-fantasy gothic stone arch doorway, empty portal, no text, no letters, no name. Infinite dark corridor with violet circuit traces and gold constellation nodes receding to a purple vanishing point. 16:9.

If you must generate the warp video from that still:

> Camera pulled forward through the empty stone arch into the infinite violet circuit corridor. Gold star nodes streak past. Magical suction into another dimension. No text, no people, no UI. 6 seconds.

Overlays on the still:

- Radial vignette `ellipse at 50% 48%, transparent 36%, rgb(4 2 10 / 0.55) 100%`
- Top fade `h-24 from-bg/80`
- Bottom fade `h-32 from-bg/90`

**Copy — exact, centered in the door, readable, not huge:**

```
AI SPECIALIST                         ← 11px, tracking 0.28em, violet, uppercase
Workflow automation                   ← General Sans, 40px / 52px / 64px, leading 1.08, max 16ch
Automation engineering for operators  ← 15–16px, hero-sub/80, max-w-md
who need the system to run.
```

Bottom:

- Liquid-glass pill **Start a project** → room 3, `px-8 py-3.5`
- Hint **ENTER THE DOOR** (11–12px, tracking 0.18em, uppercase) + 32px hairline. Click → room 1.

`h1` is “Workflow automation”. Do not put the name in the headline. Do not add a logo marquee. Do not add a second subtitle about “relied on by brands”.

---

## ROOM 1 — How it works

Eyebrow `HOW IT WORKS` (11px, tracking 0.18em, violet)  
Headline `One system. Three guarantees.` (34px / 44px, General Sans)

Three columns with violet rails between them on desktop:

| k | title | body |
|---|---|---|
| 01 — CAPTURE | Every enquiry in | Website forms, Facebook, WhatsApp — every lead lands in Sheets the moment it arrives. |
| 02 — FOLLOW-UP | Automatic follow-up | A first reply on the same channel immediately. A second send 24 hours later if they stay quiet. |
| 03 — STOP ON REPLY | Stops when they reply | Reply detection kills the sequence. Tracker flips to replied. No double-messages. |

Hint at bottom: **ENTER THE WORK**

---

## ROOM 2 — Projects

Eyebrow `PROJECTS`  
Headline `What I've built`

### Flagship card (rounded 20px, border line, surface)

Left, dark `#101018`, SVG node graph (not a photo):

- Website Chat Trigger → Booking Agent → Calendar / Sheets / Gmail
- Red lane down to Error handler

Right:

- Pill `● Built & Tested` emerald
- **AI Front Desk for a Dental Practice**
- Five n8n workflows as one system: booking, FAQ, lead capture, reminders and recall. An error handler watches the other four when they fail.
- Tags: n8n · Google Calendar · Gmail
- `5 workflows · 1 error lane · live in clinic chat + Messenger`

### Also shipped (two cards)

1. Light graph `#f3f1ec`: Facebook Messenger + WhatsApp → Google Sheets → Gmail  
   Pill `Sample` amber  
   **Enquiry to Social Follow-up**  
   Multi-channel lead capture from website, Facebook, and WhatsApp.  
   Tags: Make.com · Google Sheets · Gmail

2. Dark graph: OpenAI / Claude → n8n / Make → Sheets / Gmail  
   Eyebrow `STACK ON THE BENCH`  
   **n8n · Make · OpenAI · Claude**  
   Sheets, Gmail, Calendar, Messenger, WhatsApp. The workflow is the portfolio — not a grid of empty slots.

Hint: **STEP THROUGH**

---

## ROOM 3 — Start a project

Left:

```
START A PROJECT
Need a workflow built?
Tell me the tools you already use and what should happen when a
lead comes in. I’ll map the system before we write a single node.

• Reply in two working days
• Workflow map before any build
• n8n, Make, Sheets, Gmail, chat
```

Right: form card `rounded-[20px] border-line bg-surface p-6 md:p-8`

| field | rules |
|---|---|
| Name | required, min 2. Error: “Add your name.” |
| Email | required, real email. Error: “Use a real email so I can reply.” |
| Business | optional. Placeholder: “Practice, studio, or company — optional” |
| Tools you already use | chips: n8n, Make.com, Google Sheets, Gmail, Calendar, Messenger, WhatsApp, Other. Must pick ≥1. Error: “Pick at least one tool you already use.” |
| What should the system do? | textarea min 20 chars. Error: “Give me a sentence or two about the workflow.” Placeholder: “e.g. Website chat and Messenger leads should land in Sheets and get a reply within a minute.” |

Submit: full-width violet pill, height 48px, label **Send the brief** / **Sending brief…**

On success: persist JSON to `localStorage` key `keanu-inquiry` (name, email, business, tools, brief, at). Then replace the form with:

```
BRIEF RECEIVED
Thanks, {firstName}.
I’ll map the workflow and reply to {email} within two working days —
before we write a single node.
BACK TO THE DOOR  → room 0
```

Do **not** use mailto. Do **not** leave this room empty. Wire to Formspree/Resend later if asked — localStorage is the default.

### Footer (only on this room)

Hairline top.  
`Keanu` + `AI automation specialist`  
`n8n · Make.com · OpenAI · Claude`  
`in  gh  x` (placeholders)  
`© 2026 Keanu`

---

## Hard no’s

- Do not put “Keanu” or “AI AUTOMATION” as giant type on the doorway image
- Do not use a swinging 3D door
- Do not use plain vertical scrolling between sections
- Do not add a client logo marquee
- Do not write “Get started / View work / Stop losing jobs”
- Do not unmount the warp canvas while idle and then leave a WebGL/game canvas sitting on the homepage
- Do not clip the headline. Hero type is HTML, not baked into the JPEG
- Mobile: rooms still fill the viewport; graphs may stack; nav collapses

---

## Done when

- Hero shows **AI specialist / Workflow automation / Automation engineering…** over an empty stone door
- Scroll or “Enter the door” warps you through stars (video on first enter, canvas after)
- How it works is three guarantees, not a blog
- Projects show workflow graphs, not empty image slots
- Start a project is a working form with validation + success state
- Name “Keanu” lives in the nav and footer only
