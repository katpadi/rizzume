'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PersonalInfoForm } from './PersonalInfoForm'
import { SummaryForm } from './SummaryForm'
import { ExperienceForm } from './ExperienceForm'
import { SkillsForm } from './SkillsForm'
import { EducationForm } from './EducationForm'
import { CertificationsForm } from './CertificationsForm'
import { ProjectsForm } from './ProjectsForm'

const sections = [
  { id: 'personal', label: 'Personal Info', component: <PersonalInfoForm /> },
  { id: 'summary', label: 'Summary', component: <SummaryForm /> },
  { id: 'experience', label: 'Work Experience', component: <ExperienceForm /> },
  { id: 'skills', label: 'Skills', component: <SkillsForm /> },
  { id: 'education', label: 'Education', component: <EducationForm /> },
  { id: 'certifications', label: 'Certifications', component: <CertificationsForm /> },
  { id: 'projects', label: 'Projects', component: <ProjectsForm /> },
]

export function ResumeForm() {
  return (
    <Accordion multiple defaultValue={['personal', 'summary', 'experience', 'skills', 'education']} className="w-full space-y-1.5">
      {sections.map(({ id, label, component }) => (
        <AccordionItem
          key={id}
          value={id}
          className="border border-zinc-200 rounded-xl overflow-hidden [&:has([data-state=open])]:border-amber-200"
        >
          <AccordionTrigger className="px-4 py-3 text-[11px] font-bold text-zinc-400 uppercase tracking-widest hover:no-underline hover:bg-amber-50 transition-colors [&[data-state=open]]:bg-amber-50 [&[data-state=open]]:text-amber-700">
            {label}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-3 border-t border-amber-100 bg-white">
            {component}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
