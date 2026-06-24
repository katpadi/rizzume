'use client'

import { useShallow } from 'zustand/react/shallow'
import { useResumeStore } from '@/store/resumeStore'
import { ClassicATSTemplate } from '@/components/templates/ClassicATSTemplate'
import { ModernATSTemplate } from '@/components/templates/ModernATSTemplate'
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate'
import { MinimalistTemplate } from '@/components/templates/MinimalistTemplate'
import { TwoColumnTemplate } from '@/components/templates/TwoColumnTemplate'
import { CompactTemplate } from '@/components/templates/CompactTemplate'
import type { Resume, ResumeTemplate } from '@/lib/types'
import { getFontById } from '@/lib/resumeFonts'

const templates: Record<ResumeTemplate, React.ComponentType<{ resume: Resume }>> = {
  classic: ClassicATSTemplate,
  modern: ModernATSTemplate,
  executive: ExecutiveTemplate,
  minimalist: MinimalistTemplate,
  twocolumn: TwoColumnTemplate,
  compact: CompactTemplate,
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20 text-zinc-400">
      <div className="text-5xl mb-4">📄</div>
      <p className="font-medium text-zinc-500">Your resume preview will appear here</p>
      <p className="text-sm mt-1">Start filling in your information on the left</p>
    </div>
  )
}

function hasContent(resume: Resume): boolean {
  return !!(
    resume.personal.name ||
    resume.summary.text ||
    resume.experience.length > 0 ||
    resume.education.length > 0
  )
}

interface Props {
  zoom: number
}

export function ResumePreview({ zoom }: Props) {
  const resume = useResumeStore(
    useShallow((s) => ({
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

  const Template = templates[resume.selectedTemplate]
  const scale = 1 + zoom * 0.15

  return (
    <div className="bg-zinc-100 rounded-lg overflow-auto h-full">
      <div
        className="mx-auto shadow-lg my-4"
        style={{
          width: resume.pageSize === 'A4' ? '210mm' : '8.5in',
          minHeight: resume.pageSize === 'A4' ? '297mm' : '11in',
          background: 'white',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: `calc(1rem + ${(scale - 1) * 100}%)`,
          fontFamily: getFontById(resume.resumeFont).cssFamily,
        }}
      >
        {hasContent(resume) ? <Template resume={resume} /> : <EmptyState />}
      </div>
    </div>
  )
}
