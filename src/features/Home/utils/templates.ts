import { brand } from '@/utils'

export type TemplateCategory = 'Boda' | 'Cumpleaños' | 'XV Años' | 'Festival'
export type TemplateDecor = 'rings' | 'confetti' | 'stars' | 'sunburst'

/** Tratamiento tipográfico: misma familia, distinta voz (peso, tracking, estilo). */
export interface TemplateType {
  weight: number
  tracking: string
  italic: boolean
  uppercase: boolean
}

export interface InvitationTemplate {
  id: string
  name: string
  category: TemplateCategory
  eyebrow: string
  title: string
  date: string
  place: string
  decor: TemplateDecor
  colors: {
    background: string
    ink: string
    muted: string
    accent: string
    accentInk: string
  }
  type: TemplateType
}

/** Plantillas de muestra. Todas construidas solo con la paleta oficial. */
export const templates: InvitationTemplate[] = [
  {
    id: 'boda-violeta',
    name: 'Noche violeta',
    category: 'Boda',
    eyebrow: 'Nos casamos',
    title: 'Ana & Leo',
    date: 'Sábado 14 de febrero · 19:00',
    place: 'Hacienda Los Arcos',
    decor: 'rings',
    colors: { background: brand.violet, ink: brand.white, muted: 'rgba(255,255,255,0.72)', accent: brand.amber, accentInk: brand.cassis },
    type: { weight: 300, tracking: '0.02em', italic: true, uppercase: false },
  },
  {
    id: 'cumple-coral',
    name: 'Fiesta coral',
    category: 'Cumpleaños',
    eyebrow: 'Mateo cumple',
    title: '30',
    date: 'Viernes 7 de marzo · 21:00',
    place: 'Terraza Alameda',
    decor: 'confetti',
    colors: { background: brand.coral, ink: brand.cassis, muted: 'rgba(30,24,34,0.72)', accent: brand.cassis, accentInk: brand.white },
    type: { weight: 800, tracking: '-0.04em', italic: false, uppercase: false },
  },
  {
    id: 'xv-ambar',
    name: 'Brillo dorado',
    category: 'XV Años',
    eyebrow: 'Mis XV años',
    title: 'Valentina',
    date: 'Sábado 12 de abril · 20:00',
    place: 'Salón Cristal',
    decor: 'stars',
    colors: { background: brand.cream, ink: brand.cassis, muted: 'rgba(30,24,34,0.64)', accent: brand.violet, accentInk: brand.white },
    type: { weight: 600, tracking: '0.01em', italic: false, uppercase: false },
  },
  {
    id: 'festival-menta',
    name: 'Festival menta',
    category: 'Festival',
    eyebrow: 'Primavera fest',
    title: 'Sonido Sol',
    date: '21 y 22 de marzo · 16:00',
    place: 'Parque Fundidora',
    decor: 'sunburst',
    colors: { background: brand.mint, ink: brand.cassis, muted: 'rgba(30,24,34,0.7)', accent: brand.cassis, accentInk: brand.mint },
    type: { weight: 800, tracking: '0.04em', italic: false, uppercase: true },
  },
]

/** Plantillas extra solo para la galería en movimiento (variaciones de las anteriores). */
export const galleryTemplates: InvitationTemplate[] = [
  ...templates,
  {
    ...templates[0],
    id: 'boda-crema',
    name: 'Crema clásica',
    title: 'Sofía & Diego',
    date: 'Sábado 3 de mayo · 18:30',
    place: 'Jardín Las Lomas',
    colors: { background: brand.cream, ink: brand.violet, muted: 'rgba(121,40,202,0.72)', accent: brand.coral, accentInk: brand.white },
  },
  {
    ...templates[1],
    id: 'cumple-ambar',
    name: 'Amarillo pop',
    eyebrow: 'Emma cumple',
    title: '7',
    decor: 'stars',
    colors: { background: brand.amber, ink: brand.cassis, muted: 'rgba(30,24,34,0.7)', accent: brand.violet, accentInk: brand.white },
  },
  {
    ...templates[2],
    id: 'xv-violeta',
    name: 'Gala violeta',
    title: 'Regina',
    decor: 'sunburst',
    colors: { background: brand.cassis, ink: brand.white, muted: 'rgba(255,255,255,0.7)', accent: brand.amber, accentInk: brand.cassis },
  },
  {
    ...templates[3],
    id: 'festival-coral',
    name: 'Noche de verano',
    title: 'Ritmo Norte',
    decor: 'confetti',
    colors: { background: brand.violet, ink: brand.white, muted: 'rgba(255,255,255,0.72)', accent: brand.mint, accentInk: brand.cassis },
  },
]
