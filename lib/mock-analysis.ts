export interface AlternativeDiagnosis {
  name: string
  confidence: number
}

export interface Diagnosis {
  id: string
  name: string
  confidence: number
  description: string
  recommendations: string[]
  alternatives: AlternativeDiagnosis[]
}

export type CaseId = 'eritematosa' | 'vesicular' | 'costrosa' | 'papular'

export interface ExampleCase {
  id: CaseId
  label: string
  image: string
}

export const exampleCases: ExampleCase[] = [
  { id: 'eritematosa', label: 'Lesión eritematosa', image: '/cases/eritematosa.png' },
  { id: 'vesicular', label: 'Lesión vesicular', image: '/cases/vesicular.png' },
  { id: 'costrosa', label: 'Lesión costrosa', image: '/cases/costrosa.png' },
  { id: 'papular', label: 'Lesión papular', image: '/cases/papular.png' },
]

const diagnoses: Record<CaseId, Diagnosis> = {
  costrosa: {
    id: 'costrosa',
    name: 'Impétigo',
    confidence: 87,
    description:
      'Infección bacteriana superficial de la piel, muy contagiosa, causada habitualmente por Staphylococcus aureus o Streptococcus pyogenes. Se caracteriza por costras de color miel (melicéricas) sobre una base eritematosa, con predilección por la zona perioral y las extremidades.',
    recommendations: [
      'Higiene local con agua y jabón, retirando suavemente las costras.',
      'Antibiótico tópico (mupirocina o ácido fusídico) en lesiones localizadas.',
      'Antibiótico oral si hay lesiones extensas o afectación sistémica.',
      'Educar sobre medidas de higiene para evitar el contagio a contactos.',
    ],
    alternatives: [
      { name: 'Tiña', confidence: 8 },
      { name: 'Celulitis', confidence: 3 },
      { name: 'Escabiosis', confidence: 2 },
    ],
  },
  eritematosa: {
    id: 'eritematosa',
    name: 'Celulitis',
    confidence: 82,
    description:
      'Infección aguda de la dermis y el tejido celular subcutáneo. Se manifiesta como una placa eritematosa, caliente, dolorosa y con bordes mal definidos, con frecuencia acompañada de edema y a veces fiebre.',
    recommendations: [
      'Marcar el borde del eritema para monitorizar la progresión.',
      'Antibioticoterapia empírica dirigida a cocos grampositivos.',
      'Elevación del miembro afectado y analgesia.',
      'Derivar de urgencia si hay signos sistémicos o sospecha de fascitis.',
    ],
    alternatives: [
      { name: 'Erisipela', confidence: 11 },
      { name: 'Dermatitis de contacto', confidence: 5 },
      { name: 'Trombosis venosa', confidence: 2 },
    ],
  },
  vesicular: {
    id: 'vesicular',
    name: 'Herpes simple',
    confidence: 79,
    description:
      'Infección viral por el virus del herpes simple que produce vesículas agrupadas sobre una base eritematosa. Suele precederse de ardor o prurito y evoluciona hacia costras en pocos días.',
    recommendations: [
      'Antiviral oral (aciclovir o valaciclovir) iniciado de forma precoz.',
      'Mantener la zona limpia y seca; evitar manipular las vesículas.',
      'Analgesia según necesidad.',
      'Advertir sobre el carácter recurrente y contagioso de la lesión.',
    ],
    alternatives: [
      { name: 'Dermatitis herpetiforme', confidence: 12 },
      { name: 'Impétigo ampolloso', confidence: 6 },
      { name: 'Quemadura', confidence: 3 },
    ],
  },
  papular: {
    id: 'papular',
    name: 'Escabiosis',
    confidence: 75,
    description:
      'Infestación cutánea por el ácaro Sarcoptes scabiei. Produce pápulas eritematosas y surcos con prurito intenso de predominio nocturno, típicamente en pliegues interdigitales, muñecas y cintura.',
    recommendations: [
      'Permetrina tópica al 5% aplicada en todo el cuerpo.',
      'Tratar simultáneamente a todos los convivientes.',
      'Lavar ropa y sábanas a alta temperatura.',
      'Antihistamínico para el control del prurito.',
    ],
    alternatives: [
      { name: 'Prurigo', confidence: 14 },
      { name: 'Dermatitis atópica', confidence: 8 },
      { name: 'Urticaria', confidence: 3 },
    ],
  },
}

const defaultOrder: CaseId[] = ['costrosa', 'eritematosa', 'vesicular', 'papular']

/**
 * Simulates an on-device AI analysis of a skin lesion.
 * When a caseId is provided the matching mock diagnosis is returned;
 * otherwise a deterministic pseudo-random one is chosen from the image name.
 */
export function analyzeLesion(caseId?: CaseId, seed?: string): Diagnosis {
  if (caseId) return diagnoses[caseId]
  const index = seed
    ? [...seed].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % defaultOrder.length
    : 0
  return diagnoses[defaultOrder[index]]
}

export const ANALYSIS_DURATION_MS = 2600
