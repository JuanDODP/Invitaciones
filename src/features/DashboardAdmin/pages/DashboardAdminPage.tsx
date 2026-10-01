import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { PageTransition } from '@/components'

export default function DashboardAdminPage() {
  return (
    <PageTransition>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Panel de administración
        </Typography>
        <Typography color="text.secondary">Gestión de salones, eventos y analíticas.</Typography>
      </Container>
    </PageTransition>
  )
}
