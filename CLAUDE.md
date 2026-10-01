# Guía del Proyecto: Plataforma Interactiva de Invitaciones y Gestión de Eventos

## 🎯 Resumen del Proyecto
Este proyecto es una aplicación web (estilo Canva) enfocada en la creación de invitaciones altamente personalizadas, animadas e interactivas, sumado a un robusto sistema de gestión de eventos. El principal diferenciador es la experiencia visual fluida y premium. 

Además de la creación visual, la plataforma permite la gestión logística de los eventos: control de invitados, asignación de mesas y generación/escaneo de códigos QR para el acceso.

### 👥 Roles de Usuario
1. **Super-Admin:** Dueños del sistema con control total sobre la plataforma.
2. **Admin:** Dueños o administradores de salones/clubes. Tienen acceso a un panel administrativo (Dashboard) modular para gestionar sus eventos en curso, invitados y analíticas.
3. **Usuario:** Clientes finales que pueden diseñar invitaciones y agendar eventos en los diferentes salones.

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

La organización está basada en **módulos (`features`)**, ideal para escalar el proyecto. Cada módulo contiene todo el código relacionado con su funcionalidad.

### 📦 Uso Obligatorio de Archivos de Barril (`index.ts`)
Para mantener las importaciones limpias y organizadas:
1. Toda carpeta (componentes, hooks, utils, servicios, contextos y módulos) **DEBE** incluir un archivo `index.ts` / `index.tsx` de exportación.
2. Las importaciones externas siempre deben realizarse apuntando al directorio o archivo de barril principal del módulo o carpeta compartida (ej. `import { Button } from '@/components/Button'`, `import { useEditor } from '@/features/Editor'`).

### ⚠ Regla Fundamental de Aislamiento
**Queda estrictamente prohibido importar código directamente entre módulos (`features`).** 
Si varios módulos necesitan compartir componentes, hooks, servicios o contextos, esa pieza de código DEBE extraerse e incluirse en las carpetas compartidas globales (`src/components`, `src/hooks`, `src/services`, `src/utils`, `src/contexts`).

### Estructura de Carpetas del Proyecto:

```text
src/
├── components/            # Componentes compartidos globales
│   ├── Avatar/
│   │   ├── Avatar.tsx
│   │   ├── Avatar.test.ts
│   │   └── index.ts       # Archivo de barril
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.ts
│   │   └── index.ts
│   ├── TextField/
│   │   ├── TextField.tsx
│   │   ├── TextField.test.ts
│   │   └── index.ts
│   └── index.ts           # Barril global de componentes
├── contexts/              # Contextos compartidos globales
│   ├── UserContext/
│   │   ├── UserContext.tsx
│   │   └── index.ts
│   └── index.ts
├── hooks/                 # Hooks personalizados compartidos
│   ├── useMediaQuery/
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   └── index.ts
├── features/              # 📦 MÓDULOS DE LA APLICACIÓN
│   ├── Editor/            # Creador de invitaciones estilo Canva
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── views/
│   │   └── index.ts       # Punto de entrada público del módulo Editor
│   ├── DashboardAdmin/    # Panel de control de salones
│   │   └── index.ts
│   ├── EventManagement/   # Control de invitados, mesas y escáner QR
│   │   └── index.ts
│   └── Home/              # Portal / Vista pública
│       ├── components/    # Componentes exclusivos del módulo
│       ├── utils/         # Utilidades exclusivas
│       ├── services/      # Servicios/API exclusivos
│       ├── hooks/         # Hooks exclusivos
│       ├── contexts/      # Contextos y reducers exclusivos
│       ├── views/         # Vistas internas
│       ├── pages/         # Páginas enlazadas a React Router
│       └── index.ts       # Punto de entrada público del módulo Home
├── utils/                 # Utilidades/Helpers compartidos
│   ├── formatters/
│   │   ├── formatters.ts
│   │   ├── formatters.test.ts
│   │   └── index.ts
│   └── index.ts
├── services/              # Clientes de API / Servicios compartidos
│   ├── api/
│   │   ├── api.service.ts
│   │   ├── api.test.ts
│   │   └── index.ts
│   └── index.ts
├── App.tsx                # Componente principal y providers
├── main.tsx               # Punto de entrada de Vite
└── index.ts               # Exposición de puntos globales si aplica
```

---

## 🧠 Manejo de Estado (Context + Reducer)
Para mantener las mejores prácticas sin librerías externas de estado:
1. Usaremos **Context API** combinado con **`useReducer`**.
2. **Separación de responsabilidades:** Evitar un único Contexto global masivo. Cada módulo complejo dentro de `features/` (ej. `Editor`, `EventManagement`, `Auth`) tendrá su propio Provider y Reducer interno.
3. Se deben exportar *Custom Hooks* (ej. `useEditorState`, `useEditorDispatch`) a través del `index.ts` del propio módulo para consumir los contextos de forma segura.

---

## ✨ Filosofía de Diseño y Animación (Skills)
Basado en los lineamientos de diseño e ingeniería de interfaces modernas (estilo Apple / Emil Kowalski / Vercel):

- **Animaciones Intencionales:** Nunca animar por animar. Usar `motion` para transiciones de UI reactivas (ej. layouts fluidos, drag & drop) y `GSAP` para secuencias complejas, scroll-triggers o animaciones del "Canvas" de la invitación.
- **View Transitions API:** Integrar `vercel-react-view-transitions` para transiciones nativas y ultra fluidas entre páginas e interfaces de usuario.
- **Micro-interacciones:** Cada acción (hover, click, success, error) debe tener feedback visual detallado.
- **Transiciones de Rutas:** Se hacen con `<ViewTransition>` nativo de React (componente compartido `PageTransition`, dentro de cada página), no con `AnimatePresence`. React Router v8 ya envuelve cada navegación en `startTransition`; no usar su opción `viewTransition`. Cross-fade para navegación lateral; slides direccionales (`nav-forward`/`nav-back`) solo para navegación jerárquica (lista → detalle). `motion` queda para micro-interacciones, layout y drag & drop dentro de las páginas.
- **Prototipado rápido y Pro UI/UX:** Usar MUI v9 como base sólida, personalizando el tema siguiendo la skill `ui-ux-pro-max-skill` para un acabado visual profesional, minimalista y elegante.

---

## 📝 Mejores Prácticas de Frontend a Seguir
1. **Comandos con pnpm:** Toda instalación y ejecución debe realizarse utilizando `pnpm` (ej. `pnpm install`, `pnpm dev`, `pnpm build`).
2. **Archivos de Barril Constantes:** Crear y mantener archivos `index.ts` en todas las subcarpetas del proyecto para garantizar un patrón de importación uniforme y limpio.
3. **Tipado Estricto:** Evitar el uso de `any`. Definir interfaces claras en TypeScript para el estado del Reducer, los Payloads de las acciones y las Props de los componentes.
4. **Lazy Loading:** Utilizar `React.lazy` y `Suspense` en la configuración de React Router v8 para dividir el código (Code Splitting), especialmente para las páginas alojadas dentro de cada `feature/`.
5. **Componentes Puros:** Separar la lógica (Hooks/Reducers) de la presentación (UI).
6. **Accesibilidad (a11y):** Aprovechar las capacidades nativas de Material UI para mantener la plataforma accesible, incluso en entornos interactivos.