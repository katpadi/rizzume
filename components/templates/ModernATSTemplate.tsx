import type { Resume } from '@/lib/types'

export function ModernATSTemplate({ resume }: { resume: Resume }) {
  const { personal, summary, experience, skills, education, certifications, projects } = resume

  return (
    <div className="text-[11px] leading-relaxed text-zinc-800 bg-white min-h-full">
      {/* Header */}
      <div className="border-b-2 border-zinc-800 px-8 py-6">
        <h1 className="text-3xl font-light tracking-wide text-zinc-900">{personal.name || 'Your Name'}</h1>
        {(() => {
          const items = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean)
          return items.length > 0 && (
            <div className="flex flex-wrap items-center mt-2 text-[10px] text-zinc-500">
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

      <div className="px-8 py-5 space-y-5">
        {/* Summary */}
        {summary.text && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1.5">Profile</h2>
            <p className="text-zinc-700 leading-relaxed">{summary.text}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-200 pb-1 mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-[12px] text-zinc-900">{exp.title || 'Job Title'}</div>
                      <div className="text-zinc-500">{exp.company}</div>
                    </div>
                    <div className="text-[10px] text-zinc-400 text-right shrink-0 ml-4">
                      {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                    </div>
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
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-200 pb-1 mb-2">Skills</h2>
            <p>{skills.items.join(' · ')}</p>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-200 pb-1 mb-2">Education</h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <div className="font-semibold text-zinc-900">{edu.degree || 'Degree'}</div>
                    <div className="text-zinc-500">{edu.school}</div>
                  </div>
                  <span className="text-[10px] text-zinc-400">{edu.graduationYear}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-200 pb-1 mb-2">Certifications</h2>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <span><span className="font-semibold">{cert.name}</span>{cert.issuer && <span className="text-zinc-500"> · {cert.issuer}</span>}</span>
                  <span className="text-[10px] text-zinc-400">{cert.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-zinc-200 pb-1 mb-2">Projects</h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between">
                    <span className="font-semibold text-zinc-900">{proj.name}</span>
                    {proj.url && <span className="text-[10px] text-zinc-400">{proj.url}</span>}
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
