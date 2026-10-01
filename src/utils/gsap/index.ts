import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { easing } from '@/utils/motion'

/**
 * Punto único de entrada a GSAP. Registra los plugins y expone las curvas
 * de `utils/motion` como eases con nombre, para que las timelines se sientan
 * igual que las transiciones de UI hechas con `motion`.
 *
 * Importar siempre `gsap`, `ScrollTrigger` y `useGSAP` desde aquí, no desde
 * los paquetes directamente. `useGSAP` limpia las animaciones al desmontar.
 */
gsap.registerPlugin(CustomEase, ScrollTrigger, useGSAP)

const toPath = ([x1, y1, x2, y2]: readonly [number, number, number, number]) =>
  `M0,0 C${x1},${y1} ${x2},${y2} 1,1`

CustomEase.create('ui.out', toPath(easing.out))
CustomEase.create('ui.inOut', toPath(easing.inOut))
CustomEase.create('ui.drawer', toPath(easing.drawer))

gsap.defaults({ ease: 'ui.out', duration: 0.22 })

/** Media query para `gsap.matchMedia()`: animar solo si el usuario no pidió menos movimiento. */
export const motionOk = '(prefers-reduced-motion: no-preference)'

export { gsap, CustomEase, ScrollTrigger, useGSAP }
