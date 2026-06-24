import type { Resume } from '@/lib/types'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <h2 className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400 whitespace-nowrap">{children}</h2>
      <div className="h-px flex-1 bg-zinc-200" />
    </div>
  )
}

export function TwoColumnTemplate({ resume }: { resume: Resume }) {
  const { personal, summary, experience, skills, education, certifications, projects } = resume

  const contactItems = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean)

  return (
    <div className="text-[11px] leading-relaxed text-zinc-800 bg-white min-h-full">
      {/* Full-width header */}
      <div className="px-8 pt-7 pb-5 border-b-2 border-zinc-900">
        <h1 className="text-[24px] font-bold tracking-tight text-zinc-900 uppercase">{personal.name || 'Your Name'}</h1>
        {contactItems.length > 0 && (
          <div className="flex flex-wrap items-center mt-1.5 text-[10px] text-zinc-500">
            {contactItems.map((item, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <span className="mx-1.5 text-zinc-300">|</span>}
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body: left 60% + right 40% */}
      <div className="flex">
        {/* Left — main content */}
        <div className="w-[60%] shrink-0 px-8 py-6 space-y-5 border-r border-zinc-200">
          {summary.text && (
            <section>
              <Label>Summary</Label>
              <p className="text-zinc-600 leading-relaxed">{summary.text}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <Label>Experience</Label>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="font-bold text-zinc-900 text-[11.5px]">{exp.title || 'Job Title'}</span>
                      <span className="text-[10px] text-zinc-400 shrink-0">
                        {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.company && (
                      <p className="text-zinc-500 italic text-[10px] mb-1">{exp.company}</p>
                    )}
                    {exp.description && (
                      <div className="text-zinc-600 rich-text" dangerouslySetInnerHTML={{ __html: exp.description }} />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right — supporting content */}
        <div className="flex-1 px-6 py-6 space-y-5">
          {skills.items.length > 0 && (
            <section>
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-1">
                {skills.items.map((s, i) => (
                  <span key={i} className="text-[9.5px] border border-zinc-300 text-zinc-600 rounded px-1.5 py-0.5 leading-none">{s}</span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <Label>Education</Label>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-zinc-800">{edu.degree || 'Degree'}</p>
                    {edu.school && <p className="text-[10px] text-zinc-500">{edu.school}</p>}
                    {edu.graduationYear && <p className="text-[10px] text-zinc-400">{edu.graduationYear}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <Label>Certifications</Label>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-semibold text-zinc-800 leading-snug">{cert.name}</p>
                    {cert.issuer && <p className="text-[10px] text-zinc-400">{cert.issuer}{cert.year ? ` · ${cert.year}` : ''}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <Label>Projects</Label>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="font-semibold text-zinc-800">{proj.name}</p>
                    {proj.url && <p className="text-[10px] text-zinc-400">{proj.url}</p>}
                    {proj.description && <p className="text-[10px] text-zinc-600">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
