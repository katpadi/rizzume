import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-4 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-zinc-900 mb-4">rizz.me</h1>
      <p className="text-lg text-zinc-500 mb-8 max-w-md">
        Build ATS-friendly resumes. Preview live. Download a polished PDF — all in your browser.
      </p>
      <Link
        href="/builder"
        className="px-6 py-3 bg-zinc-900 text-white font-semibold rounded-xl hover:bg-zinc-700 transition-colors text-lg"
      >
        Build My Resume
      </Link>
      <p className="mt-6 text-xs text-zinc-400">No signup required · Data stays in your browser</p>
    </main>
  )
}
