'use client'

import { useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useResumeStore } from '@/store/resumeStore'
import type { Resume } from '@/lib/types'

export function JsonPortability() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resume = useResumeStore(
    useShallow((s) => ({
      personal: s.personal,
      summary: s.summary,
      experience: s.experience,
      skills: s.skills,
      education: s.education,
      certifications: s.certifications,
      projects: s.projects,
      selectedTemplate: s.selectedTemplate,
      pageSize: s.pageSize,
    }))
  )
  const loadResume = useResumeStore((s) => s.loadResume)

  function handleExport() {
    const payload = JSON.stringify({ version: 1, ...resume }, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = resume.personal.name
      ? `${resume.personal.name.replace(/\s+/g, '_')}_resume.json`
      : 'resume.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as Resume & { version?: number }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { version: _v, ...data } = parsed
        loadResume(data as Resume)
      } catch {
        alert('Invalid JSON file — could not import resume.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleImport}
      />
      <div className="flex items-center gap-1 border border-zinc-200 rounded-lg overflow-hidden">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-xs text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors px-2.5 py-1.5"
          title="Import JSON"
        >
          Import
        </button>
        <div className="w-px h-4 bg-zinc-200" />
        <button
          onClick={handleExport}
          className="text-xs text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors px-2.5 py-1.5"
          title="Export JSON"
        >
          Export
        </button>
      </div>
    </>
  )
}
