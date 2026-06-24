import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import type { Resume } from '@/lib/types'
import { parseHtmlBlocks } from '@/lib/utils'
import { getFontById } from '@/lib/resumeFonts'

// Built-in @react-pdf fonts: Helvetica, Times-Roman, Courier (+ Bold/Oblique variants)
const PDF_FONT_MAP: Record<string, { regular: string; bold: string; italic: string; boldItalic: string }> = {
  Helvetica:    { regular: 'Helvetica',   bold: 'Helvetica-Bold',  italic: 'Helvetica-Oblique', boldItalic: 'Helvetica-BoldOblique' },
  'Times-Roman':{ regular: 'Times-Roman', bold: 'Times-Bold',      italic: 'Times-Italic',      boldItalic: 'Times-BoldItalic' },
  EBGaramond:   { regular: 'Times-Roman', bold: 'Times-Bold',      italic: 'Times-Italic',      boldItalic: 'Times-BoldItalic' },
  Lato:         { regular: 'Helvetica',   bold: 'Helvetica-Bold',  italic: 'Helvetica-Oblique', boldItalic: 'Helvetica-BoldOblique' },
  Merriweather: { regular: 'Times-Roman', bold: 'Times-Bold',      italic: 'Times-Italic',      boldItalic: 'Times-BoldItalic' },
}

