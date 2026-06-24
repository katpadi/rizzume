'use client'

import { useResumeStore } from '@/store/resumeStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export function CertificationsForm() {
  const certifications = useResumeStore((s) => s.certifications)
  const addCertification = useResumeStore((s) => s.addCertification)
  const updateCertification = useResumeStore((s) => s.updateCertification)
  const removeCertification = useResumeStore((s) => s.removeCertification)

  return (
    <div className="space-y-3">
      {certifications.map((cert, i) => (
        <div key={cert.id} className="border border-zinc-200 rounded-lg p-4 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
              Certification {i + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCertification(cert.id)}
              className="h-7 w-7 p-0 text-red-400 hover:text-red-600"
            >
              ✕
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-zinc-500 mb-1 block">Certification Name</Label>
              <Input
                placeholder="AWS Solutions Architect"
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-500 mb-1 block">Issuer</Label>
              <Input
                placeholder="Amazon Web Services"
                value={cert.issuer}
                onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-500 mb-1 block">Year</Label>
              <Input
                placeholder="2023"
                value={cert.year}
                onChange={(e) => updateCertification(cert.id, { year: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full" onClick={addCertification}>
        + Add Certification
      </Button>
    </div>
  )
}
