import type { RefObject } from 'react'
import { gsap, motionOk, ScrollTrigger, useGSAP } from '@/utils/gsap'

/**
 * Animaciones de scroll de la landing, declarativas por atributos:
 *
 * - `data-reveal`: aparece al entrar en pantalla (opacidad + leve ascenso y
 *   escala). Los elementos que entran juntos se escalonan.
 * - `data-parallax="0.3"`: capa decorativa que se desplaza más lento/rápido
 *   que el scroll (el número es la intensidad; negativo invierte).
 *
 * Solo se activan sin `prefers-reduced-motion`: con él, todo se ve estático.
 * `useGSAP` revierte animaciones y ScrollTriggers al desmontar.
 */
export function useHomeAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        const select = gsap.utils.selector(scope)

        const reveals = select<HTMLElement>('[data-reveal]')
        gsap.set(reveals, { autoAlpha: 0, y: 32, scale: 0.97 })
        ScrollTrigger.batch(reveals, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: 'ui.out',
              overwrite: true,
            }),
        })

        select<HTMLElement>('[data-parallax]').forEach((layer) => {
          const intensity = Number(layer.dataset.parallax) || 0.2
          gsap.to(layer, {
            yPercent: -100 * intensity,
            ease: 'none',
            scrollTrigger: {
              trigger: layer.closest('section') ?? layer,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      })
    },
    { scope },
  )
}
