import { ViewTransition, type ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Transición de página con la View Transitions API nativa.
 *
 * Va dentro de cada página (no en el layout: los layouts persisten entre
 * navegaciones y nunca disparan enter/exit). React Router envuelve las
 * navegaciones en `startTransition`, que es lo que activa la animación.
 *
 * Navegación lateral entre secciones → cross-fade sin dirección.
 * `default="none"`: no se anima en otras transiciones (Suspense, revalidaciones).
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  )
}
