import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { PageTransition, TopBar } from '@/components'

export default function DashboardAdminPage() {
  return (
    <PageTransition>
      <TopBar />
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontSize: 'clamp(1.9rem, 8vw, 3rem)', overflowWrap: 'break-word', hyphens: 'auto' }}>
          Panel de administración
        </Typography>
        <Typography color="text.secondary">Gestión de salones, eventos y analíticas.</Typography>
      </Container>
    </PageTransition>
  )
}
