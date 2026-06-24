import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { loadResume } from '@/lib/resumeStorage'
import { getFontById } from '@/lib/resumeFonts'
import { ClassicATSTemplate } from '@/components/templates/ClassicATSTemplate'
import { ModernATSTemplate } from '@/components/templates/ModernATSTemplate'
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate'
import { MinimalistTemplate } from '@/components/templates/MinimalistTemplate'
import { TwoColumnTemplate } from '@/components/templates/TwoColumnTemplate'
import { CompactTemplate } from '@/components/templates/CompactTemplate'
import type { Resume, ResumeTemplate } from '@/lib/types'

const templates: Record<ResumeTemplate, React.ComponentType<{ resume: Resume }>> = {
  classic: ClassicATSTemplate,
  modern: ModernATSTemplate,
  executive: ExecutiveTemplate,
  minimalist: MinimalistTemplate,
  twocolumn: TwoColumnTemplate,
  compact: CompactTemplate,
}

async function ResumeContent({ slug }: { slug: string }) {
  const resume = loadResume(slug)
  if (!resume) notFound()

  const Template = templates[resume.selectedTemplate] ?? ClassicATSTemplate
  const font = getFontById(resume.resumeFont)

  return (
    <main className="flex-1 flex flex-col items-center py-10 px-4">
      <div
        className="w-full shadow-xl bg-white"
        style={{
          maxWidth: resume.pageSize === 'A4' ? '210mm' : '8.5in',
          minHeight: resume.pageSize === 'A4' ? '297mm' : '11in',
          fontFamily: font.cssFamily,
        }}
      >
        <Template resume={resume} />
      </div>
    </main>
  )
}

export default function PublicResumePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <header className="bg-white border-b border-zinc-200 px-6 py-3 flex items-center justify-between shrink-0">
        <Link href="/" className="text-lg font-bold text-zinc-900 tracking-tight hover:opacity-70 transition-opacity">
          rizz.me
        </Link>
        <Link href="/builder" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
          Build your own →
        </Link>
      </header>
      <Suspense fallback={<div className="flex-1" />}>
        {params.then(({ slug }) => <ResumeContent slug={slug} />)}
      </Suspense>
    </div>
  )
}
