import { brand } from '@/utils'

export type VenueKind = 'jardin' | 'hacienda' | 'salon' | 'terraza'

export interface PartnerVenue {
  id: string
  name: string
  borough: string
  kind: VenueKind
  capacity: number
  rating: number
  since: number
  quote: string
  /** Colores de la ilustración: cielo arriba y abajo, y acento. */
  palette: [string, string, string]
}

// TODO: salones FICTICIOS de ejemplo. Antes de publicar, reemplazar por
// salones reales que sean clientes y hayan autorizado aparecer aquí.
export const partnerVenues: PartnerVenue[] = [
  {
    id: 'jardin-jacarandas',
    name: 'Jardín Las Jacarandas',
    borough: 'Coyoacán',
    kind: 'jardin',
    capacity: 320,
    rating: 4.9,
    since: 2024,
    quote: 'Los invitados entraron con su QR y en veinte minutos todos estaban sentados.',
    palette: ['#2B1B4A', brand.violet, brand.amber],
  },
  {
    id: 'hacienda-arcos',
    name: 'Hacienda Los Arcos',
    borough: 'Tlalpan',
    kind: 'hacienda',
    capacity: 450,
    rating: 4.8,
    since: 2023,
    quote: 'Dejamos de imprimir listas. La puerta funciona sola.',
    palette: ['#3A1530', '#C2348F', brand.amber],
  },
  {
    id: 'salon-cristal',
    name: 'Salón Cristal',
    borough: 'Benito Juárez',
    kind: 'salon',
    capacity: 380,
    rating: 5,
    since: 2023,
    quote: 'Las parejas llegan a la cita con su invitación ya lista. Cerramos más rápido.',
    palette: ['#1E1822', '#5E1FA0', brand.mint],
  },
  {
    id: 'terraza-alameda',
    name: 'Terraza Alameda',
    borough: 'Cuauhtémoc',
    kind: 'terraza',
    capacity: 180,
    rating: 4.9,
    since: 2024,
    quote: 'El plano de mesas en vivo nos ahorra una persona en la entrada.',
    palette: ['#3B1F3F', brand.coral, brand.amber],
  },
  {
    id: 'casona-lomas',
    name: 'Casona del Bosque',
    borough: 'Miguel Hidalgo',
    kind: 'salon',
    capacity: 260,
    rating: 4.8,
    since: 2025,
    quote: 'Los XV años ahora tienen invitación animada y los papás la presumen.',
    palette: ['#24183A', brand.violet, '#FF8FA3'],
  },
  {
    id: 'jardin-canales',
    name: 'Jardín Los Canales',
    borough: 'Xochimilco',
    kind: 'jardin',
    capacity: 520,
    rating: 4.9,
    since: 2024,
    quote: 'Bodas de 500 personas sin una sola fila en la entrada.',
    palette: ['#10302A', '#0E8067', brand.amber],
  },
  {
    id: 'quinta-magnolias',
    name: 'Quinta Las Magnolias',
    borough: 'Álvaro Obregón',
    kind: 'hacienda',
    capacity: 290,
    rating: 4.7,
    since: 2025,
    quote: 'Las confirmaciones por WhatsApp cambiaron todo para nuestros clientes.',
    palette: ['#2E1A2E', '#A2309F', brand.mint],
  },
  {
    id: 'foro-colonia',
    name: 'Foro La Colonia',
    borough: 'Cuauhtémoc',
    kind: 'terraza',
    capacity: 230,
    rating: 4.9,
    since: 2024,
    quote: 'Graduaciones y festivales con acceso por QR, rapidísimo.',
    palette: ['#1E1822', brand.coral, brand.violet],
  },
  {
    id: 'hacienda-encinos',
    name: 'Hacienda Los Encinos',
    borough: 'Tlalpan',
    kind: 'hacienda',
    capacity: 400,
    rating: 4.8,
    since: 2023,
    quote: 'El panel nos dice en tiempo real cuántos invitados faltan por llegar.',
    palette: ['#33200F', '#D23D3A', brand.amber],
  },
  {
    id: 'gran-salon-paseo',
    name: 'Gran Salón Paseo',
    borough: 'Miguel Hidalgo',
    kind: 'salon',
    capacity: 600,
    rating: 4.9,
    since: 2025,
    quote: 'Eventos de gala con la logística de un concierto. Impecable.',
    palette: ['#1A1430', '#7928CA', brand.amber],
  },
]

export const partnerTotals = {
  venues: partnerVenues.length,
  rating: Math.round((partnerVenues.reduce((sum, venue) => sum + venue.rating, 0) / partnerVenues.length) * 10) / 10,
  capacity: partnerVenues.reduce((sum, venue) => sum + venue.capacity, 0),
}
