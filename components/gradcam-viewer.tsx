'use client'

import { useState } from 'react'
import { Flame } from 'lucide-react'

interface GradcamViewerProps {
  imageUrl: string
}

export function GradcamViewer({ imageUrl }: GradcamViewerProps) {
  const [showHeatmap, setShowHeatmap] = useState(true)

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
        <img
          src={imageUrl || '/placeholder.svg'}
          alt="Lesión cutánea analizada"
          className="aspect-square w-full object-cover"
        />
        {showHeatmap && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{
              background:
                'radial-gradient(circle at 52% 46%, rgba(220,38,38,0.75) 0%, rgba(234,88,12,0.6) 22%, rgba(250,204,21,0.45) 40%, rgba(250,204,21,0) 62%)',
            }}
          />
        )}
        <span className="absolute left-3 top-3 rounded-md bg-foreground/80 px-2 py-1 text-xs font-medium text-background">
          Grad-CAM
        </span>
      </div>

      <button
        type="button"
        onClick={() => setShowHeatmap((v) => !v)}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <Flame className="size-4" aria-hidden="true" />
        {showHeatmap ? 'Ocultar mapa de calor' : 'Mostrar mapa de calor'}
      </button>
      <p className="text-xs text-muted-foreground">
        El mapa de calor resalta las regiones que más influyeron en la predicción del modelo.
      </p>
    </div>
  )
}
