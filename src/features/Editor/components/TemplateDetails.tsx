import Box from '@mui/material/Box'
import { AnimatePresence, motion } from 'motion/react'
import { templateMeta, type TemplateId } from '../utils'

/** Ficha de la plantilla: descripción, paleta (los colores "saltan") y tipografías. */
export function TemplateDetails({ templateId }: { templateId: TemplateId }) {
  const meta = templateMeta[templateId]
  return (
    <Box sx={{ position: 'relative', minHeight: 170 }}>
      <AnimatePresence mode="wait" initial={false}>
        <Box
          key={templateId}
          component={motion.div}
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          <Box sx={{ lineHeight: 1.6, opacity: 0.85, mb: 2.5, maxWidth: '34em' }}>{meta.description}</Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {meta.swatches.map((color, i) => (
              <Box
                key={color}
                component={motion.span}
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.1 + i * 0.06 }}
                title={color}
                sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: color, boxShadow: 'inset 0 0 0 1px rgba(127,127,127,0.35)' }}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {meta.fonts.map((font) => (
              <Box key={font} component="span" sx={{ fontSize: '0.8125rem', fontWeight: 600, px: 1.5, py: 0.5, borderRadius: 99, boxShadow: 'inset 0 0 0 1px currentColor', opacity: 0.75 }}>
                {font}
              </Box>
            ))}
          </Box>
        </Box>
      </AnimatePresence>
    </Box>
  )
}
