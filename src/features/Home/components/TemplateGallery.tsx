import { useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { motion } from 'motion/react'
import { brand, fontFamily, spring } from '@/utils'
import { gsap, motionOk, useGSAP } from '@/utils/gsap'
import { galleryTemplates, type InvitationTemplate } from '../utils'
import { InvitationCard } from './InvitationCard'
import { SectionHeading } from './SectionHeading'

// Dos filas con distinto orden para que no se vean idénticas al cruzarse.
const rows = [
  [...galleryTemplates.slice(0, 4), ...galleryTemplates.slice(4, 6)],
  [...galleryTemplates.slice(4), ...galleryTemplates.slice(0, 2)],
]

interface GalleryCardProps {
  template: InvitationTemplate
  /** Copia para el bucle infinito: invisible para lectores de pantalla y teclado. */
  clone?: boolean
  onOpen: (template: InvitationTemplate) => void
}

function GalleryCard({ template, clone = false, onOpen }: GalleryCardProps) {
  return (
    <Box
      component={motion.button}
      type="button"
      onClick={() => onOpen(template)}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.97 }}
      transition={spring.snappy}
      aria-hidden={clone || undefined}
      tabIndex={clone ? -1 : undefined}
      aria-label={clone ? undefined : `Vista previa: ${template.name}, ${template.category}`}
      sx={{
        flexShrink: 0,
        width: { xs: 180, md: 220 },
        p: 0,
        border: 0,
        bgcolor: 'transparent',
        borderRadius: '24px',
        cursor: 'pointer',
        textAlign: 'left',
        font: 'inherit',
        color: 'inherit',
        // Iluminación perimetral al pasar el cursor.
        '& .gallery-card': { transition: 'box-shadow 300ms' },
        '@media (hover: hover)': {
          '&:hover .gallery-card': {
            boxShadow: `0 0 0 2px ${brand.coral}, 0 28px 56px -18px ${brand.coral}, 0 12px 40px -20px ${brand.violet}`,
          },
        },
        '&:focus-visible': { outline: `2px solid ${brand.violet}`, outlineOffset: 4 },
      }}
    >
      <Box className="gallery-card" sx={{ borderRadius: '24px', boxShadow: '0 12px 32px -16px rgba(30,24,34,0.35)' }}>
        <InvitationCard template={template} aspectRatio="3 / 4" />
      </Box>
      <Box sx={{ mt: 1.5, px: 0.5 }}>
        <Box sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>{template.name}</Box>
        <Box sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>{template.category}</Box>
      </Box>
    </Box>
  )
}

export function TemplateGallery() {
  const scope = useRef<HTMLDivElement>(null)
  const [preview, setPreview] = useState<InvitationTemplate | null>(null)

  // Marquesina infinita: cada fila contiene sus tarjetas dos veces y se
  // desplaza la mitad de su ancho. Al pasar el cursor, frena hasta detenerse.
  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        gsap.utils.toArray<HTMLElement>('[data-marquee]').forEach((track, index) => {
          const reverse = index % 2 === 1
          gsap.fromTo(
            track,
            { xPercent: reverse ? -50 : 0 },
            { xPercent: reverse ? 0 : -50, duration: 48, ease: 'none', repeat: -1 },
          )
        })
      })
    },
    { scope },
  )

  // Frena/reanuda la marquesina de la fila que contiene el puntero o el foco.
  const setSpeed = contextSafe((row: HTMLElement, timeScale: number) => {
    const track = row.querySelector('[data-marquee]')
    const [tween] = track ? gsap.getTweensOf(track) : []
    if (tween) gsap.to(tween, { timeScale, duration: 0.6, ease: 'ui.out', overwrite: true })
  })

  return (
    <Box component="section" id="plantillas" aria-labelledby="plantillas-title" sx={{ py: { xs: 10, md: 16 }, overflow: 'hidden' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <SectionHeading
          id="plantillas-title"
          title="Plantillas vivas para cada celebración"
          lede="Bodas, cumpleaños, XV años y festivales. Abre cualquiera para verla de cerca y empieza desde ahí."
        />
      </Box>

      <Box ref={scope} data-reveal sx={{ display: 'grid', gap: { xs: 3, md: 4 } }}>
        {rows.map((row, index) => (
          <Box
            key={index}
            onPointerEnter={(event) => setSpeed(event.currentTarget, 0)}
            onPointerLeave={(event) => setSpeed(event.currentTarget, 1)}
            onFocus={(event) => setSpeed(event.currentTarget, 0)}
            onBlur={(event) => setSpeed(event.currentTarget, 1)}
            sx={{
              overflowX: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              // Con movimiento activo, la fila se mueve sola; sin él, se desplaza a mano.
              '@media (prefers-reduced-motion: no-preference)': { overflowX: 'visible' },
              py: 1.5,
            }}
          >
            <Box data-marquee sx={{ display: 'flex', width: 'max-content', willChange: 'transform' }}>
              {[false, true].map((clone) => (
                <Box key={String(clone)} sx={{ display: 'flex', gap: { xs: 2, md: 3 }, pr: { xs: 2, md: 3 } }}>
                  {row.map((template) => (
                    <GalleryCard key={template.id} template={template} clone={clone} onOpen={setPreview} />
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog
        open={preview !== null}
        onClose={() => setPreview(null)}
        aria-labelledby="preview-title"
        slotProps={{ paper: { sx: { width: 'min(92vw, 420px)', p: 2.5 } } }}
      >
        {preview && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Box id="preview-title" sx={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: '1.375rem' }}>
                  {preview.name}
                </Box>
                <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{preview.category}</Box>
              </Box>
              <IconButton onClick={() => setPreview(null)} aria-label="Cerrar vista previa">
                <CloseRoundedIcon />
              </IconButton>
            </Box>
            <InvitationCard template={preview} aspectRatio="4 / 5" />
            <Button component={RouterLink} to="/editor" variant="contained" size="large" fullWidth sx={{ mt: 2.5 }}>
              Usar esta plantilla
            </Button>
          </>
        )}
      </Dialog>
    </Box>
  )
}
