import { ScrollSmoother, finePointer, gsap, useGSAP } from '@/utils/gsap'
import { SMOOTH_CONTENT_ID, SMOOTH_WRAPPER_ID } from '../utils'

/**
 * Desplazamiento suave con inercia (como en los sitios de Rockstar/Apple).
 * Solo con ratón/trackpad y sin `prefers-reduced-motion`; en táctil se
 * respeta el scroll nativo del sistema.
 *
 * Se monta como PRIMER hijo del contenido para que el smoother exista antes
 * que los ScrollTrigger de las secciones (requisito de GSAP).
 */
export function SmoothScroll() {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(finePointer, () => {
      ScrollSmoother.create({
        wrapper: `#${SMOOTH_WRAPPER_ID}`,
        content: `#${SMOOTH_CONTENT_ID}`,
        smooth: 1.1,
        smoothTouch: false,
      })
    })
  })
  return null
}
