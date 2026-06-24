'use client'

import { useEffect } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import { RESUME_FONTS } from '@/lib/resumeFonts'
import type { ResumeTemplate, PageSize } from '@/lib/types'

const templates: { id: ResumeTemplate; label: string; description: string }[] = [
  { id: 'classic', label: 'Classic', description: 'Minimal, ATS-first' },
  { id: 'modern', label: 'Modern', description: 'Better typography' },
  { id: 'executive', label: 'Executive', description: 'Leadership roles' },
  { id: 'minimalist', label: 'Minimalist', description: 'Ultra-clean, whitespace-first' },
  { id: 'twocolumn', label: 'Two Column', description: 'Sidebar with dark accent' },
  { id: 'compact', label: 'Compact', description: 'Dense layout, info-rich' },
]

const pageSizes: PageSize[] = ['A4', 'Letter']

interface Props {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomReset: () => void
}

export function TemplateSwitcher({ zoom, onZoomIn, onZoomOut, onZoomReset }: Props) {
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate)
  const pageSize = useResumeStore((s) => s.pageSize)
  const resumeFont = useResumeStore((s) => s.resumeFont)
  const setTemplate = useResumeStore((s) => s.setTemplate)
  const setPageSize = useResumeStore((s) => s.setPageSize)
  const setResumeFont = useResumeStore((s) => s.setResumeFont)

  useEffect(() => {
    const font = RESUME_FONTS.find((f) => f.id === resumeFont)
    if (!font?.googleFont) return
    const id = `gfont-${font.id}`
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${font.googleFont}&display=swap`
    document.head.appendChild(link)
  }, [resumeFont])

  const zoomPct = Math.round((1 + zoom * 0.15) * 100)

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 bg-white gap-3 min-w-0 shrink-0">
      {/* Template tabs */}
      <div className="flex gap-0.5 overflow-x-auto scrollbar-none shrink min-w-0">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            title={t.description}
style={selectedTemplate === t.id ? { background: 'var(--app-accent)' } : undefined}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              selectedTemplate === t.id
                ? 'text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Divider */}
        <div className="w-px h-4 bg-zinc-200" />

        {/* Font picker */}
        <select
          value={resumeFont}
          onChange={(e) => setResumeFont(e.target.value)}
          className="text-[11px] text-zinc-600 border border-zinc-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-zinc-400 cursor-pointer hover:border-zinc-300 transition-colors"
        >
          {RESUME_FONTS.map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>

        {/* Page size */}
        <div className="flex bg-zinc-100 rounded-lg p-0.5 gap-0.5">
          {pageSizes.map((size) => (
            <button
              key={size}
              onClick={() => setPageSize(size)}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                pageSize === size
                  ? 'bg-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-zinc-200" />

        {/* Zoom */}
        <div className="flex items-center bg-zinc-100 rounded-lg p-0.5 gap-0.5">
          <button
            onClick={onZoomOut}
            disabled={zoom <= -3}
            className="h-6 w-6 flex items-center justify-center rounded-md text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium transition-all"
            title="Zoom out"
          >
            −
          </button>
          <button
            onClick={onZoomReset}
            className="text-[11px] w-10 text-center tabular-nums transition-colors font-medium" style={{ color: 'var(--app-accent)' }}
            title="Reset zoom"
          >
            {zoomPct}%
          </button>
          <button
            onClick={onZoomIn}
            disabled={zoom >= 3}
            className="h-6 w-6 flex items-center justify-center rounded-md text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium transition-all"
            title="Zoom in"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
