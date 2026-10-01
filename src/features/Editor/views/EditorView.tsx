import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import { motion } from 'motion/react'
import { gsap, motionOk, SplitText, useGSAP } from '@/utils/gsap'
import { TopBar } from '@/components'
import { AmbientBackdrop, DownloadButton, InvitationShowcase, TemplateDetails, TemplatePicker } from '../components'
import { useInvitationPdf } from '../hooks'
import { templateMeta, templateOrder, type TemplateId } from '../utils'

/**
 * Galería de plantillas animadas. Al elegir una plantilla, el fondo de la
 * página se inunda de su color, la invitación voltea como carta y vuelve a
 * reproducir su entrada. Cada plantilla se descarga en PDF.
 */
export function EditorView() {
  const scope = useRef<HTMLDivElement>(null)
  // La plantilla vive en la URL (?plantilla=neon): se puede compartir un enlace directo a cada una.
  const [params, setParams] = useSearchParams()
  const requested = params.get('plantilla') as TemplateId | null
  const templateId: TemplateId = requested && templateOrder.includes(requested) ? requested : 'formal'
  const setTemplateId = (id: TemplateId) => setParams({ plantilla: id }, { replace: true, preventScrollReset: true })
  const [replayKey, setReplayKey] = useState(0)
  const { download, printStage } = useInvitationPdf()
  const meta = templateMeta[templateId]
  const dark = templateId !== 'infantil'

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        const title = SplitText.create('[data-editor-title]', { type: 'words,chars', mask: 'words' })
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from(title.chars, { yPercent: 110, rotate: 12, duration: 1, stagger: 0.02 })
          .from('[data-editor-in]', { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 0.3)
      })
    },
    { scope },
  )

  return (
    <Box
      ref={scope}
      component={motion.div}
      initial={false}
      animate={{ color: meta.stageInk }}
      transition={{ duration: 0.6 }}
      sx={{ position: 'relative', minHeight: '100svh', overflowX: 'clip' }}
    >
      <AmbientBackdrop templateId={templateId} />
      <TopBar dark={dark} />

      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 1.1fr)' },
          gridTemplateAreas: { xs: '"intro" "stage" "details"', md: '"intro stage" "details stage"' },
          gridTemplateRows: { md: 'auto 1fr' },
          columnGap: 6,
          rowGap: { xs: 4, md: 3 },
          alignItems: 'start',
        }}
      >
        <Box sx={{ gridArea: 'intro' }}>
          <Typography data-editor-title variant="h1" sx={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)', mb: 2, color: 'inherit' }}>
            Plantillas que cobran vida
          </Typography>
          <Typography data-editor-in sx={{ fontSize: { xs: '1.0625rem', md: '1.1875rem' }, opacity: 0.8, mb: 3.5, maxWidth: '30em', color: 'inherit' }}>
            Tres estilos listos para tu evento. Tócalas: confirman, reventan globos, se encienden. Cuando te guste, descárgala en PDF.
          </Typography>
          <Box data-editor-in>
            <TemplatePicker value={templateId} onChange={setTemplateId} dark={dark} />
          </Box>
        </Box>

        <Box sx={{ gridArea: 'stage', position: { md: 'sticky' }, top: { md: 88 } }}>
          <InvitationShowcase templateId={templateId} replayKey={replayKey} />
        </Box>

        <Box data-editor-in sx={{ gridArea: 'details' }}>
          <TemplateDetails templateId={templateId} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
            <DownloadButton key={templateId} onDownload={() => download(templateId)} />
            <Button
              size="large"
              variant="outlined"
              startIcon={<ReplayRoundedIcon />}
              onClick={() => setReplayKey((key) => key + 1)}
              sx={{ color: 'inherit', borderColor: 'currentColor', '&:hover': { borderColor: 'currentColor', bgcolor: 'rgba(127,127,127,0.12)' } }}
            >
              Repetir animación
            </Button>
          </Box>
        </Box>
      </Box>

      {printStage}
    </Box>
  )
}
