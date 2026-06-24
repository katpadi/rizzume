'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { ResumeEducation } from '@/lib/types'

export function EducationForm() {
  const education = useResumeStore((s) => s.education)
  const addEducation = useResumeStore((s) => s.addEducation)
  const updateEducation = useResumeStore((s) => s.updateEducation)
  const removeEducation = useResumeStore((s) => s.removeEducation)

  return (
    <div className="space-y-3">
      {education.map((entry, i) => (
        <div key={entry.id} className="border border-zinc-200 rounded-lg p-4 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
              School {i + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(entry.id)}
              className="h-7 w-7 p-0 text-red-400 hover:text-red-600"
            >
              ✕
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-zinc-500 mb-1 block">School / University *</Label>
              <Input
                placeholder="MIT"
                value={entry.school}
                onChange={(e) => updateEducation(entry.id, { school: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-500 mb-1 block">Degree *</Label>
              <Input
                placeholder="B.S. Computer Science"
                value={entry.degree}
                onChange={(e) => updateEducation(entry.id, { degree: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-500 mb-1 block">Graduation Year</Label>
              <Input
                placeholder="2020"
                value={entry.graduationYear}
                onChange={(e) => updateEducation(entry.id, { graduationYear: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full" onClick={addEducation}>
        + Add Education
      </Button>
    </div>
  )
}
