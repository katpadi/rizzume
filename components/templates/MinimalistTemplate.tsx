import type { Resume } from '@/lib/types'

export function MinimalistTemplate({ resume }: { resume: Resume }) {
  const { personal, summary, experience, skills, education, certifications, projects } = resume

  const contactItems = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean)

  return (
    <div className="text-[11px] leading-relaxed text-zinc-800 bg-white min-h-full px-14 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-light tracking-[0.08em] text-zinc-900 mb-2">
          {personal.name || 'Your Name'}
        </h1>
        {contactItems.length > 0 && (
          <div className="flex flex-wrap items-center gap-y-0.5 text-[10px] text-zinc-400 tracking-wide">
            {contactItems.map((item, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <span className="mx-2">·</span>}
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary.text && (
        <section className="mb-7">
          <p className="text-zinc-600 leading-relaxed max-w-2xl">{summary.text}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-4">Experience</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-zinc-900">{exp.title || 'Job Title'}</span>
                    {exp.company && <span className="text-zinc-400">— {exp.company}</span>}
                  </div>
                  <span className="text-[10px] text-zinc-400 shrink-0 ml-4">
                    {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-zinc-600 rich-text mt-1" dangerouslySetInnerHTML={{ __html: exp.description }} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.items.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-3">Skills</h2>
          <p className="text-zinc-600">{skills.items.join('  ·  ')}</p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-3">Education</h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-zinc-900">{edu.degree || 'Degree'}</span>
                  {edu.school && <span className="text-zinc-400">— {edu.school}</span>}
                </div>
                <span className="text-[10px] text-zinc-400">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-3">Certifications</h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <span><span className="font-semibold text-zinc-900">{cert.name}</span>{cert.issuer && <span className="text-zinc-400"> · {cert.issuer}</span>}</span>
                <span className="text-[10px] text-zinc-400">{cert.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-3">Projects</h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
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
  )
}
