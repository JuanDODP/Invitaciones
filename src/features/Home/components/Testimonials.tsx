import Box from '@mui/material/Box'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { brand, fontFamily, radius, warmShadow } from '@/utils'

// TODO: contenido de ejemplo. Reemplazar por testimonios reales (con permiso)
// antes de publicar la landing.
const testimonials = [
  {
    quote: 'Mandé la invitación por WhatsApp y en dos días ya tenía casi todas las confirmaciones. Nunca había sido tan fácil.',
    name: 'Mariana G.',
    role: 'Organizó su boda',
    color: brand.coral,
  },
  {
    quote: 'En la puerta escaneamos más de 300 pases sin una sola fila. El equipo ya no quiere volver a las listas impresas.',
    name: 'Salón Cristal',
    role: 'Salón de eventos',
    color: brand.violet,
  },
  {
    quote: 'Mi hija eligió la plantilla, le puso su canción y sus stickers. Sus amigas no paraban de compartirla.',
    name: 'Laura P.',
    role: 'XV años de su hija',
    color: brand.mint,
  },
]

export function Testimonials() {
  return (
    <Box component="section" aria-label="Testimonios" sx={{ pb: { xs: 10, md: 16 }, px: { xs: 2, md: 4 } }}>
      <Box
        component="ul"
        sx={{
          maxWidth: 1136,
          mx: 'auto',
          p: 0,
          my: 0,
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {testimonials.map((item) => (
          <Box
            component="li"
            key={item.name}
            data-reveal
            sx={{ bgcolor: brand.white, borderRadius: `${radius.card}px`, boxShadow: warmShadow.sm, p: 3.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <Box aria-label="5 de 5 estrellas" role="img" sx={{ display: 'flex', color: brand.amber }}>
              {Array.from({ length: 5 }, (_, i) => (
                <StarRoundedIcon key={i} fontSize="small" />
              ))}
            </Box>
            <Box component="blockquote" sx={{ m: 0, fontSize: '1.0625rem', lineHeight: 1.6, flex: 1 }}>
              “{item.quote}”
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                aria-hidden="true"
                sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: item.color, display: 'grid', placeItems: 'center', fontFamily: fontFamily.display, fontWeight: 700, color: item.color === brand.violet ? brand.white : brand.cassis }}
              >
                {item.name[0]}
              </Box>
              <Box>
                <Box sx={{ fontWeight: 700 }}>{item.name}</Box>
                <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{item.role}</Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
