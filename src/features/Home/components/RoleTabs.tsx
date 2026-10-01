import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import ChatRoundedIcon from '@mui/icons-material/ChatRounded'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded'
import TableRestaurantRoundedIcon from '@mui/icons-material/TableRestaurantRounded'
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded'
import MapRoundedIcon from '@mui/icons-material/MapRounded'
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { AnimatePresence, motion } from 'motion/react'
import { brand, brandAccessible, duration, easing, fontFamily, radius, spring, warmShadow } from '@/utils'
import { SectionHeading } from './SectionHeading'

interface Role {
  id: 'anfitriones' | 'salones' | 'invitados'
  tab: string
  color: string
  ink: string
  title: string
  benefits: Array<{ icon: ReactNode; title: string; text: string }>
  visual: ReactNode
}

function HostsVisual() {
  const replies = [
    { name: 'Tía Carmen', text: '¡Ahí estaremos los cuatro!' },
    { name: 'Rodrigo', text: 'Confirmo, llevo a Paula' },
    { name: 'Abuela Rosa', text: 'No me lo pierdo' },
  ]
  return (
    <Box sx={{ display: 'grid', gap: 1.25 }}>
      {replies.map((reply, i) => (
        <Box
          key={reply.name}
          component={motion.div}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring.smooth, delay: 0.08 * i + 0.1 }}
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, pr: 2, bgcolor: brand.white, borderRadius: '18px 18px 18px 6px', boxShadow: warmShadow.sm }}
        >
          <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: brand.mint, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <CheckRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Box>
            <Box sx={{ fontWeight: 700, fontSize: '0.875rem' }}>{reply.name}</Box>
            <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{reply.text}</Box>
          </Box>
        </Box>
      ))}
      <Box sx={{ mt: 1, fontWeight: 700, color: brandAccessible.coralText }}>32 de 40 invitados ya confirmaron</Box>
    </Box>
  )
}

function VenuesVisual() {
  const stats = [
    { label: 'Eventos este mes', value: '12' },
    { label: 'Check-ins hoy', value: '186' },
    { label: 'Mesas listas', value: '25/25' },
  ]
  const bars = [40, 62, 48, 80, 70, 95, 58]
  return (
    <Box sx={{ bgcolor: brand.violet, color: brand.white, borderRadius: `${radius.card}px`, p: 2.5, boxShadow: warmShadow.md }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, mb: 2.5 }}>
        {stats.map((stat) => (
          <Box key={stat.label} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '14px', p: 1.5 }}>
            <Box sx={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: '1.5rem', lineHeight: 1 }}>{stat.value}</Box>
            <Box sx={{ fontSize: '0.75rem', opacity: 0.8, mt: 0.5 }}>{stat.label}</Box>
          </Box>
        ))}
      </Box>
      <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'end', gap: 1, height: 96 }}>
        {bars.map((height, i) => (
          <Box
            key={i}
            component={motion.div}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ ...spring.smooth, delay: 0.05 * i + 0.1 }}
            sx={{ flex: 1, height: `${height}%`, borderRadius: '8px 8px 4px 4px', bgcolor: i === 5 ? brand.amber : 'rgba(255,255,255,0.28)', transformOrigin: 'bottom' }}
          />
        ))}
      </Box>
      <Box sx={{ fontSize: '0.75rem', opacity: 0.8, mt: 1 }}>Check-ins por día, última semana</Box>
    </Box>
  )
}

function GuestsVisual() {
  return (
    <Box sx={{ display: 'grid', gap: 1.5 }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.smooth, delay: 0.1 }}
        sx={{ display: 'flex', gap: 1.5, p: 1.75, bgcolor: brand.cassis, color: brand.white, borderRadius: '20px', boxShadow: warmShadow.md }}
      >
        <NotificationsActiveRoundedIcon sx={{ color: brand.amber }} />
        <Box>
          <Box sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Mañana es la boda de Ana & Leo</Box>
          <Box sx={{ fontSize: '0.8125rem', opacity: 0.75 }}>Tu pase está listo. Mesa 12, jardín norte.</Box>
        </Box>
      </Box>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.smooth, delay: 0.2 }}
        sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: brand.white, borderRadius: `${radius.card}px`, boxShadow: warmShadow.sm }}
      >
        <Box sx={{ width: 64, height: 64, borderRadius: '14px', bgcolor: brand.mint, display: 'grid', placeItems: 'center' }}>
          <QrCodeScannerRoundedIcon sx={{ fontSize: 36 }} />
        </Box>
        <Box>
          <Box sx={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: '1.125rem' }}>Pase de acceso</Box>
          <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>Muéstralo en la puerta</Box>
        </Box>
      </Box>
    </Box>
  )
}

