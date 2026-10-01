import Box from '@mui/material/Box'
import { brand } from '@/utils'

/** Generador determinista: la escena se ve igual en cada visita y en cada render. */
function seeded(seed: number) {
  let state = seed
  return () => {
    state = (state * 16807) % 2147483647
    return state / 2147483647
  }
}

const random = seeded(7)
const stars = Array.from({ length: 36 }, () => ({
  x: random() * 100,
  y: random() * 100,
  size: 2 + random() * 3,
  delay: random() * 4,
  duration: 2 + random() * 3,
}))

const balloons = [
  { x: 6, y: 58, size: 92, color: brand.coral, duration: 7, delay: 0 },
  { x: 16, y: 22, size: 64, color: brand.amber, duration: 6, delay: 1.2 },
  { x: 82, y: 16, size: 78, color: '#9B5DE0', duration: 8, delay: 0.4 },
  { x: 90, y: 54, size: 100, color: brand.mint, duration: 7.5, delay: 2 },
  { x: 72, y: 80, size: 60, color: '#FF8FA3', duration: 6.5, delay: 0.8 },
  { x: 32, y: 84, size: 54, color: brand.violet, duration: 7, delay: 1.6 },
  { x: 40, y: 46, size: 70, color: brand.amber, duration: 6.8, delay: 0.3 },
  { x: 60, y: 52, size: 58, color: brand.coral, duration: 7.4, delay: 1.1 },
]

const confetti = Array.from({ length: 22 }, (_, i) => ({
  x: random() * 100,
  y: random() * 100,
  w: 10 + random() * 14,
  h: 5 + random() * 6,
  rotate: random() * 360,
  color: [brand.coral, brand.amber, brand.mint, '#FF8FA3', '#9B5DE0'][i % 5],
  round: i % 3 === 0,
  duration: 4 + random() * 4,
  delay: random() * 3,
  blur: i % 7 === 0,
}))

function Balloon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.9} viewBox="0 0 50 95" aria-hidden="true">
      <defs>
        <radialGradient id={`shine-${color.slice(1)}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="35%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </radialGradient>
      </defs>
      <path d="M25 58 C 22 66, 30 72, 25 80 S 22 90, 26 95" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
      <ellipse cx="25" cy="28" rx="22" ry="27" fill={`url(#shine-${color.slice(1)})`} />
      <path d="M21 54 L29 54 L25 60 Z" fill={color} />
    </svg>
  )
}

/**
 * Escena nocturna de fiesta en capas con profundidad (`data-depth`):
 * estrellas al fondo, globos en medio y confeti al frente. Cada capa se
 * mueve distinto con el puntero y con el scroll (lo orquesta HeroSection).
 * Las animaciones en reposo (flotar, titilar, haces de luz) son CSS puro.
 */
export function PartyScene() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        bgcolor: brand.cassis,
        // Centro luminoso (se ve a través de las letras de la intro) y halos de color en los bordes.
        backgroundImage: `
          radial-gradient(ellipse 60% 45% at 50% 50%, rgba(155,93,224,0.95), transparent 75%),
          radial-gradient(ellipse 35% 35% at 22% 58%, rgba(255,94,91,0.8), transparent 70%),
          radial-gradient(ellipse 30% 30% at 78% 42%, rgba(255,184,0,0.55), transparent 70%),
          radial-gradient(ellipse 70% 55% at 50% 0%, rgba(121,40,202,0.85), transparent 70%),
          radial-gradient(ellipse 45% 40% at 100% 90%, rgba(0,214,159,0.35), transparent 70%)`,
        '@keyframes scene-twinkle': { '0%, 100%': { opacity: 0.2 }, '50%': { opacity: 1 } },
        '@keyframes scene-bob': {
          '0%, 100%': { transform: 'translateY(0) rotate(-4deg)' },
          '50%': { transform: 'translateY(-22px) rotate(4deg)' },
        },
        '@keyframes scene-drift': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(var(--r))' },
          '50%': { transform: 'translate(10px, -16px) rotate(calc(var(--r) + 140deg))' },
        },
        '@keyframes scene-beam': { '0%, 100%': { transform: 'rotate(-18deg)' }, '50%': { transform: 'rotate(18deg)' } },
        '@keyframes scene-spin': { to: { transform: 'rotate(360deg)' } },
        '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } },
      }}
    >
      {/* Rayos de sol girando muy lento */}
      <Box sx={{ position: 'absolute', left: '50%', top: '45%', width: '220vmax', height: '220vmax', ml: '-110vmax', mt: '-110vmax', animation: 'scene-spin 90s linear infinite', opacity: 0.1 }}>
        <svg viewBox="-100 -100 200 200" width="100%" height="100%">
          {Array.from({ length: 28 }, (_, i) => (
            <path key={i} d="M0 0 L-3 -100 L3 -100 Z" fill={brand.amber} transform={`rotate(${(i / 28) * 360})`} />
          ))}
        </svg>
      </Box>

      {/* Haces de luz de escenario */}
      {[
        { left: '12%', color: 'rgba(255,184,0,0.22)', duration: 7, delay: 0 },
        { left: '88%', color: 'rgba(255,94,91,0.22)', duration: 8, delay: 1.5 },
        { left: '50%', color: 'rgba(0,214,159,0.14)', duration: 9, delay: 0.8 },
      ].map((beam) => (
        <Box
          key={beam.left}
          sx={{
            position: 'absolute',
            top: '-10%',
            left: beam.left,
            width: '40vmax',
            height: '130%',
            ml: '-20vmax',
            transformOrigin: '50% 0%',
            background: `conic-gradient(from 168deg at 50% 0%, transparent 0deg, ${beam.color} 12deg, transparent 24deg)`,
            mixBlendMode: 'screen',
            animation: `scene-beam ${beam.duration}s ${beam.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      <Box data-depth="0.15" sx={{ position: 'absolute', inset: '-5%' }}>
        {stars.map((star, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              bgcolor: i % 4 === 0 ? brand.amber : brand.white,
              boxShadow: `0 0 ${star.size * 3}px ${i % 4 === 0 ? brand.amber : 'rgba(255,255,255,0.8)'}`,
              animation: `scene-twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </Box>

      <Box data-depth="0.45" sx={{ position: 'absolute', inset: '-5%' }}>
        {balloons.map((balloon, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: `${balloon.x}%`,
              top: `${balloon.y}%`,
              translate: '-50% -50%',
              scale: { xs: '0.6', md: '1' },
              animation: `scene-bob ${balloon.duration}s ${balloon.delay}s ease-in-out infinite`,
              filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.35))',
            }}
          >
            <Balloon color={balloon.color} size={balloon.size} />
          </Box>
        ))}
      </Box>

      <Box data-depth="1" sx={{ position: 'absolute', inset: '-8%' }}>
        {confetti.map((piece, i) => (
          <Box
            key={i}
            style={{ ['--r' as string]: `${piece.rotate}deg` }}
            sx={{
              position: 'absolute',
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              width: piece.round ? piece.h * 1.6 : piece.w,
              height: piece.round ? piece.h * 1.6 : piece.h,
              borderRadius: piece.round ? '50%' : '3px',
              bgcolor: piece.color,
              filter: piece.blur ? 'blur(3px)' : 'none',
              scale: piece.blur ? '2.2' : '1',
              animation: `scene-drift ${piece.duration}s ${piece.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
