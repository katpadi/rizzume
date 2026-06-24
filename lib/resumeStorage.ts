import fs from 'fs'
import path from 'path'
import type { Resume } from '@/lib/types'

const RESUMES_DIR = process.env.RESUMES_DIR
  ? path.resolve(process.env.RESUMES_DIR)
  : path.join(process.cwd(), 'data', 'resumes')

function ensureDir() {
  if (!fs.existsSync(RESUMES_DIR)) fs.mkdirSync(RESUMES_DIR, { recursive: true })
}

function slugPath(slug: string) {
  return path.join(RESUMES_DIR, `${slug}.json`)
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]{3,40}$/.test(slug)
}

export function slugExists(slug: string): boolean {
  return fs.existsSync(slugPath(slug))
}

export function saveResume(slug: string, resume: Resume): void {
  ensureDir()
  fs.writeFileSync(slugPath(slug), JSON.stringify(resume, null, 2), 'utf-8')
}

export function renameResume(oldSlug: string, newSlug: string): void {
  const data = fs.readFileSync(slugPath(oldSlug), 'utf-8')
  ensureDir()
  fs.writeFileSync(slugPath(newSlug), data, 'utf-8')
  fs.unlinkSync(slugPath(oldSlug))
}

export function loadResume(slug: string): Resume | null {
  const file = slugPath(slug)
  if (!fs.existsSync(file)) return null
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8')) as Resume
  } catch {
    return null
  }
}
