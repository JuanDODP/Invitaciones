export type TemplateId = 'formal' | 'infantil' | 'neon'

export interface TemplateMeta {
  id: TemplateId
  name: string
  occasion: string
  description: string
  /** Fondo de la página mientras esta plantilla está en escena. */
  stageBackground: string
  /** El texto de la página sobre ese fondo. */
  stageInk: string
  /** Halo detrás de la invitación. */
  glow: string
  swatches: string[]
  fonts: string[]
  /** Colores del confeti de esta plantilla. */
  confetti: string[]
  fileName: string
}

export const templateMeta: Record<TemplateId, TemplateMeta> = {
  formal: {
    id: 'formal',
    name: 'Gala blanco y negro',
    occasion: 'Bodas y eventos formales',
    description: 'Marco art déco que se dibuja solo, monograma, nombres que aparecen con trazo de pluma y una cuenta regresiva en vivo.',
    stageBackground: '#121214',
    stageInk: '#F5F1E8',
    glow: 'rgba(200,169,106,0.45)',
    swatches: ['#0E0E10', '#F5F1E8', '#C8A96A', '#8C8A85'],
    fonts: ['Cormorant Garamond', 'Great Vibes'],
    confetti: ['#C8A96A', '#F5F1E8', '#E9D8B4', '#FFFFFF'],
    fileName: 'invitacion-boda-valeria-y-santiago.pdf',
  },
  infantil: {
    id: 'infantil',
    name: 'Fiesta arcoíris',
    occasion: 'Cumpleaños infantiles',
    description: 'Cielo con nubes, arcoíris, un dinosaurio que saluda y globos que puedes reventar. Todo rebota.',
    stageBackground: '#E6F6FF',
    stageInk: '#1E1822',
    glow: 'rgba(255,210,63,0.6)',
    swatches: ['#6EC6FF', '#FFD23F', '#FF6B6B', '#3DDC97', '#9B5DE5'],
    fonts: ['Fredoka'],
    confetti: ['#FFD23F', '#FF6B6B', '#3DDC97', '#9B5DE5', '#6EC6FF'],
    fileName: 'invitacion-cumple-2-mateo.pdf',
  },
  neon: {
    id: 'neon',
    name: 'Noche neón',
    occasion: 'Fiestas y cumpleaños adultos',
    description: 'Letreros de neón que parpadean, piso retro en movimiento, láseres, bola disco y un ecualizador al ritmo.',
    stageBackground: '#0B0418',
    stageInk: '#FFFFFF',
    glow: 'rgba(255,46,151,0.55)',
    swatches: ['#0A0418', '#FF2E97', '#00F0FF', '#C6FF00', '#9D4EDD'],
    fonts: ['Monoton', 'Great Vibes', 'Outfit'],
    confetti: ['#FF2E97', '#00F0FF', '#C6FF00', '#FFE600', '#9D4EDD'],
    fileName: 'invitacion-cumple-20-silva.pdf',
  },
}

export const templateOrder: TemplateId[] = ['formal', 'infantil', 'neon']
