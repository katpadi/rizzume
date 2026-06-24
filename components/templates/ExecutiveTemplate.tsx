import type { Resume } from '@/lib/types'

export function ExecutiveTemplate({ resume }: { resume: Resume }) {
  const { personal, summary, experience, skills, education, certifications, projects } = resume

  return (
    <div className="font-serif text-[11px] leading-relaxed text-zinc-900 bg-white min-h-full">
      {/* Header */}
      <div className="px-10 pt-8 pb-5 border-b-4 border-zinc-900">
        <h1 className="text-[28px] font-bold tracking-tight uppercase">{personal.name || 'Your Name'}</h1>
        {(() => {
          const items = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean)
          return items.length > 0 && (
            <div className="flex flex-wrap items-center mt-1.5 text-[10px] text-zinc-500">
              {items.map((item, i) => (
                <span key={i} className="flex items-center">
                  {i > 0 && <span className="mx-2 text-zinc-400 font-bold">·</span>}
                  {item}
                </span>
              ))}
            </div>
          )
        })()}
      </div>

      <div className="px-10 py-6 space-y-5">
        {/* Summary */}
        {summary.text && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2">Executive Summary</h2>
            <p className="text-zinc-700 leading-relaxed italic border-l-2 border-zinc-300 pl-3">{summary.text}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-3 border-b-2 border-zinc-900 pb-1">Professional Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-[12px]">{exp.title || 'Job Title'}</span>
                      {exp.company && <span className="text-zinc-600 ml-1">| {exp.company}</span>}
                    </div>
                    <span className="text-[10px] text-zinc-500 shrink-0 ml-4">
                      {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <div
                      className="mt-1 text-zinc-600 rich-text"
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
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2 border-b-2 border-zinc-900 pb-1">Skills</h2>
            <div className="grid grid-cols-3 gap-1">
              {skills.items.map((skill, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="text-zinc-400">◆</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2 border-b-2 border-zinc-900 pb-1">Education</h2>
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
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2 border-b-2 border-zinc-900 pb-1">Certifications</h2>
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
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2 border-b-2 border-zinc-900 pb-1">Notable Projects</h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between">
                    <span className="font-bold">{proj.name}</span>
                    {proj.url && <span className="text-[10px] text-zinc-500">{proj.url}</span>}
                  </div>
                  {proj.description && <p className="text-zinc-600">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
