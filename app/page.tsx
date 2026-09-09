'use client'

import { useState } from 'react'
import { Stethoscope, WifiOff, Zap, Loader2 } from 'lucide-react'
import {
  analyzeLesion,
  exampleCases,
  ANALYSIS_DURATION_MS,
  type CaseId,
  type Diagnosis,
} from '@/lib/mock-analysis'
import { UploadZone } from '@/components/upload-zone'
import { ResultCard } from '@/components/result-card'
import { HowItWorks } from '@/components/how-it-works'
import { Footer } from '@/components/footer'

export default function Page() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{ image: string; diagnosis: Diagnosis } | null>(null)
  const [pendingCaseId, setPendingCaseId] = useState<CaseId | undefined>(undefined)

  function runAnalysis(image: string, caseId?: CaseId) {
    setResult(null)
    setIsAnalyzing(true)
    window.setTimeout(() => {
      setResult({ image, diagnosis: analyzeLesion(caseId, image) })
      setIsAnalyzing(false)
    }, ANALYSIS_DURATION_MS)
  }

  function handleAnalyze() {
    if (!previewUrl) return
    runAnalysis(previewUrl, pendingCaseId)
  }

  function handleExample(caseId: CaseId, image: string) {
    setPendingCaseId(caseId)
    setPreviewUrl(image)
    runAnalysis(image, caseId)
    document.getElementById('analizador')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight text-foreground">DermaIA</h1>
            <p className="text-xs text-muted-foreground">
              Apoyo diagnóstico para médicos generales
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        {/* Hero */}
        <section className="rounded-2xl border border-border bg-gradient-to-br from-accent to-card p-8 text-center sm:p-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-balance text-foreground sm:text-4xl">
            Analiza lesiones cutáneas con inteligencia artificial
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Sube una fotografía de la lesión y obtén un diagnóstico probable en segundos, con mapa
            de calor explicativo. Funciona sin conexión a internet.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 text-sm font-medium text-success">
              <WifiOff className="size-4" aria-hidden="true" />
              Sin internet requerido
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
              <Zap className="size-4" aria-hidden="true" />
              Resultados en &lt; 5 segundos
            </span>
          </div>
        </section>

        {/* Analyzer */}
        <section id="analizador" className="mt-10 scroll-mt-6">
          <div className="mx-auto max-w-xl">
            <UploadZone
              previewUrl={previewUrl}
              isAnalyzing={isAnalyzing}
              onImageSelected={(url) => {
                setPendingCaseId(undefined)
                setPreviewUrl(url)
                setResult(null)
              }}
              onAnalyze={handleAnalyze}
            />
          </div>

          {/* Example cases */}
          <div className="mt-8">
            <p className="mb-3 text-center text-sm font-medium text-muted-foreground">
              O prueba con un caso de ejemplo
            </p>
            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {exampleCases.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  disabled={isAnalyzing}
                  onClick={() => handleExample(c.id, c.image)}
                  className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary hover:bg-accent disabled:opacity-60"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Loading state */}
        {isAnalyzing && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-10 text-center shadow-sm">
            <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
            <p className="text-lg font-semibold text-foreground">Analizando imagen con IA…</p>
            <p className="text-sm text-muted-foreground">Esto tarda menos de 5 segundos</p>
          </div>
        )}

        {/* Results */}
        {!isAnalyzing && result && (
          <div className="mt-10">
            <ResultCard imageUrl={result.image} diagnosis={result.diagnosis} />
          </div>
        )}

        {/* How it works */}
        <div className="mt-16">
          <HowItWorks />
        </div>
      </main>

      <Footer />
    </div>
  )
}
