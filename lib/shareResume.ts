import LZString from 'lz-string'
import type { Resume } from '@/lib/types'

export function encodeResume(resume: Resume): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(resume))
}

export function decodeResume(encoded: string): Resume | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded)
    if (!json) return null
    return JSON.parse(json) as Resume
  } catch {
    return null
  }
}
