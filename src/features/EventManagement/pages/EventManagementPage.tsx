import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { PageTransition } from '@/components'

export default function EventManagementPage() {
  return (
    <PageTransition>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Gestión del evento
        </Typography>
        <Typography color="text.secondary">Invitados, mesas y escáner QR.</Typography>
      </Container>
    </PageTransition>
  )
}
