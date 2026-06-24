import type { Resume } from '@/lib/types'

export function ClassicATSTemplate({ resume }: { resume: Resume }) {
  const { personal, summary, experience, skills, education, certifications, projects } = resume

  return (
    <div className="text-[11px] leading-normal text-zinc-900 p-8 bg-white min-h-full">
      {/* Header */}
      <div className="border-b-2 border-zinc-900 pb-3 mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wide">{personal.name || 'Your Name'}</h1>
        {(() => {
          const items = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean)
          return items.length > 0 && (
            <div className="flex flex-wrap items-center gap-y-0.5 mt-1 text-[10px] text-zinc-600">
              {items.map((item, i) => (
                <span key={i} className="flex items-center">
                  {i > 0 && <span className="mx-1.5 text-zinc-400 font-bold">·</span>}
                  {item}
                </span>
              ))}
            </div>
          )
        })()}
      </div>

      {/* Summary */}
      {summary.text && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-zinc-300 mb-1.5 pb-0.5">Summary</h2>
          <p className="text-zinc-700">{summary.text}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-zinc-300 mb-2 pb-0.5">Experience</h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[11px]">{exp.title || 'Job Title'}</span>
                  <span className="text-[10px] text-zinc-500">
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-zinc-600 italic">{exp.company}</div>
                {exp.description && (
                  <div
                    className="mt-0.5 text-zinc-700 rich-text"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.items.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-zinc-300 mb-1.5 pb-0.5">Skills</h2>
          <div>{skills.items.join(', ')}</div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-zinc-300 mb-2 pb-0.5">Education</h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{edu.degree || 'Degree'}</span>
                  {edu.school && <span className="text-zinc-600">, {edu.school}</span>}
                </div>
                <span className="text-[10px] text-zinc-500">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-zinc-300 mb-1.5 pb-0.5">Certifications</h2>
          <div className="space-y-0.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <span><span className="font-semibold">{cert.name}</span>{cert.issuer && ` — ${cert.issuer}`}</span>
                <span className="text-[10px] text-zinc-500">{cert.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-zinc-300 mb-2 pb-0.5">Projects</h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{proj.name}</span>
                  {proj.url && <span className="text-[10px] text-zinc-500">{proj.url}</span>}
                </div>
                {proj.description && <p className="text-zinc-700">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
