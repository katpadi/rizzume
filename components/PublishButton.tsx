'use client'

import { useState, useEffect, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useResumeStore } from '@/store/resumeStore'
import type { Resume } from '@/lib/types'

type CheckStatus = 'idle' | 'checking' | 'available' | 'taken'
type ActionStatus = 'idle' | 'busy' | 'done' | 'error'

export function PublishButton() {
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState('')
  const [checkStatus, setCheckStatus] = useState<CheckStatus>('idle')
  const [actionStatus, setActionStatus] = useState<ActionStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [copied, setCopied] = useState(false)
  const checkTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const publishedSlug = useResumeStore((s) => s.publishedSlug)
  const setPublishedSlug = useResumeStore((s) => s.setPublishedSlug)

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

  const isRename = !!publishedSlug
  const currentUrl = publishedSlug ? `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${publishedSlug}` : ''

  useEffect(() => {
    if (!open) {
      setSlug(publishedSlug)
      setCheckStatus('idle')
      setActionStatus('idle')
      setErrorMsg('')
      setCopied(false)
    }
  }, [open, publishedSlug])

  useEffect(() => {
    const trimmed = slug.trim()
    if (!trimmed || trimmed === publishedSlug) { setCheckStatus('idle'); return }
    if (!/^[a-z0-9-]{3,40}$/.test(trimmed)) { setCheckStatus('idle'); return }

    setCheckStatus('checking')
    if (checkTimeout.current) clearTimeout(checkTimeout.current)
    checkTimeout.current = setTimeout(async () => {
      const res = await fetch(`/api/r?slug=${trimmed}`)
      const data = await res.json()
      setCheckStatus(data.available ? 'available' : 'taken')
    }, 400)
  }, [slug, publishedSlug])

  const slugChanged = slug.trim() !== publishedSlug

  async function handleSubmit() {
    const trimmed = slug.trim()
    setActionStatus('busy')
    setErrorMsg('')

    if (isRename && slugChanged) {
      // Rename existing slug
      const res = await fetch('/api/r', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldSlug: publishedSlug, newSlug: trimmed }),
      })
      const data = await res.json()
      if (data.ok) {
        setPublishedSlug(trimmed)
        setActionStatus('done')
      } else {
        setErrorMsg(data.error ?? 'Something went wrong')
        setActionStatus('error')
      }
    } else {
      // Publish (new or re-publish same slug)
      const res = await fetch('/api/r', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: trimmed, resume }),
      })
      const data = await res.json()
      if (data.ok) {
        setPublishedSlug(trimmed)
        setActionStatus('done')
      } else {
        setErrorMsg(data.error ?? 'Something went wrong')
        setActionStatus('error')
      }
    }
  }

  async function copyLink() {
    const url = `${window.location.origin}/r/${publishedSlug}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const canSubmit = slug.trim().length >= 3 && (
    (!isRename && checkStatus === 'available') ||
    (isRename && !slugChanged) ||
    (isRename && slugChanged && checkStatus === 'available')
  )

  const buttonLabel = actionStatus === 'busy'
    ? (isRename && slugChanged ? 'Renaming…' : 'Publishing…')
    : (isRename && slugChanged ? 'Rename' : isRename ? 'Update' : 'Publish')

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-medium text-white px-3 py-1.5 rounded-lg transition-colors" style={{ background: 'var(--app-accent)' }} onMouseEnter={e => (e.currentTarget.style.background='var(--app-accent-hover)')} onMouseLeave={e => (e.currentTarget.style.background='var(--app-accent)')}
      >
        {publishedSlug ? '✓ Published' : 'Publish'}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-base font-semibold text-zinc-900 mb-1">
              {isRename ? 'Manage your resume URL' : 'Publish your resume'}
            </h2>
            <p className="text-xs text-zinc-400 mb-4">
              {isRename ? 'Change your public URL slug below.' : 'Choose a URL. Lowercase letters, numbers, hyphens.'}
            </p>

            {/* Current published link */}
            {publishedSlug && (
              <div className="flex items-center gap-2 mb-4 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2">
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-zinc-600 truncate flex-1 font-mono hover:text-zinc-900 transition-colors"
                >
                  {currentUrl}
                </a>
                <button onClick={copyLink} className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 shrink-0 transition-colors">
                  {copied ? '✓' : 'Copy'}
                </button>
              </div>
            )}

            {/* Slug input */}
            <div className="flex items-center gap-0 mb-1">
              <span className="text-xs text-zinc-400 bg-zinc-50 border border-r-0 border-zinc-200 rounded-l-lg px-3 py-2 shrink-0">
                rizzume.katpadi.ph/r/
              </span>
              <input
                autoFocus
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="your-name"
                maxLength={40}
                className="flex-1 text-xs border border-zinc-200 rounded-r-lg px-3 py-2 focus:outline-none focus:border-zinc-400 font-mono"
              />
            </div>

            {/* Status line */}
            <div className="h-4 mb-3">
              {slug.length >= 3 && slugChanged && (
                <p className={`text-[11px] ${
                  checkStatus === 'available' ? 'text-green-600' :
                  checkStatus === 'taken' ? 'text-red-500' :
                  'text-zinc-400'
                }`}>
                  {checkStatus === 'checking' && 'Checking…'}
                  {checkStatus === 'available' && '✓ Available'}
                  {checkStatus === 'taken' && 'Already taken'}
                </p>
              )}
              {actionStatus === 'error' && (
                <p className="text-[11px] text-red-500">{errorMsg}</p>
              )}
              {actionStatus === 'done' && (
                <p className="text-[11px] text-green-600">
                  {isRename && slugChanged ? '✓ URL renamed' : '✓ Published'}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || actionStatus === 'busy'}
                className="flex-1 text-xs font-medium text-white py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors" style={{ background: 'var(--app-accent)' }}
              >
                {buttonLabel}
              </button>
              <button onClick={() => setOpen(false)} className="text-xs text-zinc-400 hover:text-zinc-700 px-3 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
