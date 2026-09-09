'use client'

import { useState } from 'react'
import { ChevronDown, BookOpen, ClipboardList } from 'lucide-react'

interface CollapsibleSectionProps {
  icon: React.ReactNode
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

function CollapsibleSection({ icon, title, defaultOpen = false, children }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-lg border border-border">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 font-medium text-foreground">
          <span className="text-primary">{icon}</span>
          {title}
        </span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">{children}</div>}
    </div>
  )
}

interface DiagnosisDetailsProps {
  description: string
  recommendations: string[]
}

export function DiagnosisDetails({ description, recommendations }: DiagnosisDetailsProps) {
  return (
    <div className="space-y-3">
      <CollapsibleSection
        icon={<BookOpen className="size-4" aria-hidden="true" />}
        title="¿Qué es esta lesión?"
        defaultOpen
      >
        <p className="leading-relaxed">{description}</p>
      </CollapsibleSection>

      <CollapsibleSection
        icon={<ClipboardList className="size-4" aria-hidden="true" />}
        title="Recomendaciones clínicas"
      >
        <ul className="list-disc space-y-1.5 pl-5 leading-relaxed">
          {recommendations.map((rec) => (
            <li key={rec}>{rec}</li>
          ))}
        </ul>
      </CollapsibleSection>
    </div>
  )
}
