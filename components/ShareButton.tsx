'use client'

import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useResumeStore } from '@/store/resumeStore'
import { encodeResume } from '@/lib/shareResume'
import type { Resume } from '@/lib/types'

export function ShareButton() {
  const [state, setState] = useState<'idle' | 'copied'>('idle')

  const resume = useResumeStore(
    useShallow((s): Resume => ({
      personal: s.personal,
      summary: s.summary,
      experience: s.experience,
      skills: s.skills,
      education: s.education,
      certifications: s.certifications,
      projects: s.projects,
      selectedTemplate: s.selectedTemplate,
      pageSize: s.pageSize,
      resumeFont: s.resumeFont,
    }))
  )

  async function handleClick() {
    const encoded = encodeResume(resume)
    const url = `${window.location.origin}/r?d=${encoded}`
    await navigator.clipboard.writeText(url)
    setState('copied')
    setTimeout(() => setState('idle'), 1500)
  }

  return (
    <button
      onClick={handleClick}
      className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
    >
      {state === 'copied' ? '✓ Copied!' : 'Share'}
    </button>
  )
}
