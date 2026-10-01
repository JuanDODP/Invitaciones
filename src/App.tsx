import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { AppThemeProvider, RootLayout } from '@/components'
import { loadHomePage } from '@/features/Home'
import { loadEditorPage } from '@/features/Editor'
import { loadDashboardAdminPage } from '@/features/DashboardAdmin'
import { loadEventManagementPage } from '@/features/EventManagement'

// Code splitting: cada página de un módulo vive en su propio chunk.
const HomePage = lazy(loadHomePage)
const EditorPage = lazy(loadEditorPage)
const DashboardAdminPage = lazy(loadDashboardAdminPage)
const EventManagementPage = lazy(loadEventManagementPage)

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'editor', element: <EditorPage /> },
      { path: 'dashboard', element: <DashboardAdminPage /> },
      { path: 'eventos', element: <EventManagementPage /> },
    ],
  },
])

export default function App() {
  return (
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  )
}
