'use client'

import dynamic from 'next/dynamic'
import { useRef, useState, useCallback } from 'react'
import { ResumeForm } from '@/components/form/ResumeForm'
import { ResumePreview } from '@/components/preview/ResumePreview'
import { TemplateSwitcher } from '@/components/preview/TemplateSwitcher'
import { useResumeStore } from '@/store/resumeStore'
import { AutoSaveIndicator } from '@/components/AutoSaveIndicator'
import { JsonPortability } from '@/components/JsonPortability'
import Link from 'next/link'

const PDFButton = dynamic(() => import('@/components/pdf/PDFButton'), { ssr: false })

const MIN_WIDTH = 280
const MAX_WIDTH = 700
const DEFAULT_WIDTH = 520

export default function BuilderPage() {
  const clearResume = useResumeStore((s) => s.clearResume)
  const [panelWidth, setPanelWidth] = useState(DEFAULT_WIDTH)
  const [zoom, setZoom] = useState(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(DEFAULT_WIDTH)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    startX.current = e.clientX
    startWidth.current = panelWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const delta = e.clientX - startX.current
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta))
      setPanelWidth(next)
    }

    const onMouseUp = () => {
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [panelWidth])

  return (
    <div className="flex flex-col h-screen" style={{ background: 'var(--app-bg)' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-2.5 bg-white shrink-0 shadow-sm z-10" style={{ borderBottom: '1px solid var(--app-border)' }}>
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg font-bold tracking-tight group-hover:opacity-70 transition-opacity" style={{ color: 'var(--app-accent)' }}>
            rizzume
          </span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none" style={{ background: 'var(--app-accent-light)', color: 'var(--app-accent)' }}>
            beta
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <AutoSaveIndicator />
          <div className="w-px h-4 mx-2" style={{ background: 'var(--app-border)' }} />
          <JsonPortability />
          <PDFButton />
          <div className="w-px h-4 mx-1" style={{ background: 'var(--app-border)' }} />
          <button
            onClick={() => {
              if (confirm('Clear all resume data? This cannot be undone.')) clearResume()
            }}
            className="text-xs text-zinc-400 hover:text-red-500 transition-colors px-2 py-1.5 rounded hover:bg-red-50"
          >
            Clear
          </button>
        </div>
      </header>

      {/* Main split */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — Form */}
        <aside
          className="shrink-0 overflow-y-auto bg-white"
          style={{ width: panelWidth, borderRight: '1px solid var(--app-border)' }}
        >
          <div className="px-4 py-5">
            <ResumeForm />
          </div>
        </aside>

        {/* Drag handle */}
        <div
          onMouseDown={onMouseDown}
          className="w-[5px] shrink-0 cursor-col-resize transition-colors relative group"
          style={{ background: 'var(--app-border)' }}
          title="Drag to resize"
        >
          <div className="absolute inset-y-0 -left-2 -right-2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[3px] opacity-0 group-hover:opacity-100 transition-opacity">
            {[0,1,2,3].map(i => (
              <div key={i} className="w-[3px] h-[3px] rounded-full" style={{ background: 'var(--app-accent)' }} />
            ))}
          </div>
        </div>

        {/* Right — Preview */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <TemplateSwitcher
            zoom={zoom}
            onZoomIn={() => setZoom((z) => Math.min(3, z + 1))}
            onZoomOut={() => setZoom((z) => Math.max(-3, z - 1))}
            onZoomReset={() => setZoom(0)}
          />
          <div className="flex-1 overflow-auto p-6" style={{ background: 'var(--app-bg)' }}>
            <ResumePreview zoom={zoom} />
          </div>
        </div>
      </div>
    </div>
  )
}
