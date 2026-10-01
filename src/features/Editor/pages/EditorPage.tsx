import { PageTransition } from '@/components'
import { EditorView } from '../views'

export default function EditorPage() {
  return (
    <PageTransition>
      <EditorView />
    </PageTransition>
  )
}
