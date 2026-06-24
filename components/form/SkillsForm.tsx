'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function SkillsForm() {
  const skills = useResumeStore((s) => s.skills)
  const updateSkills = useResumeStore((s) => s.updateSkills)
  const [input, setInput] = useState('')

  function add() {
    const newItems = input
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s && !skills.items.includes(s))
    if (newItems.length === 0) return
    updateSkills({ items: [...skills.items, ...newItems] })
    setInput('')
  }

  function remove(index: number) {
    updateSkills({ items: skills.items.filter((_, i) => i !== index) })
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <Input
          placeholder="e.g. React, TypeScript, AWS..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
        />
        <Button variant="outline" size="sm" onClick={add} className="shrink-0">Add</Button>
      </div>
      {skills.items.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {skills.items.map((item, i) => (
            <Badge key={i} variant="secondary" className="gap-1 pr-1">
              {item}
              <button
                onClick={() => remove(i)}
                className="text-zinc-400 hover:text-red-500 ml-0.5"
              >
                ✕
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