const s = StyleSheet.create({
  page: {
    fontSize: 9,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 48,
    color: '#1a1a1a',
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#1a1a1a',
    paddingBottom: 8,
  },
  name: {
    fontSize: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  // Single text line — avoids flex-wrap positioning bugs in react-pdf
  contactLine: {
    fontSize: 8,
    color: '#555',
    marginTop: 3,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottomWidth: 0.75,
    borderBottomColor: '#ccc',
    paddingBottom: 2,
    marginBottom: 5,
    color: '#555',
  },
  // Two-column row: flex: 1 on left forces right to stay in its lane
  rowLeft: {
    flex: 1,
    paddingRight: 8,
  },
  rowRight: {
    fontSize: 8,
    color: '#777',
    textAlign: 'right',
    flexShrink: 0,
  },
  expTitle: {
    fontSize: 9,
  },
  expCompany: {
    color: '#555',
    marginBottom: 2,
  },
  description: {
    color: '#333',
    marginTop: 1,
  },
  // Bullet: no gap — marginRight on the dot
  bulletRow: {
    flexDirection: 'row',
    marginTop: 1,
  },
  bullet: {
    color: '#999',
    width: 10,
    flexShrink: 0,
  },
  bulletText: {
    flex: 1,
    color: '#333',
  },
  skillValue: {
    color: '#333',
  },
  eduDegree: {
    marginBottom: 1,
  },
  eduSchool: {
    color: '#555',
    fontSize: 8,
  },
})

function Section({ title, boldFont, children }: { title: string; boldFont: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={[s.sectionTitle, { fontFamily: boldFont }]}>{title}</Text>
      {children}
    </View>
  )
}

// Row with left (flex: 1) and right (fixed) to prevent overlap
function SpacedRow({ left, right, boldFont, italic }: {
  left: string
  right?: string
  boldFont: string
  italic?: boolean
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <Text style={[s.rowLeft, { fontFamily: italic ? boldFont.replace('Bold', 'Oblique').replace('-Bold', '-Oblique') : boldFont }]}>
        {left}
      </Text>
      {right ? <Text style={s.rowRight}>{right}</Text> : null}
    </View>
  )
}

export function ResumePDF({ resume }: { resume: Resume }) {
  const { personal, summary, experience, skills, education, certifications, projects, pageSize, resumeFont } = resume

  const pdfFont = PDF_FONT_MAP[getFontById(resumeFont).pdfFamily] ?? PDF_FONT_MAP['Helvetica']
  const pageFormat = pageSize === 'A4' ? 'A4' : { width: 612, height: 792 }

  const contactItems = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean)

  return (
    <Document>
      <Page size={pageFormat} style={[s.page, { fontFamily: pdfFont.regular }]}>

        {/* Header */}
        <View style={s.header}>
          <Text style={[s.name, { fontFamily: pdfFont.bold }]}>{personal.name || 'Your Name'}</Text>
          {contactItems.length > 0 && (
            <Text style={s.contactLine}>{contactItems.join(' · ')}</Text>
          )}
        </View>

        {/* Summary */}
        {summary.text ? (
          <Section title="Summary" boldFont={pdfFont.bold}>
            <Text style={s.description}>{summary.text}</Text>
          </Section>
        ) : null}

        {/* Experience */}
        {experience.length > 0 ? (
          <Section title="Experience" boldFont={pdfFont.bold}>
            {experience.map((exp, idx) => {
              const dateStr = [
                exp.startDate,
                exp.startDate && (exp.endDate || exp.current) ? '–' : '',
                exp.current ? 'Present' : exp.endDate,
              ].filter(Boolean).join(' ')
              const blocks = exp.description ? parseHtmlBlocks(exp.description) : []
              return (
                <View key={exp.id} wrap={false} style={{ marginBottom: idx < experience.length - 1 ? 7 : 0 }}>
                  {/* Title + date on same row, date pinned right */}
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Text style={[s.rowLeft, s.expTitle, { fontFamily: pdfFont.bold }]}>
                      {exp.title || 'Job Title'}
                    </Text>
                    {dateStr ? <Text style={s.rowRight}>{dateStr}</Text> : null}
                  </View>
                  {exp.company ? (
                    <Text style={[s.expCompany, { fontFamily: pdfFont.italic }]}>{exp.company}</Text>
                  ) : null}
                  {blocks.map((block, i) =>
                    block.type === 'bullet' ? (
                      <View key={i} style={s.bulletRow}>
                        <Text style={s.bullet}>{'•'}</Text>
                        <Text style={s.bulletText}>{block.text}</Text>
                      </View>
                    ) : (
                      <Text key={i} style={[s.description, { marginBottom: 1 }]}>{block.text}</Text>
                    )
                  )}
                </View>
              )
            })}
          </Section>
        ) : null}

        {/* Skills */}
        {skills.items.length > 0 ? (
          <Section title="Skills" boldFont={pdfFont.bold}>
            <Text style={s.skillValue}>{skills.items.join(', ')}</Text>
          </Section>
        ) : null}

        {/* Education */}
        {education.length > 0 ? (
          <Section title="Education" boldFont={pdfFont.bold}>
            {education.map((edu, idx) => (
              <View key={edu.id} wrap={false} style={{ marginBottom: idx < education.length - 1 ? 4 : 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Text style={[s.rowLeft, { fontFamily: pdfFont.bold }]}>{edu.degree || 'Degree'}</Text>
                  {edu.graduationYear ? <Text style={s.rowRight}>{edu.graduationYear}</Text> : null}
                </View>
                {edu.school ? <Text style={s.eduSchool}>{edu.school}</Text> : null}
              </View>
            ))}
          </Section>
        ) : null}

        {/* Certifications */}
        {certifications.length > 0 ? (
          <Section title="Certifications" boldFont={pdfFont.bold}>
            {certifications.map((cert, idx) => (
              <View key={cert.id} wrap={false} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: idx < certifications.length - 1 ? 3 : 0 }}>
                <Text style={[s.rowLeft]}>
                  <Text style={{ fontFamily: pdfFont.bold }}>{cert.name}</Text>
                  {cert.issuer ? ` — ${cert.issuer}` : ''}
                </Text>
                {cert.year ? <Text style={s.rowRight}>{cert.year}</Text> : null}
              </View>
            ))}
          </Section>
        ) : null}

        {/* Projects */}
        {projects.length > 0 ? (
          <Section title="Projects" boldFont={pdfFont.bold}>
            {projects.map((proj, idx) => (
              <View key={proj.id} wrap={false} style={{ marginBottom: idx < projects.length - 1 ? 4 : 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Text style={[s.rowLeft, { fontFamily: pdfFont.bold }]}>{proj.name}</Text>
                  {proj.url ? <Text style={s.rowRight}>{proj.url}</Text> : null}
                </View>
                {proj.description ? <Text style={s.description}>{proj.description}</Text> : null}
              </View>
            ))}
          </Section>
        ) : null}

      </Page>
    </Document>
  )
}
