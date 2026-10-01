/**
 * API pública del módulo Home.
 * Solo lo exportado aquí puede usarse fuera del módulo (App/router).
 * Otros módulos de `features/` NO deben importar de aquí.
 */

// Import dinámico al archivo de la página (no al barril `./pages`) para que
// cada página quede en su propio chunk aunque el módulo crezca.
export const loadHomePage = () => import('./pages/HomePage')
