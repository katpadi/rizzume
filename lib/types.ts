export interface ResumePersonal {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
}

export interface ResumeSummary {
  text: string
}

export interface ResumeExperience {
  id: string
  company: string
  title: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface ResumeSkills {
  items: string[]
}

export interface ResumeEducation {
  id: string
  school: string
  degree: string
  graduationYear: string
}

export interface ResumeCertification {
  id: string
  name: string
  issuer: string
  year: string
}

export interface ResumeProject {
  id: string
  name: string
  description: string
  url: string
}

export type ResumeTemplate = 'classic' | 'modern' | 'executive' | 'minimalist' | 'twocolumn' | 'compact'

export type PageSize = 'A4' | 'Letter'

export interface Resume {
  personal: ResumePersonal
  summary: ResumeSummary
  experience: ResumeExperience[]
  skills: ResumeSkills
  education: ResumeEducation[]
  certifications: ResumeCertification[]
  projects: ResumeProject[]
  selectedTemplate: ResumeTemplate
  pageSize: PageSize
  resumeFont: string
}
