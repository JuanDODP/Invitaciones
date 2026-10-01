import { useEffect, type KeyboardEvent } from 'react'
import Box from '@mui/material/Box'
import { motion } from 'motion/react'
import { spring } from '@/utils'
import { templateMeta, templateOrder, type TemplateId } from '../utils'

interface TemplatePickerProps {
  value: TemplateId
  onChange: (id: TemplateId) => void
  dark: boolean
}

/** Selector de plantilla: tarjetas con muestra de color; la elegida lleva un resaltado que se desliza. */
export function TemplatePicker({ value, onChange, dark }: TemplatePickerProps) {
  // En móvil el selector se desplaza en horizontal: mantener visible la elegida.
  useEffect(() => {
    document.getElementById(`template-${value}`)?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [value])

  const onKeyDown = (event: KeyboardEvent) => {
    const delta = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    event.preventDefault()
    const index = templateOrder.indexOf(value)
    const next = templateOrder[(index + delta + templateOrder.length) % templateOrder.length]
    onChange(next)
    document.getElementById(`template-${next}`)?.focus()
  }

  return (
    <Box
      role="radiogroup"
      aria-label="Plantillas"
      onKeyDown={onKeyDown}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        gap: 1.25,
        overflowX: { xs: 'auto', md: 'visible' },
        mx: { xs: -2, md: 0 },
        px: { xs: 2, md: 0 },
        pb: { xs: 1, md: 0 },
        scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none',
      }}
    >
      {templateOrder.map((id) => {
        const meta = templateMeta[id]
        const selected = id === value
        return (
          <Box
            key={id}
            id={`template-${id}`}
            component={motion.button}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            transition={spring.snappy}
            sx={{
              position: 'relative',
              flexShrink: 0,
              scrollSnapAlign: 'start',
              display: 'flex',
              alignItems: 'center',
              gap: 1.75,
              p: 1.5,
              pr: 2.5,
              border: 0,
              borderRadius: '20px',
              bgcolor: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              textAlign: 'left',
              font: 'inherit',
              '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 2 },
            }}
          >
            {selected && (
              <Box
                component={motion.span}
                layoutId="template-picker-highlight"
                transition={spring.snappy}
                sx={{ position: 'absolute', inset: 0, borderRadius: '20px', bgcolor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.85)', boxShadow: dark ? 'inset 0 0 0 1px rgba(255,255,255,0.15)' : '0 8px 24px -12px rgba(30,24,34,0.3)' }}
              />
            )}
            <Box
              sx={{
                position: 'relative',
                width: 48,
                height: 48,
                borderRadius: '14px',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                boxShadow: 'inset 0 0 0 1px rgba(127,127,127,0.25)',
                flexShrink: 0,
              }}
            >
              {meta.swatches.slice(0, 4).map((color) => (
                <Box key={color} sx={{ bgcolor: color }} />
              ))}
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{meta.name}</Box>
              <Box sx={{ fontSize: '0.8125rem', opacity: 0.7, whiteSpace: 'nowrap' }}>{meta.occasion}</Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
