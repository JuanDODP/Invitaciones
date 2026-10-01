import { PageTransition } from '@/components'
import { HomeView } from '../views'

export default function HomePage() {
  return (
    <PageTransition>
      <HomeView />
    </PageTransition>
  )
}
