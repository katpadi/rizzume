# Agent Rules for rizz.me

## Framework

This project uses **Next.js 16.2.9** with the App Router. This version has breaking changes from earlier versions — APIs, conventions, and file structure differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Key Next.js 16 gotchas:
- Dynamic route `params` is a `Promise<{ slug: string }>` — must be awaited or passed through `params.then()`
- Dynamic routes without `generateStaticParams` require a `<Suspense>` boundary
- Turbopack is the default dev bundler — clear `.next/` and restart if new routes aren't registering

## State

All resume data lives in Zustand (`store/resumeStore.ts`), persisted to `localStorage` under key `resume-v1` (version 1 with migration). Use `useShallow` from `zustand/react/shallow` for object selectors to avoid infinite re-render loops.

## Styling

Tailwind CSS v4. No `tailwind.config.js` — configuration is in `app/globals.css` via `@theme`. App-level color tokens (amber accent, warm background, etc.) are CSS custom properties defined in `:root` in `globals.css`.

## UI Components

- shadcn/ui components live in `components/ui/`
- Accordion uses Base UI under the hood — the `multiple` prop (not `type="multiple"`) enables multi-open
- Do not import from `@radix-ui` directly

## PDF Rendering

`@react-pdf/renderer` runs client-side only. Always dynamic-import `PDFButton` with `{ ssr: false }`.

PDF-specific rules:
- Do **not** use `gap` in flex layouts — it causes overlapping elements in react-pdf. Use `marginRight`/`paddingRight` instead.
- Do **not** use `flexWrap: 'wrap'` for rows containing text — use a single `<Text>` with joined content instead.
- For two-column rows (title + date), give the left cell `flex: 1, paddingRight: 8` and the right cell `flexShrink: 0` to prevent overlap.
- Only built-in PDF fonts are available: Helvetica, Times-Roman, Courier (+ Bold/Oblique/BoldOblique variants). Google Fonts must be mapped to the nearest built-in in `PDF_FONT_MAP`.

## Resume Templates

Templates live in `components/templates/`. Each is a pure React component receiving `{ resume: Resume }`.

- Do **not** use `font-sans` or any Tailwind font utility class inside templates — it overrides the font family set by the preview wrapper and breaks font switching. Let templates inherit `fontFamily` via the parent's inline style.
- Do **not** use background colors in templates (no `bg-zinc-900`, no coloured sidebars). All templates must be white/transparent.

## Rich Text

Work experience descriptions are stored as HTML from Tiptap. In HTML templates, render with `dangerouslySetInnerHTML` and the `.rich-text` CSS class. In PDF, parse with `parseHtmlBlocks()` from `lib/utils.ts` (browser-only, uses `DOMParser`).

## File-based Resume Storage (Public URLs — not yet active)

- Server storage: `lib/resumeStorage.ts` — reads/writes JSON files under `data/resumes/[slug].json`
- Override directory with `RESUMES_DIR` env var
- API routes: `app/api/r/route.ts` — GET (availability check), POST (publish), PATCH (rename)
- Public view: `app/r/[slug]/page.tsx` — server component, calls `loadResume(slug)`, returns 404 if missing
- The Publish button (`components/PublishButton.tsx`) is currently commented out in the builder header — do not re-enable without confirming deployment target supports file writes
