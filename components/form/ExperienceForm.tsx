'use client'

import { useRef, useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RichTextEditor } from './RichTextEditor'
import type { ResumeExperience } from '@/lib/types'

function DragHandle() {
  return (
    <div className="cursor-grab active:cursor-grabbing px-1 py-0.5 text-zinc-300 hover:text-zinc-500 transition-colors select-none" title="Drag to reorder">
      <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
        <circle cx="3" cy="3" r="1.5" />
        <circle cx="9" cy="3" r="1.5" />
        <circle cx="3" cy="8" r="1.5" />
        <circle cx="9" cy="8" r="1.5" />
        <circle cx="3" cy="13" r="1.5" />
        <circle cx="9" cy="13" r="1.5" />
      </svg>
    </div>
  )
}

function ExperienceEntry({
  entry,
  index,
  onUpdate,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  isDraggingOver,
}: {
  entry: ResumeExperience
  index: number
  onUpdate: (data: Partial<Omit<ResumeExperience, 'id'>>) => void
  onRemove: () => void
  onDragStart: (index: number) => void
  onDragOver: (e: React.DragEvent, index: number) => void
  onDrop: (index: number) => void
  isDraggingOver: boolean
}) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={() => onDrop(index)}
      onDragEnd={() => onDrop(-1)}
      className={`border rounded-lg p-4 space-y-3 bg-white transition-all ${
        isDraggingOver ? 'border-zinc-400 shadow-md scale-[1.01]' : 'border-zinc-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <DragHandle />
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
            Position {index + 1}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove} className="h-7 w-7 p-0 text-red-400 hover:text-red-600">✕</Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-zinc-500 mb-1 block">Job Title *</Label>
          <Input placeholder="Engineering Manager" value={entry.title} onChange={(e) => onUpdate({ title: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs text-zinc-500 mb-1 block">Company *</Label>
          <Input placeholder="Acme Corp" value={entry.company} onChange={(e) => onUpdate({ company: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs text-zinc-500 mb-1 block">Start Date</Label>
          <Input placeholder="Jan 2022" value={entry.startDate} onChange={(e) => onUpdate({ startDate: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs text-zinc-500 mb-1 block">End Date</Label>
          <div className="space-y-1">
            <Input
              placeholder="Present"
              value={entry.current ? 'Present' : entry.endDate}
              disabled={entry.current}
              onChange={(e) => onUpdate({ endDate: e.target.value })}
            />
            <label className="flex items-center gap-1.5 text-xs text-zinc-500 cursor-pointer">
              <input
                type="checkbox"
                checked={entry.current}
                onChange={(e) => onUpdate({ current: e.target.checked, endDate: '' })}
                className="rounded"
              />
              Currently working here
            </label>
          </div>
        </div>
      </div>

      <div>
        <Label className="text-xs text-zinc-500 mb-1 block">Description</Label>
        <RichTextEditor
          value={entry.description}
          onChange={(html) => onUpdate({ description: html })}
          placeholder="Describe your role, responsibilities, and key achievements..."
        />
      </div>
    </div>
  )
}

export function ExperienceForm() {
  const experience = useResumeStore((s) => s.experience)
  const addExperience = useResumeStore((s) => s.addExperience)
  const updateExperience = useResumeStore((s) => s.updateExperience)
  const removeExperience = useResumeStore((s) => s.removeExperience)
  const reorderExperience = useResumeStore((s) => s.reorderExperience)

  const dragFrom = useRef<number>(-1)
  const [dragOverIndex, setDragOverIndex] = useState<number>(-1)

  function handleDragStart(index: number) {
    dragFrom.current = index
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    setDragOverIndex(index)
  }

  function handleDrop(index: number) {
    if (index >= 0 && dragFrom.current >= 0 && dragFrom.current !== index) {
      reorderExperience(dragFrom.current, index)
    }
    dragFrom.current = -1
    setDragOverIndex(-1)
  }

  return (
    <div className="space-y-3">
      {experience.map((entry, i) => (
        <ExperienceEntry
          key={entry.id}
          entry={entry}
          index={i}
          onUpdate={(data) => updateExperience(entry.id, data)}
          onRemove={() => removeExperience(entry.id)}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          isDraggingOver={dragOverIndex === i && dragFrom.current !== i}
        />
      ))}
      <Button variant="outline" className="w-full" onClick={addExperience}>
        + Add Work Experience
      </Button>
    </div>
  )
}
