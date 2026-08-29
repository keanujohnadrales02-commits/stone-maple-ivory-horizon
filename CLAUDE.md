# Claude Code — build Keanu in this repo

You are in `keanujohnadrales02-commits/stone-maple-ivory-horizon`.

This is the Keanu portfolio we already designed. Do the same thing you did on our previous VS Code / Vite projects: make it run locally, do not redesign it.

## What this site is

A dark cinematic one-page portfolio for an AI automation specialist.
Four rooms, not a long scroll: Hero → How it works → Projects → Start a project.
Changing rooms is a constellation warp (being sucked into a dimension), not a swinging door and not plain scrolling.

Read `KEANU_MASTER_PROMPT.md` and follow it literally.

## What is already here

- `src/components/keanu/` — Hero, DoorTheater, How, Work, Close, SiteNav
- `public/keanu-portal.jpg` — empty gothic doorway (no name on it)
- `public/keanu-warp.mp4` — 6s fly-through used on first enter
- `src/styles.css` — colors, liquid-glass, portal-breathe

Treat those as the source of truth. Port them. Do not invent new copy.

## Do this now

1. Make a normal local Vite + React + TypeScript + Tailwind app that starts with `npm install` then `npm run dev` — same workflow as our last projects.
2. If the current Grok / TanStack Start / nitro scaffold fails on your machine, convert to a clean Vite app (`index.html` + `src/main.tsx`) and port the four rooms into it. Keep Tailwind. Keep the warp.
3. Hero copy must be exactly:
   - AI specialist
   - Workflow automation
   - Automation engineering for operators who need the system to run.
4. Name **Keanu** lives in the nav and footer only. Never paint it on the doorway.
5. First enter (hero → next): 2.4s warp video + star canvas.
   Later rooms: 1.6s star canvas only.
6. Start a project is a real form (not mailto) that validates and shows `Thanks, {firstName}.`
7. Commit when `npm run dev` is running and the four rooms work.

## Hard no’s

- Do not redesign
- Do not add a logo marquee
- Do not write “Stop losing jobs” / “Get started / View work”
- Do not use a swinging 3D door
- Do not leave empty image slots on project cards — keep the SVG workflow graphs
- Do not add extra sections

## Done when

`npm run dev` shows the stone door, the specialist headline, and Enter the door warps into How it works.
