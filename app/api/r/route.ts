import { NextRequest, NextResponse } from 'next/server'
import { isValidSlug, slugExists, saveResume, renameResume } from '@/lib/resumeStorage'

// GET /api/r?slug=katpadi — check availability
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') ?? ''
  if (!isValidSlug(slug)) {
    return NextResponse.json({ available: false, error: 'Invalid slug' })
  }
  return NextResponse.json({ available: !slugExists(slug) })
}

// POST /api/r — publish resume
export async function POST(req: NextRequest) {
  let body: { slug: string; resume: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { slug, resume } = body
  if (!slug || !isValidSlug(slug as string)) {
    return NextResponse.json({ error: 'Invalid slug — use 3–40 lowercase letters, numbers, or hyphens' }, { status: 400 })
  }
  if (!resume || typeof resume !== 'object') {
    return NextResponse.json({ error: 'Missing resume data' }, { status: 400 })
  }

  saveResume(slug as string, resume as Parameters<typeof saveResume>[1])
  return NextResponse.json({ ok: true, url: `/r/${slug}` })
}

// PATCH /api/r — rename slug
export async function PATCH(req: NextRequest) {
  let body: { oldSlug: string; newSlug: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { oldSlug, newSlug } = body
  if (!isValidSlug(oldSlug) || !isValidSlug(newSlug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }
  if (!slugExists(oldSlug)) {
    return NextResponse.json({ error: 'Source slug not found' }, { status: 404 })
  }
  if (slugExists(newSlug)) {
    return NextResponse.json({ error: 'New slug already taken' }, { status: 409 })
  }
  renameResume(oldSlug, newSlug)
  return NextResponse.json({ ok: true, url: `/r/${newSlug}` })
}
