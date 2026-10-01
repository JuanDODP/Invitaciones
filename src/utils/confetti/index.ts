import { brand } from '@/utils'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  spin: number
  size: number
  color: string
  shape: 'rect' | 'circle' | 'ribbon'
  life: number
}

const defaultColors = [brand.coral, brand.amber, brand.violet, brand.mint, '#FF8FA3']
const GRAVITY = 0.32
const DRAG = 0.985
const LIFETIME = 140

/**
 * Ráfaga de confetti en un canvas temporal a pantalla completa.
 * Sin dependencias; el canvas se elimina al terminar. Respeta
 * `prefers-reduced-motion` (no se dispara). `colors` permite usar la paleta
 * de cada invitación en lugar de la de la marca.
 */
export function burstConfetti(origin: { x: number; y: number }, count = 140, colors: readonly string[] = defaultColors): void {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const canvas = document.createElement('canvas')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  canvas.setAttribute('aria-hidden', 'true')
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '2000',
  })
  document.body.appendChild(canvas)

  const context = canvas.getContext('2d')
  if (!context) {
    canvas.remove()
    return
  }
  context.scale(dpr, dpr)

  const particles: Particle[] = Array.from({ length: count }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9
    const speed = 9 + Math.random() * 11
    return {
      x: origin.x,
      y: origin.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.4,
      size: 6 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: (['rect', 'circle', 'ribbon'] as const)[Math.floor(Math.random() * 3)],
      life: LIFETIME * (0.7 + Math.random() * 0.3),
    }
  })

  let frame = 0
  const tick = () => {
    frame += 1
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)

    let alive = 0
    for (const p of particles) {
      if (frame > p.life) continue
      alive += 1
      p.vx *= DRAG
      p.vy = p.vy * DRAG + GRAVITY
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.spin

      const fade = Math.min(1, (p.life - frame) / 30)
      context.save()
      context.globalAlpha = fade
      context.translate(p.x, p.y)
      context.rotate(p.rotation)
      context.fillStyle = p.color
      if (p.shape === 'circle') {
        context.beginPath()
        context.arc(0, 0, p.size / 2.4, 0, Math.PI * 2)
        context.fill()
      } else if (p.shape === 'ribbon') {
        // El "aleteo" del listón: el ancho oscila con la rotación.
        context.fillRect(-p.size / 2, -p.size / 6, p.size * Math.abs(Math.cos(p.rotation * 2)), p.size / 3)
      } else {
        context.fillRect(-p.size / 2, -p.size / 3, p.size, p.size / 1.5)
      }
      context.restore()
    }

    if (alive > 0) requestAnimationFrame(tick)
    else canvas.remove()
  }
  requestAnimationFrame(tick)
}

/** Dispara confetti desde el centro de un elemento (p. ej. el botón pulsado). */
export function burstFromElement(element: Element, count?: number, colors?: readonly string[]): void {
  const rect = element.getBoundingClientRect()
  burstConfetti({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }, count, colors)
}
