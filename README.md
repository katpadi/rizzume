# rizzume

ATS-friendly resume builder. Fill in your details, pick a template, download a PDF.

**Demo:** https://rizzume.katpadi.ph

---

## Features

- **6 resume templates** — Classic ATS, Modern ATS, Executive, Minimalist, Two Column, Compact
- **WYSIWYG editor** for work experience — bold, italic, underline, bullet lists, hyperlinks
- **PDF export** — client-side via `@react-pdf/renderer`, no server required
- **Font picker** — Helvetica, Georgia, EB Garamond, Lato, Merriweather
- **Page size** — A4 or US Letter
- **Zoom controls** — preview at ±3 levels (15% steps)
- **Auto-save** — persisted to `localStorage` via Zustand
- **JSON import / export** — portable resume format, version-tagged
- **Drag & drop** reordering of work experience entries
- **Resizable editor/preview split pane**

---

## Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16.2.9 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State | Zustand 5 with `persist` middleware |
| UI primitives | shadcn/ui + Base UI |
| Rich text | Tiptap (StarterKit + Underline + Link) |
| PDF | @react-pdf/renderer 4 |
| React | 19 |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

---

## Project Structure

```
app/
  page.tsx              # Landing page (redirects to /builder)
  builder/page.tsx      # Main builder UI
  api/r/route.ts        # Resume publish/rename API (file-based JSON storage)
  r/[slug]/page.tsx     # Public resume view (server-rendered)

components/
  form/                 # Section forms (Personal, Experience, Skills, etc.)
  preview/              # ResumePreview + TemplateSwitcher toolbar
  templates/            # 6 HTML resume templates
  pdf/                  # PDFButton + ResumePDF (@react-pdf layout)
  PublishButton.tsx     # Publish / rename public URL modal (currently hidden)
  JsonPortability.tsx   # Import / export JSON

lib/
  types.ts              # Resume type definitions
  resumeFonts.ts        # Font registry (id, CSS family, PDF family)
  resumeStorage.ts      # Server-side file storage (data/resumes/*.json)
  utils.ts              # cn() + parseHtmlBlocks() for PDF rendering

store/
  resumeStore.ts        # Zustand store — all resume state + actions
```

---

## Resume Data

All data lives in `localStorage` under the key `resume-v1` (versioned, with migration).

Exported JSON shape:

```json
{
  "version": 1,
  "personal": { "name": "", "email": "", "phone": "", "location": "", "linkedin": "", "website": "" },
  "summary": { "text": "" },
  "experience": [{ "id": "", "company": "", "title": "", "startDate": "", "endDate": "", "current": false, "description": "" }],
  "skills": { "items": [] },
  "education": [{ "id": "", "school": "", "degree": "", "graduationYear": "" }],
  "certifications": [{ "id": "", "name": "", "issuer": "", "year": "" }],
  "projects": [{ "id": "", "name": "", "description": "", "url": "" }],
  "selectedTemplate": "classic",
  "pageSize": "A4",
  "resumeFont": "helvetica"
}
```

---

## Public Resume URLs

Not planned. The app is browser-based with no server-side storage — all resume data stays in `localStorage`. The publish infrastructure (`/app/api/r/`, `/app/r/[slug]/`, `lib/resumeStorage.ts`) was built as a prototype but is not active and will not be enabled.

---

## Notes

- PDF rendering is 100% client-side — no files are sent to any server during export.
- `@react-pdf/renderer` uses built-in PDF fonts only (Helvetica, Times-Roman). Google Fonts selected in the preview map to the closest built-in equivalent in the PDF.
- The `lz-string` package is installed but unused (was an earlier approach for URL-encoded sharing).
