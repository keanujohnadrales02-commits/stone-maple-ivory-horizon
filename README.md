# Keanu — AI Automation

Portfolio site: doorway hero, constellation warp between rooms, workflow case studies, project intake form.

## Run it locally

```bash
npm install
npm run dev
```

Opens on port 8080.

```bash
npm run build
npm run preview
```

## Put it on your Vercel

1. Unzip this folder.
2. Create a GitHub repo and push the contents (not `node_modules`).
3. In [Vercel](https://vercel.com/new), **Import** that repo.
4. Leave the defaults:
   - **Framework:** Vite
   - **Build command:** `npm run build`
   - **Install command:** `npm install`
5. Deploy. No database or env vars are required.

The production build already uses Vercel’s Nitro preset (`nitro({ preset: "vercel" })`). After the first deploy you get a `*.vercel.app` URL. Add your own domain under **Project → Settings → Domains**.

## What lives where

| Path | What it is |
|---|---|
| `src/components/keanu/Hero.tsx` | Doorway hero + specialist copy |
| `src/components/keanu/DoorTheater.tsx` | Warp / constellation room transition |
| `src/components/keanu/How.tsx` | How it works |
| `src/components/keanu/Work.tsx` | Projects |
| `src/components/keanu/Close.tsx` | Start a project form |
| `public/keanu-portal.jpg` | Hero doorway still |
| `public/keanu-warp.mp4` | Fly-through used on enter |

Intake briefs are saved in the visitor’s browser (`localStorage`). They are not emailed. To receive them, wire `Close.tsx` to Formspree, Resend, or a Vercel serverless function.

## Stack

Vite 8 · React 19 · TanStack Start · Tailwind v4 · TypeScript
