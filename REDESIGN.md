# Keanu — portfolio redesign

This is the editable React / TanStack Start project, redesigned from the supplied workspace. Original project screenshots, platform integration, and project descriptions are retained. Unrelated recordings, CVs, previous chat prompts, and workspace exports are not included in this delivery.

## Run locally

Use Node.js 22.12+ (verified with Node.js 24) and pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:8080. To build and preview:

```sh
pnpm build
pnpm preview
```

The production preview uses port 8081. The existing deployment target is Vercel; this delivery has not been published.

## Enquiry delivery

The original form saved data only in localStorage but displayed “Brief received.” This version prepares an editable brief and offers copy/download without claiming it has sent anything. Form details are held in page memory, not persisted.

To enable email handoff, set the public destination inbox in `src/components/keanu/contact-config.ts`. The review screen will then offer “Open email app” with a prefilled message. The visitor must send it in their mail app. This does not provide server-side delivery; a form endpoint can be connected separately.

## Main files

- `src/components/keanu/Portfolio.tsx`: new responsive page, project dialog, brief form.
- `src/components/keanu/projects.ts`: existing project evidence and descriptions.
- `src/components/keanu/contact-config.ts`: public enquiry inbox.
- `src/styles.css`: visual system and responsive layouts.
- `src/routes/index.tsx`: route to the redesigned portfolio.

The earlier components remain available in the source, but the route no longer mounts the scroll-intercepting DoorTheater. A small Windows compatibility fix was added to the environment wrapper, and the shared error component now narrows unknown errors before reading their message.

## Verification

- Production Vite client / server build passed; migration step correctly skipped without a database.
- TypeScript and ESLint on changed TypeScript files passed.
- Automated browser checks passed on development and built output in Edge: all 14 project views; screenshot loading; Escape dismissal; modal focus containment and restoration; required form validation; optional tool selection; brief copy, download, and edit; mobile menu; reduced motion; no runtime errors.
- No horizontal overflow at 390, 768, 1024, and 1440 pixels.
- Desktop and mobile screenshots visually reviewed.
- Existing dependency bundling warnings about “use client” were emitted during the successful production build.

`qa-full.mjs` contains the interaction checks. It requires a running preview and Microsoft Edge; use `QA_URL` to select the preview URL, defaulting to http://127.0.0.1:8080. The checks create local screenshots and a test download; they do not send enquiries.
