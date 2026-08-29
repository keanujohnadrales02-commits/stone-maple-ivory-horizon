# PASTE THIS WHOLE FILE INTO CLAUDE IN VS CODE

You are Claude Code in my VS Code. Repo is already on GitHub:

**https://github.com/keanujohnadrales02-commits/stone-maple-ivory-horizon**

Your job: get Keanu running locally, then deploy it to my Vercel — same workflow as our previous Vite projects. Do not redesign the site.

Read `CLAUDE.md` and `KEANU_MASTER_PROMPT.md` after the repo is open.

---

## PHASE 1 — Open the repo in VS Code

If this folder is not already the repo, run:

```bash
git clone https://github.com/keanujohnadrales02-commits/stone-maple-ivory-horizon.git
cd stone-maple-ivory-horizon
```

If I already cloned it, just `cd` into it and `git pull origin main`.

Confirm these exist:

- `src/components/keanu/Hero.tsx`
- `src/components/keanu/DoorTheater.tsx`
- `public/keanu-portal.jpg`
- `public/keanu-warp.mp4`
- `KEANU_MASTER_PROMPT.md`

If any are missing, stop and tell me. Do not scaffold a blank app over the real files.

---

## PHASE 2 — Run it locally

```bash
npm install
npm run dev
```

Expected: site opens, stone doorway hero, copy is exactly:

```
AI SPECIALIST
Workflow automation
Automation engineering for operators who need the system to run.
```

Name **Keanu** only in the nav. Enter the door warps (stars + video) into How it works.

### If `npm run dev` fails (Grok / TanStack Start / nitro / grok-pwa)

Do **not** abandon the design. Convert to a clean Vite + React + TypeScript + Tailwind app, like our last VS Code projects:

1. Keep `src/components/keanu/*`, `src/styles.css`, `public/keanu-portal.jpg`, `public/keanu-warp.mp4`.
2. Add a normal `index.html` + `src/main.tsx` + `src/App.tsx`.
3. `App.tsx` renders `<DoorTheater>` with hero / how / work / close the same way `src/routes/index.tsx` does now.
4. Tailwind via `@tailwindcss/vite`. Fonts: Geist + General Sans (Fontshare).
5. `package.json` scripts:
   - `"dev": "vite"`
   - `"build": "tsc -b && vite build"`
   - `"preview": "vite preview"`
6. Drop Grok-only pieces if they break local: `scripts/grok-*`, `server/middleware/grok-pwa.ts`, `PreviewHostBridge`, `AuthProvider` (this site has no login), nitro vercel plugin. Do not drop the Keanu rooms.
7. `npm install` again, then `npm run dev`.

Do not change copy, colors, rooms, or the warp.

---

## PHASE 3 — Prove it works

Before Vercel:

- Hero headline is Workflow automation, not a giant name on the image
- How it works = three guarantees
- Projects = workflow graphs, not empty cards
- Start a project = working form, success says `Thanks, {firstName}.`
- Reduced-motion still swaps rooms
- `npm run build` succeeds

Commit and push:

```bash
git add -A
git commit -m "Keanu portfolio running locally"
git push origin main
```

---

## PHASE 4 — Connect Vercel (you may need me to click login)

### 4a. If Vercel CLI is available

```bash
npm i -g vercel
vercel login
vercel link --yes --project keanu --scope <my-vercel-team-or-user>
vercel --prod
```

When `vercel login` opens a browser, stop and tell me to finish the login, then continue.

Settings to use:

- Framework: Vite
- Build command: `npm run build`
- Output: Vite/Nitro default (do not invent a `dist` path if the current build emits `.vercel/output`)
- Install: `npm install`
- Root: repo root
- No env vars required

### 4b. If CLI is not logged in — give me the dashboard steps and wait

Tell me exactly:

1. Open https://vercel.com/new
2. Import **keanujohnadrales02-commits/stone-maple-ivory-horizon**
3. Framework Preset: Vite
4. Build Command: `npm run build`
5. Install Command: `npm install`
6. Deploy
7. Paste the `*.vercel.app` URL back here

Then you verify the production URL shows the doorway hero, not a blank page.

---

## PHASE 5 — After first deploy

If production is blank (`Failed to load module script` / MIME text/html):

- Check the build output actually uploaded `/assets/*`
- Fix base path. Do not set `base: './'` unless we confirm assets 404
- Redeploy: `vercel --prod` or wait for the GitHub push

If I want a custom domain, tell me:

1. Vercel → Project → Settings → Domains
2. Add the domain
3. Put the DNS records Vercel shows

Do not invent DNS values.

---

## HARD RULES

- Do not redesign
- Do not put Keanu on the doorway image
- Do not replace the warp with normal scrolling
- Do not use mailto for the form
- Do not add extra sections
- Do not force-push
- If a step needs my GitHub or Vercel password / browser login, stop and ask

Start at Phase 1 now. Report after each phase: what you ran, what URL is open, what failed.
