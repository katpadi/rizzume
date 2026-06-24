import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Resume,
  ResumePersonal,
  ResumeSummary,
  ResumeExperience,
  ResumeSkills,
  ResumeEducation,
  ResumeCertification,
  ResumeProject,
  ResumeTemplate,
  PageSize,
} from '@/lib/types'

const defaultResume: Resume = {
  personal: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  summary: { text: '' },
  experience: [],
  skills: { items: [] },
  education: [],
  certifications: [],
  projects: [],
  selectedTemplate: 'classic',
  pageSize: 'A4',
  resumeFont: 'helvetica',
}

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

interface ResumeStore extends Resume {
  updatePersonal: (data: Partial<ResumePersonal>) => void
  updateSummary: (data: Partial<ResumeSummary>) => void

  addExperience: () => void
  updateExperience: (id: string, data: Partial<Omit<ResumeExperience, 'id'>>) => void
  removeExperience: (id: string) => void
  reorderExperience: (from: number, to: number) => void

  updateSkills: (data: Partial<ResumeSkills>) => void

  addEducation: () => void
  updateEducation: (id: string, data: Partial<ResumeEducation>) => void
  removeEducation: (id: string) => void

  addCertification: () => void
  updateCertification: (id: string, data: Partial<ResumeCertification>) => void
  removeCertification: (id: string) => void

  addProject: () => void
  updateProject: (id: string, data: Partial<ResumeProject>) => void
  removeProject: (id: string) => void

  setTemplate: (template: ResumeTemplate) => void
  setPageSize: (size: PageSize) => void
  setResumeFont: (font: string) => void

  publishedSlug: string
  setPublishedSlug: (slug: string) => void

  clearResume: () => void
  loadResume: (data: Resume) => void
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      ...defaultResume,

      updatePersonal: (data) =>
        set((s) => ({ personal: { ...s.personal, ...data } })),

      updateSummary: (data) =>
        set((s) => ({ summary: { ...s.summary, ...data } })),

      addExperience: () =>
        set((s) => ({
          experience: [
            ...s.experience,
            {
              id: generateId(),
              company: '',
              title: '',
              startDate: '',
              endDate: '',
              current: false,
              description: '',
            },
          ],
        })),

      updateExperience: (id, data) =>
        set((s) => ({
          experience: s.experience.map((e) =>
            e.id === id ? { ...e, ...data } : e
          ),
        })),

      removeExperience: (id) =>
        set((s) => ({
          experience: s.experience.filter((e) => e.id !== id),
        })),

      reorderExperience: (from, to) =>
        set((s) => {
          const list = [...s.experience]
          const [item] = list.splice(from, 1)
          list.splice(to, 0, item)
          return { experience: list }
        }),

      updateSkills: (data) =>
        set((s) => ({ skills: { ...s.skills, ...data } })),

      addEducation: () =>
        set((s) => ({
          education: [
            ...s.education,
            { id: generateId(), school: '', degree: '', graduationYear: '' },
          ],
        })),

      updateEducation: (id, data) =>
        set((s) => ({
          education: s.education.map((e) =>
            e.id === id ? { ...e, ...data } : e
          ),
        })),

      removeEducation: (id) =>
        set((s) => ({
          education: s.education.filter((e) => e.id !== id),
        })),

      addCertification: () =>
        set((s) => ({
          certifications: [
            ...s.certifications,
            { id: generateId(), name: '', issuer: '', year: '' },
          ],
        })),

      updateCertification: (id, data) =>
        set((s) => ({
          certifications: s.certifications.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),

      removeCertification: (id) =>
        set((s) => ({
          certifications: s.certifications.filter((c) => c.id !== id),
        })),

      addProject: () =>
        set((s) => ({
          projects: [
            ...s.projects,
            { id: generateId(), name: '', description: '', url: '' },
          ],
        })),

      updateProject: (id, data) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        })),

      removeProject: (id) =>
        set((s) => ({
          projects: s.projects.filter((p) => p.id !== id),
        })),

      setTemplate: (template) => set({ selectedTemplate: template }),
      setPageSize: (size) => set({ pageSize: size }),
      setResumeFont: (font) => set({ resumeFont: font }),

      publishedSlug: '',
      setPublishedSlug: (slug) => set({ publishedSlug: slug }),

      clearResume: () => set({ ...defaultResume, publishedSlug: '' }),
      loadResume: (data) => set(data),
    }),
    {
      name: 'resume-v1',
      version: 1,
      migrate: (state: any, version: number) => {
        if (version < 1) {
          const old = state.skills
          if (old && !old.items) {
            state.skills = { items: [...(old.technical ?? []), ...(old.tools ?? []), ...(old.languages ?? [])] }
          }
        }
        return state
      },
    }
  )
)
