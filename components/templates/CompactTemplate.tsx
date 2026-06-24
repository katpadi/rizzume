import type { Resume } from '@/lib/types'

export function CompactTemplate({ resume }: { resume: Resume }) {
  const { personal, summary, experience, skills, education, certifications, projects } = resume

  const contactItems = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean)
  const hasSkills = skills.items.length > 0

  return (
    <div className="text-[10.5px] leading-snug text-zinc-800 bg-white min-h-full px-8 py-7">
      {/* Header */}
      <div className="border-b-2 border-zinc-800 pb-2 mb-3">
        <h1 className="text-[18px] font-bold text-zinc-900 tracking-tight">{personal.name || 'Your Name'}</h1>
        {contactItems.length > 0 && (
          <div className="flex flex-wrap gap-x-3 mt-0.5 text-[9.5px] text-zinc-500">
            {contactItems.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-5">
        {/* Left column — secondary info */}
        <div className="w-[30%] shrink-0 space-y-3">
          {/* Skills */}
          {hasSkills && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-wider text-zinc-700 border-b border-zinc-300 pb-0.5 mb-1.5">Skills</h2>
              <p className="text-zinc-600">{skills.items.join(', ')}</p>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-wider text-zinc-700 border-b border-zinc-300 pb-0.5 mb-1.5">Education</h2>
              <div className="space-y-1.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-zinc-800 leading-tight">{edu.degree || 'Degree'}</p>
                    <p className="text-zinc-500">{edu.school}</p>
                    <p className="text-zinc-400 text-[9px]">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-wider text-zinc-700 border-b border-zinc-300 pb-0.5 mb-1.5">Certifications</h2>
              <div className="space-y-1">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-semibold text-zinc-800 leading-tight">{cert.name}</p>
                    {cert.issuer && <p className="text-zinc-500">{cert.issuer}{cert.year ? `, ${cert.year}` : ''}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-wider text-zinc-700 border-b border-zinc-300 pb-0.5 mb-1.5">Projects</h2>
              <div className="space-y-1.5">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="font-semibold text-zinc-800 leading-tight">{proj.name}</p>
                    {proj.url && <p className="text-[9px] text-zinc-400">{proj.url}</p>}
                    {proj.description && <p className="text-zinc-600">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column — main content */}
        <div className="flex-1 space-y-3">
          {/* Summary */}
          {summary.text && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-wider text-zinc-700 border-b border-zinc-300 pb-0.5 mb-1.5">Summary</h2>
              <p className="text-zinc-600 leading-relaxed">{summary.text}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[9px] font-bold uppercase tracking-wider text-zinc-700 border-b border-zinc-300 pb-0.5 mb-1.5">Experience</h2>
              <div className="space-y-2.5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-zinc-900">{exp.title || 'Job Title'}</span>
                      <span className="text-[9.5px] text-zinc-400 shrink-0 ml-2">
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-[10px]">{exp.company}</p>
                    {exp.description && (
                      <div className="text-zinc-600 rich-text mt-0.5" dangerouslySetInnerHTML={{ __html: exp.description }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
