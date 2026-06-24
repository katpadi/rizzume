'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function PersonalInfoForm() {
  const personal = useResumeStore((s) => s.personal)
  const updatePersonal = useResumeStore((s) => s.updatePersonal)

  const fields: { key: keyof typeof personal; label: string; placeholder: string; type?: string }[] = [
    { key: 'name', label: 'Full Name', placeholder: 'Jane Doe' },
    { key: 'email', label: 'Email', placeholder: 'jane@example.com', type: 'email' },
    { key: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000', type: 'tel' },
    { key: 'location', label: 'Location', placeholder: 'San Francisco, CA' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/janedoe' },
    { key: 'website', label: 'Website', placeholder: 'janedoe.com' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map(({ key, label, placeholder, type }) => (
        <div key={key} className={key === 'name' ? 'col-span-2' : ''}>
          <Label htmlFor={key} className="text-xs font-medium text-zinc-500 mb-1 block">
            {label}
          </Label>
          <Input
            id={key}
            type={type ?? 'text'}
            placeholder={placeholder}
            value={personal[key]}
            onChange={(e) => updatePersonal({ [key]: e.target.value })}
          />
        </div>
      ))}
    </div>
  )
}
