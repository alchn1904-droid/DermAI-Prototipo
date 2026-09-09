'use client'

import { useRef, useState, type DragEvent } from 'react'
import { ImagePlus, Loader2, ScanSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UploadZoneProps {
  onImageSelected: (dataUrl: string) => void
  onAnalyze: () => void
  previewUrl: string | null
  isAnalyzing: boolean
}

export function UploadZone({
  onImageSelected,
  onAnalyze,
  previewUrl,
  isAnalyzing,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  function readFile(file: File) {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => onImageSelected(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) readFile(file)
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        role="button"
        tabIndex={0}
        aria-label="Zona de carga de imagen"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex min-h-64 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? 'border-primary bg-accent'
            : 'border-border bg-muted/40 hover:border-primary/60 hover:bg-accent/60'
        }`}
      >
        {previewUrl ? (
          <img
            src={previewUrl || '/placeholder.svg'}
            alt="Vista previa de la lesión seleccionada"
            className="max-h-52 w-auto rounded-lg object-contain shadow-sm"
          />
        ) : (
          <>
            <div className="flex size-16 items-center justify-center rounded-full bg-accent text-primary">
              <ImagePlus className="size-8" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                Arrastra una foto aquí o haz clic para seleccionar
              </p>
              <p className="text-sm text-muted-foreground">Formatos aceptados: JPG, PNG</p>
            </div>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) readFile(file)
          }}
        />
      </div>

      <Button
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={!previewUrl || isAnalyzing}
        onClick={onAnalyze}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Analizando…
          </>
        ) : (
          <>
            <ScanSearch className="size-4" aria-hidden="true" />
            Analizar lesión
          </>
        )}
      </Button>
    </div>
  )
}
