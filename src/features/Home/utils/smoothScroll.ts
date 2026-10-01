import { ScrollSmoother } from '@/utils/gsap'

export const SMOOTH_WRAPPER_ID = 'smooth-wrapper'
export const SMOOTH_CONTENT_ID = 'smooth-content'

/** Altura del encabezado fijo: las anclas se alinean debajo de él. */
export const HEADER_HEIGHT = 68

/** Desplaza a un ancla usando el smoother si está activo (si no, scroll nativo). */
export function scrollToSection(hash: string) {
  const target = document.querySelector(hash)
  if (!target) return
  const smoother = ScrollSmoother.get()
  if (smoother) smoother.scrollTo(target, true, `top ${HEADER_HEIGHT}px`)
  else target.scrollIntoView({ behavior: 'smooth' })
}
