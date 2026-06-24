'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function SummaryForm() {
  const text = useResumeStore((s) => s.summary.text)
  const updateSummary = useResumeStore((s) => s.updateSummary)

  return (
    <div>
      <Label className="text-xs font-medium text-zinc-500 mb-1 block">
        Professional Summary
      </Label>
      <Textarea
        placeholder="Brief career summary highlighting your key strengths and goals..."
        value={text}
        onChange={(e) => updateSummary({ text: e.target.value })}
        rows={4}
        className="resize-none"
      />
      <p className="text-xs text-zinc-400 mt-1">{text.length} characters</p>
    </div>
  )
}
