'use client'

import { AlertTriangle } from 'lucide-react'
import type { Diagnosis } from '@/lib/mock-analysis'
import { GradcamViewer } from '@/components/gradcam-viewer'
import { DiagnosisDetails } from '@/components/diagnosis-details'

interface ResultCardProps {
  imageUrl: string
  diagnosis: Diagnosis
}

export function ResultCard({ imageUrl, diagnosis }: ResultCardProps) {
  return (
    <section aria-label="Resultados del análisis" className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: analyzed image with heatmap */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Imagen analizada
          </h3>
          <GradcamViewer imageUrl={imageUrl} />
        </div>

        {/* Right: diagnosis */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Diagnóstico
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-foreground text-balance">{diagnosis.name}</h2>
            <span className="inline-flex items-center rounded-full bg-success px-3 py-1 text-sm font-semibold text-success-foreground">
              Confianza: {diagnosis.confidence}%
            </span>
          </div>

          <div className="mt-4">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${diagnosis.confidence}%` }}
                role="progressbar"
                aria-valuenow={diagnosis.confidence}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Nivel de confianza del diagnóstico"
              />
            </div>
          </div>

          <div className="mt-5">
            <DiagnosisDetails
              description={diagnosis.description}
              recommendations={diagnosis.recommendations}
            />
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
            <p className="text-sm text-foreground">
              Este resultado es orientativo. No reemplaza el juicio clínico del médico.
            </p>
          </div>
        </div>
      </div>

      {/* Other possibilities */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Otras posibilidades diagnósticas
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {diagnosis.alternatives.map((alt) => (
            <div
              key={alt.name}
              className="rounded-lg border border-border bg-card p-4 shadow-sm"
            >
              <p className="font-medium text-foreground">{alt.name}</p>
              <p className="mt-1 text-2xl font-bold text-primary">{alt.confidence}%</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary/60"
                  style={{ width: `${alt.confidence}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
