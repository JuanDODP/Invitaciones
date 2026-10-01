import { useRef } from 'react'
import Box from '@mui/material/Box'
import { brand, brandAccessible, fontFamily } from '@/utils'
import { gsap, motionOk, SplitText, useGSAP } from '@/utils/gsap'

/**
 * Manifiesto que se "enciende" palabra por palabra mientras haces scroll
 * (como en apple.com): la sección se queda fija y cada palabra pasa de
 * apagada a encendida según el avance.
 */
export function Manifesto() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        const split = SplitText.create('[data-manifesto]', { type: 'words' })
        gsap
          .timeline({
            scrollTrigger: { trigger: scope.current, start: 'top top', end: '+=140%', scrub: true, pin: true, anticipatePin: 1 },
          })
          .fromTo(split.words, { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: 'none' })
          .fromTo('[data-manifesto-sticker]', { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, stagger: 0.3, ease: 'back.out(2)' }, 0.2)
      })
    },
    { scope },
  )

  const stickers = [
    { top: '14%', left: '8%', bg: brand.amber, size: 64, shape: '50%' },
    { top: '72%', left: '84%', bg: brand.mint, size: 54, shape: '18px' },
    { top: '18%', left: '86%', bg: brand.coral, size: 40, shape: '50%' },
    { top: '78%', left: '12%', bg: brand.violet, size: 46, shape: '14px' },
  ]

  return (
    <Box
      component="section"
      ref={scope}
      aria-label="Nuestra idea"
      sx={{ position: 'relative', minHeight: '100svh', display: 'grid', placeItems: 'center', px: { xs: 2.5, md: 4 }, py: { xs: 10, md: 0 }, overflow: 'hidden' }}
    >
      {stickers.map((sticker, i) => (
        <Box
          key={i}
          data-manifesto-sticker
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: sticker.top,
            left: sticker.left,
            width: { xs: sticker.size * 0.6, md: sticker.size },
            height: { xs: sticker.size * 0.6, md: sticker.size },
            borderRadius: sticker.shape,
            bgcolor: sticker.bg,
            rotate: `${i * 17}deg`,
          }}
        />
      ))}
      <Box
        component="p"
        data-manifesto
        sx={{
          m: 0,
          maxWidth: '17em',
          textAlign: 'center',
          fontFamily: fontFamily.display,
          fontWeight: 700,
          fontSize: 'clamp(1.9rem, 5vw, 4.4rem)',
          lineHeight: 1.12,
          letterSpacing: '-0.03em',
          textWrap: 'balance',
          '& .violet': { color: brand.violet },
          '& .coral': { color: brandAccessible.coralText },
          '& .mint': { color: brandAccessible.mintText },
        }}
      >
        Una invitación no es un papel. Es la primera emoción de tu fiesta. Por eso la hacemos <span className="violet">viva</span>: se
        mueve, <span className="coral">suena</span>, responde y acompaña a cada invitado hasta <span className="mint">su mesa</span>.
      </Box>
    </Box>
  )
}