const roles: Role[] = [
  {
    id: 'anfitriones',
    tab: 'Anfitriones',
    color: brand.coral,
    ink: brand.cassis,
    title: 'Tu invitación, tu estilo, cero estrés',
    benefits: [
      { icon: <AutoAwesomeRoundedIcon />, title: 'Diseños únicos', text: 'Plantillas animadas que personalizas en minutos.' },
      { icon: <ChatRoundedIcon />, title: 'Confirmaciones por WhatsApp', text: 'Tus invitados responden donde ya están, y tú ves la lista al día.' },
      { icon: <LinkRoundedIcon />, title: 'Enlace personalizado', text: 'Cada invitado recibe su propio enlace con su nombre.' },
    ],
    visual: <HostsVisual />,
  },
  {
    id: 'salones',
    tab: 'Salones',
    color: brand.violet,
    ink: brand.white,
    title: 'Todos tus eventos bajo control',
    benefits: [
      { icon: <DashboardRoundedIcon />, title: 'Panel de control', text: 'Eventos, invitados y estadísticas de tu salón en un solo lugar.' },
      { icon: <QrCodeScannerRoundedIcon />, title: 'Check-in con QR', text: 'Tu equipo escanea en la puerta desde cualquier teléfono.' },
      { icon: <TableRestaurantRoundedIcon />, title: 'Listas y mesas', text: 'Acomoda mesas y mueve invitados con arrastrar y soltar.' },
    ],
    visual: <VenuesVisual />,
  },
  {
    id: 'invitados',
    tab: 'Invitados',
    color: brand.mint,
    ink: brand.cassis,
    title: 'Llegar a la fiesta nunca fue tan fácil',
    benefits: [
      { icon: <ConfirmationNumberRoundedIcon />, title: 'Pase digital', text: 'Tu acceso vive en tu teléfono, sin imprimir nada.' },
      { icon: <MapRoundedIcon />, title: 'Mapa del evento', text: 'Cómo llegar y dónde está tu mesa, en un toque.' },
      { icon: <NotificationsActiveRoundedIcon />, title: 'Recordatorios automáticos', text: 'Un aviso antes del gran día con todo lo que necesitas.' },
    ],
    visual: <GuestsVisual />,
  },
]

export function RoleTabs() {
  const [[activeIndex, direction], setActive] = useState<[number, number]>([0, 0])
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const role = roles[activeIndex]

  const select = (index: number) => setActive(([current]) => [index, Math.sign(index - current)])

  // Flechas izquierda/derecha entre pestañas (patrón WAI-ARIA tabs).
  const onKeyDown = (event: KeyboardEvent) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    event.preventDefault()
    const next = (activeIndex + delta + roles.length) % roles.length
    select(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <Box component="section" id="para-quien" aria-labelledby="para-quien-title" sx={{ py: { xs: 10, md: 16 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1136, mx: 'auto' }}>
        <SectionHeading
          id="para-quien-title"
          title="Una plataforma, tres maneras de disfrutar la fiesta"
          lede="Quien organiza, quien recibe y quien llega: cada uno tiene lo que necesita."
          align="center"
        />

        <Box data-reveal sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 6 } }}>
          <Box
            role="tablist"
            aria-label="Para quién es"
            onKeyDown={onKeyDown}
            sx={{ display: 'inline-flex', p: 0.75, gap: 0.5, borderRadius: 99, bgcolor: brand.white, boxShadow: warmShadow.sm }}
          >
            {roles.map((item, index) => {
              const selected = index === activeIndex
              return (
                <Box
                  key={item.id}
                  component="button"
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${item.id}`}
                  tabIndex={selected ? 0 : -1}
                  ref={(node: HTMLButtonElement | null) => {
                    tabRefs.current[index] = node
                  }}
                  onClick={() => select(index)}
                  sx={{
                    position: 'relative',
                    border: 0,
                    bgcolor: 'transparent',
                    cursor: 'pointer',
                    font: 'inherit',
                    fontWeight: 700,
                    fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                    minHeight: 44,
                    px: { xs: 2, sm: 3 },
                    borderRadius: 99,
                    color: selected ? item.ink : 'text.secondary',
                    transition: `color ${duration.base}s`,
                    '&:focus-visible': { outline: `2px solid ${brand.violet}`, outlineOffset: 2 },
                  }}
                >
                  {selected && (
                    <Box
                      component={motion.span}
                      layoutId="role-tab-indicator"
                      transition={spring.snappy}
                      sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 99, bgcolor: item.color }}
                    />
                  )}
                  <Box component="span" sx={{ position: 'relative' }}>
                    {item.tab}
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>

        <Box sx={{ position: 'relative', overflow: 'hidden', minHeight: { md: 380 } }}>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <Box
              key={role.id}
              component={motion.div}
              role="tabpanel"
              id={`panel-${role.id}`}
              aria-labelledby={`tab-${role.id}`}
              custom={direction}
              variants={{
                enter: (dir: number) => ({ opacity: 0, x: dir * 48 }),
                center: { opacity: 1, x: 0 },
                exit: (dir: number) => ({ opacity: 0, x: dir * -48 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: duration.slow * 1.4, ease: easing.out }}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
                gap: { xs: 5, md: 8 },
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h3" sx={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', mb: 3 }}>
                  {role.title}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 2.5 }}>
                  {role.benefits.map((benefit) => (
                    <Box component="li" key={benefit.title} sx={{ display: 'flex', gap: 2 }}>
                      <Box
                        sx={{
                          flexShrink: 0,
                          width: 44,
                          height: 44,
                          borderRadius: '14px',
                          bgcolor: `${role.color}22`,
                          color: role.id === 'salones' ? brand.violet : role.id === 'invitados' ? brandAccessible.mintText : brandAccessible.coralText,
                          display: 'grid',
                          placeItems: 'center',
                        }}
                      >
                        {benefit.icon}
                      </Box>
                      <Box>
                        <Box sx={{ fontWeight: 700, mb: 0.25 }}>{benefit.title}</Box>
                        <Box sx={{ color: 'text.secondary', lineHeight: 1.55 }}>{benefit.text}</Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box sx={{ maxWidth: 440, width: '100%', mx: 'auto' }}>{role.visual}</Box>
            </Box>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  )
}
