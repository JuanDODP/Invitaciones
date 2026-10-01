import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { PageTransition } from '@/components'

export default function EditorPage() {
  return (
    <PageTransition>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Editor
        </Typography>
        <Typography color="text.secondary">Creador de invitaciones.</Typography>
      </Container>
    </PageTransition>
  )
}
