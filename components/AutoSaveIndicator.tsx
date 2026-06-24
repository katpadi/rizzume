'use client'

import { useEffect, useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'

export function AutoSaveIndicator() {
  const [status, setStatus] = useState<'saved' | 'saving'>('saved')
  const store = useResumeStore()

  useEffect(() => {
    setStatus('saving')
    const t = setTimeout(() => setStatus('saved'), 600)
    return () => clearTimeout(t)
  }, [
    store.personal,
    store.summary,
    store.experience,
    store.skills,
    store.education,
    store.certifications,
    store.projects,
  ])

  return (
    <span className={`text-xs transition-colors duration-300 ${status === 'saved' ? 'text-emerald-500' : 'text-amber-400'}`}>
      {status === 'saving' ? 'Saving…' : '✓ Saved'}
    </span>
  )
}
