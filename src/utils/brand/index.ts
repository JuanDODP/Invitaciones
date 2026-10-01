/**
 * Paleta oficial "Joy & Celebration". Única fuente de color del proyecto:
 * el tema de MUI se construye a partir de aquí, y las piezas que no pasan
 * por MUI (canvas, confetti, SVG) importan estos valores directamente.
 */
export const brand = {
  coral: '#FF5E5B',
  amber: '#FFB800',
  violet: '#7928CA',
  mint: '#00D69F',
  cream: '#FCFAF6',
  white: '#FFFFFF',
  cassis: '#1E1822',
} as const

/**
 * Variantes accesibles (WCAG AA, ≥4.5:1). Los colores de marca son muy
 * luminosos: como fondo de botón con texto blanco o como texto sobre la
 * crema no llegan al contraste mínimo, así que se usan estas en su lugar.
 */
export const brandAccessible = {
  /** Fondo de botón con texto blanco (4.7:1). */
  coralButton: '#D23D3A',
  coralButtonHover: '#BF3535',
  /** Texto de color sobre `cream`. */
  coralText: '#C04A4B',
  amberText: '#936B10',
  mintText: '#0E8067',
} as const

/** Gradiente firma: coral → violeta. */
export const brandGradient = `linear-gradient(100deg, ${brand.coral} 0%, #E0457E 45%, ${brand.violet} 100%)`

/** Sombras con resplandor cálido (nunca gris frío). */
export const warmShadow = {
  sm: '0 1px 2px rgba(30, 24, 34, 0.06), 0 4px 12px -4px rgba(255, 94, 91, 0.14)',
  md: '0 2px 4px rgba(30, 24, 34, 0.05), 0 16px 40px -12px rgba(255, 94, 91, 0.24)',
  lg: '0 4px 8px rgba(30, 24, 34, 0.05), 0 32px 64px -16px rgba(255, 94, 91, 0.3), 0 16px 48px -24px rgba(121, 40, 202, 0.25)',
} as const

export const radius = {
  card: 24,
  cardLarge: 32,
  pill: 9999,
} as const

export const fontFamily = {
  display: '"Outfit Variable", "Outfit", system-ui, sans-serif',
  body: '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", system-ui, sans-serif',
} as const
