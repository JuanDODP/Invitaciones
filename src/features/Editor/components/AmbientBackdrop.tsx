import Box from '@mui/material/Box'
import { AnimatePresence, motion } from 'motion/react'
import { templateMeta, type TemplateId } from '../utils'

/** Partículas de ambiente según la plantilla (polvo dorado, burbujas de colores, chispas neón). */
const particles = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 29) % 100,
  top: (i * 47) % 100,
  size: 6 + ((i * 7) % 14),
  duration: 6 + ((i * 5) % 7),
  delay: -((i * 0.9) % 6),
}))

/**
 * Fondo de la página: al cambiar de plantilla, el nuevo color "inunda" la
 * pantalla en un círculo que crece desde el centro, con partículas del
 * estilo de esa plantilla flotando.
 */
export function AmbientBackdrop({ templateId }: { templateId: TemplateId }) {
  const meta = templateMeta[templateId]
  return (
    <Box aria-hidden="true" sx={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', '@keyframes ambient-float': { '0%, 100%': { transform: 'translateY(0) scale(1)' }, '50%': { transform: 'translateY(-40px) scale(1.15)' } } }}>
      <AnimatePresence initial={false}>
        <Box
          key={templateId}
          component={motion.div}
          initial={{ clipPath: 'circle(0% at 70% 50%)' }}
          animate={{ clipPath: 'circle(150% at 70% 50%)' }}
          exit={{ opacity: 0, transition: { delay: 0.8, duration: 0.01 } }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          sx={{ position: 'absolute', inset: 0, bgcolor: meta.stageBackground }}
        >
          {particles.map((particle, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: templateId === 'formal' ? particle.size / 3 : particle.size,
                height: templateId === 'formal' ? particle.size / 3 : particle.size,
                borderRadius: templateId === 'neon' && i % 2 ? '2px' : '50%',
                bgcolor: meta.swatches[(i % (meta.swatches.length - 1)) + 1],
                opacity: templateId === 'infantil' ? 0.35 : 0.55,
                boxShadow: templateId === 'infantil' ? 'none' : `0 0 ${particle.size}px ${meta.swatches[(i % (meta.swatches.length - 1)) + 1]}`,
                animation: `ambient-float ${particle.duration}s ${particle.delay}s ease-in-out infinite`,
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
              }}
            />
          ))}
        </Box>
      </AnimatePresence>
    </Box>
  )
}
