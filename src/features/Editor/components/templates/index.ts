import type { ComponentType } from 'react'
import type { TemplateId } from '../../utils'
import { FormalWedding } from './FormalWedding'
import { KidsBirthday } from './KidsBirthday'
import { NeonBirthday } from './NeonBirthday'

export interface InvitationTemplateProps {
  /** Versión fija para el PDF: sin animaciones y en su estado final. */
  still?: boolean
}

/** Componente de cada plantilla, por id. */
export const invitationComponents: Record<TemplateId, ComponentType<InvitationTemplateProps>> = {
  formal: FormalWedding,
  infantil: KidsBirthday,
  neon: NeonBirthday,
}
