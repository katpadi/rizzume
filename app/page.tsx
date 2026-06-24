import Link from 'next/link'

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: 'var(--app-bg)' }}
    >
      <h1 className="text-5xl font-bold tracking-tight mb-3" style={{ color: 'var(--app-accent)' }}>
        rizzume
      </h1>
      <p className="text-lg mb-8 max-w-md" style={{ color: '#78716c' }}>
        Build ATS-friendly resumes. Preview live. Download a polished PDF — all in your browser.
      </p>
      <Link
        href="/builder"
        className="btn-accent px-6 py-3 font-semibold rounded-xl text-lg text-white"
      >
        Build My Resume
      </Link>
      <p className="mt-6 text-xs" style={{ color: '#a8a29e' }}>No signup required · Data stays in your browser</p>
    </main>
  )
}
