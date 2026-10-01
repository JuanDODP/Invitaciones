import { useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { motion } from 'motion/react'
import { brand, fontFamily, spring } from '@/utils'
import { gsap, motionOk, useGSAP } from '@/utils/gsap'
import { galleryTemplates, type InvitationTemplate } from '../utils'
import { InvitationCard } from './InvitationCard'

interface GalleryCardProps {
  template: InvitationTemplate
  onOpen: (template: InvitationTemplate) => void
}

function GalleryCard({ template, onOpen }: GalleryCardProps) {
  return (
    <Box data-gallery-card sx={{ flexShrink: 0, width: 'clamp(210px, 23vw, 310px)', transformStyle: 'preserve-3d' }}>
      <Box
        component={motion.button}
        type="button"
        onClick={() => onOpen(template)}
        whileHover={{ y: -12, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={spring.snappy}
        aria-label={`Vista previa: ${template.name}, ${template.category}`}
        sx={{
          display: 'block',
          width: '100%',
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
              boxShadow: `0 0 0 2px ${brand.coral}, 0 30px 60px -18px ${brand.coral}, 0 14px 44px -20px ${brand.violet}`,
            },
          },
          '&:focus-visible': { outline: `2px solid ${brand.violet}`, outlineOffset: 4 },
        }}
      >
        <Box className="gallery-card" sx={{ borderRadius: '24px', boxShadow: '0 18px 40px -18px rgba(30,24,34,0.45)' }}>
          <InvitationCard template={template} aspectRatio="3 / 4" />
        </Box>
        <Box sx={{ mt: 1.5, px: 0.5 }}>
          <Box sx={{ fontWeight: 700, fontSize: '1rem' }}>{template.name}</Box>
          <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{template.category}</Box>
        </Box>
      </Box>
    </Box>
  )
}

/**
 * Galería en "carrusel de scroll": la sección se fija y el scroll vertical
 * mueve la fila de plantillas en horizontal. Cada tarjeta gira en 3D al
 * entrar y salir, y queda de frente al pasar por el centro.
 *
 * Con `prefers-reduced-motion`: fila con desplazamiento horizontal nativo.
 */
export function TemplateGallery() {
  const scope = useRef<HTMLElement>(null)
  const [preview, setPreview] = useState<InvitationTemplate | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        const track = scope.current?.querySelector<HTMLElement>('[data-gallery-track]')
        if (!track) return
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.utils.toArray<HTMLElement>('[data-gallery-card]').forEach((card) => {
          gsap
            .timeline({
              scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true },
            })
            .fromTo(card, { rotateY: -38, rotateZ: 5, z: -220, opacity: 0.4 }, { rotateY: 0, rotateZ: 0, z: 0, opacity: 1, ease: 'power2.out' })
            .to(card, { rotateY: 38, rotateZ: -5, z: -220, opacity: 0.4, ease: 'power2.in' })
        })

        gsap.fromTo('[data-gallery-progress]', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: scope.current, start: 'top top', end: () => `+=${distance()}`, scrub: true } })
      })
    },
    { scope },
  )

  return (
    <Box
      component="section"
      ref={scope}
      id="plantillas"
      aria-labelledby="plantillas-title"
      sx={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', py: { xs: 10, md: 6 } }}
    >
      <Box
        data-gallery-track
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 3, md: 5 },
          width: 'max-content',
          pl: { xs: 2, md: 'max(32px, calc((100vw - 1136px) / 2))' },
          pr: { xs: 4, md: '12vw' },
          perspective: 1400,
          '@media (prefers-reduced-motion: reduce)': { width: 'auto', overflowX: 'auto', pb: 2 },
        }}
      >
        <Box sx={{ flexShrink: 0, width: { xs: '78vw', md: 'min(460px, 36vw)' }, pr: { md: 4 } }}>
          <Typography id="plantillas-title" variant="h2" data-split sx={{ fontSize: 'clamp(2.1rem, 5vw, 4rem)', mb: 2.5 }}>
            Plantillas vivas para cada celebración
          </Typography>
          <Typography data-reveal sx={{ fontSize: { xs: '1.0625rem', md: '1.1875rem' }, color: 'text.secondary', lineHeight: 1.6 }}>
            Bodas, cumpleaños, XV años y festivales. Sigue bajando para recorrerlas y abre cualquiera para verla de cerca.
          </Typography>
        </Box>

        {galleryTemplates.map((template) => (
          <GalleryCard key={template.id} template={template} onOpen={setPreview} />
        ))}

        <Box
          sx={{
            flexShrink: 0,
            width: 'clamp(240px, 26vw, 340px)',
            aspectRatio: '3 / 4',
            borderRadius: '24px',
            border: `2px dashed rgba(121,40,202,0.4)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 2,
            p: 3,
          }}
        >
          <Box sx={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.2 }}>¿No encuentras la tuya?</Box>
          <Box sx={{ color: 'text.secondary' }}>Empieza desde cero en el editor.</Box>
          <Button component={RouterLink} to="/editor" variant="contained">
            Crear desde cero
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: { xs: 4, md: 5 }, mx: 'auto', width: 'min(1136px, calc(100% - 32px))', height: 4, borderRadius: 9, bgcolor: 'rgba(30,24,34,0.08)', overflow: 'hidden' }} aria-hidden="true">
        <Box data-gallery-progress sx={{ height: '100%', transformOrigin: 'left', background: `linear-gradient(90deg, ${brand.coral}, ${brand.violet})` }} />
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
