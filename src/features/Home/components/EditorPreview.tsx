import { useRef, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CakeRoundedIcon from '@mui/icons-material/CakeRounded'
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import LocalFloristRoundedIcon from '@mui/icons-material/LocalFloristRounded'
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded'
import { AnimatePresence, motion } from 'motion/react'
import { brand, radius, spring, warmShadow } from '@/utils'
import { templates } from '../utils'
import { InvitationCard } from './InvitationCard'
import { SectionHeading } from './SectionHeading'

type StickerKind = 'heart' | 'star' | 'party' | 'cake' | 'flower'

interface Sticker {
  id: number
  kind: StickerKind
  x: number
  y: number
}

const stickerIcons: Record<StickerKind, { icon: ReactNode; label: string }> = {
  heart: { icon: <FavoriteRoundedIcon sx={{ color: brand.coral }} />, label: 'Corazón' },
  star: { icon: <StarRoundedIcon sx={{ color: brand.amber }} />, label: 'Estrella' },
  party: { icon: <CelebrationRoundedIcon sx={{ color: brand.violet }} />, label: 'Fiesta' },
  cake: { icon: <CakeRoundedIcon sx={{ color: brand.coral }} />, label: 'Pastel' },
  flower: { icon: <LocalFloristRoundedIcon sx={{ color: brand.mint }} />, label: 'Flor' },
}
const stickerOrder: StickerKind[] = ['party', 'heart', 'star', 'cake', 'flower']
const MAX_STICKERS = 6

/** Posiciones donde aparecen los stickers nuevos (en % de la tarjeta), alrededor del título. */
const spawnPoints = [
  { x: 14, y: 22 },
  { x: 74, y: 30 },
  { x: 18, y: 62 },
  { x: 72, y: 66 },
  { x: 44, y: 12 },
  { x: 48, y: 80 },
]

function TemplateRail({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  return (
    <Box
      role="radiogroup"
      aria-label="Plantillas"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        gap: 1,
        overflowX: { xs: 'auto', md: 'visible' },
        pb: { xs: 1, md: 0 },
        scrollSnapType: 'x mandatory',
      }}
    >
      {templates.map((template) => {
        const selected = template.id === selectedId
        return (
          <Box
            key={template.id}
            component="button"
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(template.id)}
            sx={{
              position: 'relative',
              flexShrink: 0,
              scrollSnapAlign: 'start',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.25,
              pr: 2,
              border: 0,
              borderRadius: '18px',
              bgcolor: 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              font: 'inherit',
              color: 'text.primary',
              '&:focus-visible': { outline: `2px solid ${brand.violet}`, outlineOffset: 2 },
            }}
          >
            {selected && (
              <Box
                component={motion.span}
                layoutId="template-selection"
                transition={spring.snappy}
                sx={{ position: 'absolute', inset: 0, borderRadius: '18px', bgcolor: brand.white, boxShadow: warmShadow.sm }}
              />
            )}
            <Box
              sx={{
                position: 'relative',
                width: 40,
                height: 40,
                borderRadius: '12px',
                bgcolor: template.colors.background,
                boxShadow: `inset 0 0 0 1px rgba(30,24,34,0.08)`,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: template.colors.accent }} />
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{ fontWeight: 700, fontSize: '0.9375rem', whiteSpace: 'nowrap' }}>{template.name}</Box>
              <Box sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>{template.category}</Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export function EditorPreview() {
  const [templateId, setTemplateId] = useState(templates[1].id)
  const [stickers, setStickers] = useState<Sticker[]>([
    { id: 1, kind: 'party', ...spawnPoints[0] },
    { id: 2, kind: 'star', ...spawnPoints[3] },
  ])
  const [music, setMusic] = useState(true)
  const [map, setMap] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const template = templates.find((item) => item.id === templateId) ?? templates[0]

  const addSticker = () => {
    setStickers((current) => {
      const id = Math.max(0, ...current.map((sticker) => sticker.id)) + 1
      const kind = stickerOrder[id % stickerOrder.length]
      const spot = spawnPoints[id % spawnPoints.length]
      // Al llegar al máximo, el sticker más antiguo deja su lugar.
      return [...current, { id, kind, ...spot }].slice(-MAX_STICKERS)
    })
  }

  const tools = [
    { label: 'Agregar sticker', icon: <EmojiEmotionsRoundedIcon />, onClick: addSticker, pressed: undefined },
    { label: music ? 'Quitar música' : 'Agregar música de fondo', icon: <MusicNoteRoundedIcon />, onClick: () => setMusic((v) => !v), pressed: music },
    { label: map ? 'Quitar mapa' : 'Agregar mapa del lugar', icon: <PlaceRoundedIcon />, onClick: () => setMap((v) => !v), pressed: map },
  ]

  return (
    <Box component="section" id="creador" aria-labelledby="creador-title" sx={{ py: { xs: 10, md: 16 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1136, mx: 'auto' }}>
        <SectionHeading
          id="creador-title"
          title="Diseña como en un lienzo, aunque nunca hayas diseñado"
          lede="Elige una plantilla y hazla tuya: colores, letras, stickers, la canción de la fiesta y el mapa para llegar. Todo cambia al instante. Pruébalo aquí mismo."
        />

        <Box
          data-reveal
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '240px minmax(0, 1fr)' },
            gap: { xs: 2, md: 3 },
            p: { xs: 1.5, md: 2 },
            borderRadius: `${radius.cardLarge}px`,
            bgcolor: 'rgba(30,24,34,0.035)',
          }}
        >
          <Box sx={{ p: { md: 1 } }}>
            <TemplateRail selectedId={templateId} onSelect={setTemplateId} />
          </Box>

          <Box
            sx={{
              position: 'relative',
              borderRadius: `${radius.card}px`,
              bgcolor: brand.white,
              boxShadow: warmShadow.sm,
              backgroundImage: 'radial-gradient(rgba(30,24,34,0.09) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
              display: 'grid',
              placeItems: 'center',
              py: { xs: 10, md: 11 },
              px: 2,
              overflow: 'hidden',
            }}
          >
            {/* Barra de herramientas flotante */}
            <Box
              role="toolbar"
              aria-label="Herramientas del editor"
              sx={{
                position: 'absolute',
                top: 20,
                left: '50%',
                translate: '-50% 0',
                display: 'flex',
                gap: 0.5,
                p: 0.75,
                borderRadius: 99,
                bgcolor: brand.cassis,
                boxShadow: warmShadow.md,
                zIndex: 3,
              }}
            >
              {tools.map((tool) => (
                <Tooltip key={tool.label} title={tool.label}>
                  <IconButton
                    aria-label={tool.label}
                    aria-pressed={tool.pressed}
                    onClick={tool.onClick}
                    component={motion.button}
                    whileTap={{ scale: 0.9 }}
                    sx={{
                      color: tool.pressed ? brand.cassis : brand.white,
                      bgcolor: tool.pressed ? brand.amber : 'transparent',
                      width: 44,
                      height: 44,
                      transition: 'background-color 160ms, color 160ms',
                      '&:hover': { bgcolor: tool.pressed ? brand.amber : 'rgba(255,255,255,0.12)' },
                    }}
                  >
                    {tool.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>

            <Box ref={cardRef} sx={{ width: 'min(100%, 320px)', position: 'relative' }}>
              <InvitationCard
                template={template}
                aspectRatio="4 / 5"
                overlay={
                  <>
                    <AnimatePresence>
                      {stickers.map((sticker) => (
                        <Box
                          key={sticker.id}
                          component={motion.div}
                          drag
                          dragConstraints={cardRef}
                          dragElastic={0.15}
                          dragMomentum={false}
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1.12 }}
                          whileDrag={{ scale: 1.2, rotate: 8, cursor: 'grabbing' }}
                          transition={spring.snappy}
                          aria-label={`Sticker ${stickerIcons[sticker.kind].label}, arrastrable`}
                          role="img"
                          sx={{
                            position: 'absolute',
                            left: `${sticker.x}%`,
                            top: `${sticker.y}%`,
                            zIndex: 2,
                            width: 46,
                            height: 46,
                            borderRadius: '50%',
                            bgcolor: brand.white,
                            boxShadow: '0 6px 16px -6px rgba(30,24,34,0.4)',
                            display: 'grid',
                            placeItems: 'center',
                            cursor: 'grab',
                            touchAction: 'none',
                            '& svg': { fontSize: 26 },
                          }}
                        >
                          {stickerIcons[sticker.kind].icon}
                        </Box>
                      ))}
                    </AnimatePresence>

                    <AnimatePresence>
                      {music && (
                        <Box
                          component={motion.div}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={spring.smooth}
                          sx={{
                            position: 'absolute',
                            bottom: 14,
                            left: 14,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            pl: 1,
                            pr: 1.5,
                            py: 0.75,
                            borderRadius: 99,
                            bgcolor: 'rgba(255,255,255,0.92)',
                            color: brand.cassis,
                            fontSize: '0.8125rem',
                            fontWeight: 700,
                          }}
                        >
                          <EqualizerBars />
                          Nuestra canción
                        </Box>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {map && (
                        <Box
                          component={motion.div}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={spring.smooth}
                          sx={{
                            position: 'absolute',
                            top: 14,
                            right: 14,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            pl: 1,
                            pr: 1.5,
                            py: 0.75,
                            borderRadius: 99,
                            bgcolor: brand.cassis,
                            color: brand.white,
                            fontSize: '0.8125rem',
                            fontWeight: 700,
                          }}
                        >
                          <PlaceRoundedIcon sx={{ fontSize: 18, color: brand.coral }} />
                          Cómo llegar
                        </Box>
                      )}
                    </AnimatePresence>
                  </>
                }
              />
            </Box>

            <Box sx={{ position: 'absolute', bottom: 18, fontSize: '0.8125rem', color: 'text.secondary' }}>
              Arrastra los stickers a donde quieras
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

/** Barras de ecualizador: indican que la música está sonando. */
function EqualizerBars() {
  return (
    <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'end', gap: '2px', height: 14, width: 18 }}>
      {[0, 0.2, 0.4, 0.1].map((delay, i) => (
        <Box
          key={i}
          sx={{
            width: 3,
            height: '100%',
            borderRadius: 2,
            bgcolor: brand.coral,
            transformOrigin: 'bottom',
            animation: `home-eq 0.9s ${delay}s ease-in-out infinite alternate`,
            '@keyframes home-eq': { from: { transform: 'scaleY(0.25)' }, to: { transform: 'scaleY(1)' } },
            '@media (prefers-reduced-motion: reduce)': { animation: 'none', transform: 'scaleY(0.6)' },
          }}
        />
      ))}
    </Box>
  )
}
