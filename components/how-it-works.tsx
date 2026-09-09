import { Upload, Cpu, FileCheck } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Sube la foto',
    description: 'Captura o selecciona una imagen clara de la lesión cutánea del paciente.',
  },
  {
    icon: Cpu,
    title: 'La IA analiza',
    description: 'El modelo procesa la imagen en el dispositivo y genera un mapa de calor explicativo.',
  },
  {
    icon: FileCheck,
    title: 'Recibe el diagnóstico',
    description: 'Obtén el diagnóstico probable con su nivel de confianza y recomendaciones clínicas.',
  },
]

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="space-y-6">
      <h2 id="how-title" className="text-center text-2xl font-bold text-foreground">
        ¿Cómo funciona?
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex size-11 items-center justify-center rounded-lg bg-accent text-primary">
              <step.icon className="size-5" aria-hidden="true" />
            </div>
            <p className="mt-4 flex items-center gap-2 font-semibold text-foreground">
              <span className="text-sm text-muted-foreground">{i + 1}.</span>
              {step.title}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
