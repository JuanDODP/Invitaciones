import type { RefObject } from 'react'
import { gsap, motionOk, ScrollTrigger, SplitText, useGSAP } from '@/utils/gsap'

/**
 * Animaciones de scroll de la landing, declarativas por atributos:
 *
 * - `data-reveal`: aparece al entrar en pantalla (opacidad + ascenso + escala).
 *   Los elementos que entran juntos se escalonan.
 * - `data-split`: título que se arma palabra por palabra, cada una saliendo
 *   de una máscara de línea (se vuelve a partir si cambia el ancho).
 * - `data-parallax="0.3"`: capa que se desplaza a otra velocidad que el scroll.
 * - `data-expand`: tarjeta que crece hasta ocupar todo el ancho (estilo Apple):
 *   empieza recortada y redondeada y se "abre" mientras entra.
 * - `data-night`: sección oscura; mientras está bajo el encabezado, éste
 *   cambia a su versión nocturna (`html[data-header-tone="night"]`).
 *
 * Con `prefers-reduced-motion`: todo estático salvo el tono del encabezado.
 */
export function useHomeAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const select = gsap.utils.selector(scope)
      const root = document.documentElement

      // El tono del encabezado no es animación: aplica siempre.
      select<HTMLElement>('[data-night]').forEach((section) => {
        // Si la sección está fijada (pin), su recorrido real es el del
        // pin-spacer que GSAP pone alrededor, no su propia altura.
        const parent = section.parentElement
        const pinned = parent?.classList.contains('pin-spacer') ? parent : null
        ScrollTrigger.create({
          trigger: pinned ?? section,
          start: 'top 68px',
          end: 'bottom 68px',
          onToggle: (self) => {
            root.dataset.headerTone = self.isActive ? 'night' : 'day'
          },
        })
      })

      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        const reveals = select<HTMLElement>('[data-reveal]')
        gsap.set(reveals, { autoAlpha: 0, y: 40, scale: 0.96 })
        ScrollTrigger.batch(reveals, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: 'expo.out',
              overwrite: true,
            }),
        })

        select<HTMLElement>('[data-split]').forEach((heading) => {
          SplitText.create(heading, {
            type: 'lines,words',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.words, {
                yPercent: 115,
                rotate: 6,
                duration: 1,
                stagger: 0.05,
                ease: 'expo.out',
                scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
              }),
          })
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

        select<HTMLElement>('[data-expand]').forEach((card) => {
          gsap.fromTo(
            card,
            { clipPath: 'inset(6% 5% 0% 5% round 56px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 0px)',
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 15%', scrub: true },
            },
          )
        })
      })

      // Las secciones fijadas (pin) se crean en los hijos; reordenar y recalcular.
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
      document.fonts?.ready.then(() => ScrollTrigger.refresh())

      return () => {
        delete root.dataset.headerTone
      }
    },
    { scope },
  )
}
