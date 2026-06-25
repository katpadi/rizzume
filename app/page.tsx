import Link from 'next/link'
import { RizzumeWordmark } from '@/components/brand/RizzumeWordmark'

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: 'var(--rizz-paper)' }}
    >
      <RizzumeWordmark size="hero" variant="coral" showTagline />

      <p
        className="mt-12 max-w-md text-[15px] leading-relaxed"
        style={{ color: 'var(--rizz-warm-mid)' }}
      >
        Tailors your résumé to any job post and preps you for the interview.
        Build ATS-friendly résumés, preview live, and download a polished PDF — all in your browser.
      </p>

      <Link
        href="/builder"
        className="mt-10 btn-accent px-8 py-3.5 font-semibold rounded-xl text-lg text-white inline-block"
      >
        Build My Résumé
      </Link>

      <p className="mt-5 text-xs" style={{ fontFamily: "'Space Mono', monospace", color: 'var(--rizz-warm-muted)' }}>
        No signup required · Data stays in your browser
      </p>
    </main>
  )
}
