'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export function ProjectsForm() {
  const projects = useResumeStore((s) => s.projects)
  const addProject = useResumeStore((s) => s.addProject)
  const updateProject = useResumeStore((s) => s.updateProject)
  const removeProject = useResumeStore((s) => s.removeProject)

  return (
    <div className="space-y-3">
      {projects.map((project, i) => (
        <div key={project.id} className="border border-zinc-200 rounded-lg p-4 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
              Project {i + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProject(project.id)}
              className="h-7 w-7 p-0 text-red-400 hover:text-red-600"
            >
              ✕
            </Button>
          </div>
          <div>
            <Label className="text-xs text-zinc-500 mb-1 block">Project Name</Label>
            <Input
              placeholder="rizz.me"
              value={project.name}
              onChange={(e) => updateProject(project.id, { name: e.target.value })}
            />
          </div>
          <div>
            <Label className="text-xs text-zinc-500 mb-1 block">Description</Label>
            <Textarea
              placeholder="What did you build and what technologies did you use?"
              value={project.description}
              onChange={(e) => updateProject(project.id, { description: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>
          <div>
            <Label className="text-xs text-zinc-500 mb-1 block">URL</Label>
            <Input
              placeholder="github.com/username/project"
              value={project.url}
              onChange={(e) => updateProject(project.id, { url: e.target.value })}
            />
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full" onClick={addProject}>
        + Add Project
      </Button>
    </div>
  )
}
