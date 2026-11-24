# Guía del Proyecto: Plataforma Interactiva de Invitaciones y Gestión de Eventos

## 🎯 Resumen y Objetivo del Proyecto
Plataforma SaaS y Marketplace B2B2C de gestión integral de eventos sociales e invitaciones digitales interactivas, conectando **dueños de salones/proveedores** con **anfitriones e invitados** (con enfoque de red social privada por evento).

El sistema cubre todo el ciclo de vida del evento:
1. **Reservas y Marketplace de Servicios:** Agendar salones con anticipación, consultar disponibilidad y contratar servicios adicionales (*add-ons*) como renta de loza/cristalería, shows/grupos musicales, inflables, pirotecnia o banquetería, con cotización y logística conectadas.
2. **Estudio de Invitaciones Digitales (Estilo Canva):** Editor visual por componentes preconfigurados con animaciones e interactividad, accesible mediante **URL única por invitación** (`/{slug-o-id}`) y exportable a **PDF interactivo** con enlaces clicables (ubicación en mapas y confirmación/RSVP) listo para compartir en redes sociales o WhatsApp.
3. **Generación Asistida por Claude API (Prompt-to-JSON):** Permite que el usuario describa en lenguaje natural el estilo, tono, colores y bloques de su invitación para que Claude API genere una configuración JSON validada que el editor renderiza y permite ajustar (evitando ejecución de código arbitrario o XSS).
4. **RSVP, Control de Pases y Logística QR:** Confirmación de asistencia indicando cantidad de personas del pase asignado, generación de código QR dinámico y validación en puerta (soporte para ingresos totales o parciales, control de aforo en tiempo real y asignación de mesas).
5. **Capa Social y Descubrimiento:** Muro/galería colaborativa del evento para los asistentes validados, perfiles de salones/proveedores y descubrimiento orgánico de espacios y servicios.

El principal diferenciador es combinar esta operación logística y social con una experiencia visual fluida, interactiva y de alta calidad.

### 👥 Roles de Usuario
1. **Super-Admin:** Dueños del sistema con control total sobre la plataforma, catálogos globales, moderación, métricas y configuración de integraciones.
2. **Admin:** Dueños o administradores de salones, clubes o proveedores de servicios. Gestionan disponibilidad de espacios, catálogo de *add-ons*, eventos agendados, mesas, aforo/escaneo QR y analíticas.
3. **Usuario:** Anfitriones e invitados (público general). Los anfitriones reservan salones, contratan servicios, diseñan y publican invitaciones (manualmente o con asistencia de Claude API), descargan el PDF interactivo y monitorean confirmaciones/acceso; los invitados consultan la invitación, confirman pases (RSVP), usan su QR en acceso y participan en la dinámica social del evento.

---

## 🛠️ Stack Tecnológico Core
- **Manejador de Paquetes:** **pnpm** (Obligatorio)
- **Framework:** React + Vite
- **Lenguaje:** TypeScript (Estricto)
- **Routing:** React Router v8 (https://reactrouter.com/)
- **UI & Componentes:** Material UI (MUI) v9
- **Animaciones:** GSAP y Framer Motion (`motion`)
- **Manejo de Estado:** Context API + `useReducer` nativo de React.

---

## 🧰 Skills Integradas y Directrices de Agente
El desarrollo debe alinearse activamente con las siguientes skills y estándares de diseño/código:

- **Diseño & UI/UX:** `apple-design`, `frontend-design`, `emil-design-eng`, `ui-ux-pro-max-skill` (Next Level Builder)
- **Animación & Motion:** `animate`, `animate-expo`, `animation-vocabulary`, `find-animation-opportunities`, `improve-animations`, `review-animations`
- **Mejores Prácticas & Arquitectura:** `vercel-react-best-practices`, `vercel-react-view-transitions`, `pick-ui-library`, `prototype`, `find-skills`

---

## 🏗️ Arquitectura Modular (Por Funcionalidad) y Archivos de Barril

La organización está basada en **módulos (`features`)**, ideal para escalar el proyecto. Cada módulo contiene todo el código relacionado con su funcionalidad y debe mantener coherencia con las reservas, invitaciones, RSVP/QR, asistencia por Claude API y capa social del evento.

> **Nota sobre la estructura:** El árbol de carpetas mostrado más abajo es **solo un ejemplo ilustrativo** de cómo organizar módulos y capas; **no es obligatorio** nombrar igual los archivos, carpetas o módulos ni replicarlo al pie de la letra. Adapta los nombres y la organización real a las necesidades de cada funcionalidad, siempre que se respete el aislamiento entre módulos, **SOLID**, las buenas prácticas y el uso de archivos de barril donde correspondan.

### 📦 Uso de Archivos de Barril (`index.ts`)
Para mantener las importaciones limpias y ordenadas:
1. Los archivos de barril (`index.ts` / `index.tsx`) deben utilizarse en los componentes (y módulos/carpetas) donde se consumen, exponiendo su API pública de forma limpia.
2. Al importar componentes o piezas desde otros lugares del proyecto, hazlo a través de su archivo de barril correspondiente (ej. `import { Button } from '@/components/Button'`, `import { useEditor } from '@/features/Editor'`), evitando rutas internas profundas innecesarias.

### ⚠ Regla Fundamental de Aislamiento
**Queda estrictamente prohibido importar código directamente entre módulos (`features`).** 
Si varios módulos necesitan compartir componentes, hooks, servicios o contextos, esa pieza de código DEBE extraerse e incluirse en las carpetas compartidas globales (`src/components`, `src/hooks`, `src/services`, `src/utils`, `src/contexts`).

### Ejemplo Ilustrativo de Estructura de Carpetas (Solo Referencia):

```text
src/
├── components/            # Ejemplo de componentes compartidos globales
│   ├── Avatar/
│   │   ├── Avatar.tsx
│   │   ├── Avatar.test.ts
│   │   └── index.ts       # Archivo de barril usado al importar el componente
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.ts
│   │   └── index.ts
│   ├── TextField/
│   │   ├── TextField.tsx
│   │   ├── TextField.test.ts
│   │   └── index.ts
│   └── index.ts
├── contexts/              # Ejemplo de contextos compartidos globales
│   ├── UserContext/
│   │   ├── UserContext.tsx
│   │   └── index.ts
│   └── index.ts
├── hooks/                 # Ejemplo de hooks personalizados compartidos
│   ├── useMediaQuery/
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   └── index.ts
├── features/              # Ejemplo de módulos por funcionalidad (nombres libres)
│   ├── BookingAndCatalog/
│   │   └── index.ts
│   ├── Editor/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── views/
│   │   └── index.ts
│   ├── DashboardAdmin/
│   │   └── index.ts
│   ├── EventManagement/
│   │   └── index.ts
│   └── Home/
│       ├── components/
│       ├── utils/
│       ├── services/
│       ├── hooks/
│       ├── contexts/
│       ├── views/
│       ├── pages/
│       └── index.ts
├── utils/                 # Ejemplo de utilidades/helpers compartidos
│   ├── formatters/
│   │   ├── formatters.ts
│   │   ├── formatters.test.ts
│   │   └── index.ts
│   └── index.ts
├── services/              # Ejemplo de clientes de API / servicios compartidos
│   ├── api/
│   │   ├── api.service.ts
│   │   ├── api.test.ts
│   │   └── index.ts
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.ts