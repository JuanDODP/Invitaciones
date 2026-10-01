/**
 * Tokens de movimiento compartidos por `motion`, GSAP y el tema de MUI.
 * Una sola fuente de verdad para curvas y duraciones: si cambia aquí,
 * cambia en toda la plataforma.
 */

type CubicBezier = readonly [number, number, number, number]

/** Curvas de easing. `out` es la curva por defecto para UI (entradas y respuestas a acciones). */
export const easing = {
  /** Ease-out fuerte: arranca rápido, se asienta suave. Default para UI. */
  out: [0.23, 1, 0.32, 1],
  /** Ease-in-out: elementos que ya están en pantalla y se desplazan. */
  inOut: [0.77, 0, 0.175, 1],
  /** Drawer / sheet al estilo iOS. */
  drawer: [0.32, 0.72, 0, 1],
} as const satisfies Record<string, CubicBezier>

/** Duraciones en segundos. La UI rara vez debería superar los 300ms. */
export const duration = {
  instant: 0.1,
  fast: 0.16,
  base: 0.22,
  slow: 0.3,
} as const

/** Springs para interacciones físicas (drag, layout, gestos) — se pueden interrumpir sin saltos. */
export const spring = {
  snappy: { type: 'spring', stiffness: 500, damping: 40, mass: 1 },
  smooth: { type: 'spring', stiffness: 300, damping: 34, mass: 1 },
} as const

/** `cubic-bezier(...)` para CSS y transiciones de MUI. */
export const toCssEasing = ([x1, y1, x2, y2]: CubicBezier): string =>
  `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`

/** Milisegundos para APIs que los esperan (MUI `transitions.duration`). */
export const toMs = (seconds: number): number => Math.round(seconds * 1000)
