import { Stethoscope } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-8 text-center">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <Stethoscope className="size-4 text-primary" aria-hidden="true" />
          DermaIA
        </div>
        <p className="text-sm text-muted-foreground">
          Herramienta de apoyo diagnóstico para médicos generales
        </p>
        <p className="text-xs text-muted-foreground">
          Desarrollado como proyecto de tesis universitaria. Solo para uso académico.
        </p>
      </div>
    </footer>
  )
}
