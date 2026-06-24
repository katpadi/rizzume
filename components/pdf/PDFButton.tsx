'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { useShallow } from 'zustand/react/shallow'
import { useResumeStore } from '@/store/resumeStore'
import { ResumePDF } from './ResumePDF'

export default function PDFButton() {
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

  const filename = resume.personal.name
    ? `${resume.personal.name.replace(/\s+/g, '_')}_Resume.pdf`
    : 'Resume.pdf'

  return (
    <PDFDownloadLink document={<ResumePDF resume={resume} />} fileName={filename}>
      {({ loading }) => (
        <button
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 text-white text-xs font-medium rounded-lg disabled:opacity-50 transition-colors"
          style={{ background: 'var(--app-accent)' }}
          onMouseEnter={e => !loading && ((e.currentTarget as HTMLButtonElement).style.background = 'var(--app-accent-hover)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'var(--app-accent)')}
        >
          {loading ? (
            <>
              <span className="animate-spin text-xs">⟳</span>
              Preparing PDF...
            </>
          ) : (
            <>
              ↓ Download PDF
            </>
          )}
        </button>
      )}
    </PDFDownloadLink>
  )
}
