# Reflexión final de portfolio

## ¿Cuál fue la parte del proyecto que más me costó? ¿Cómo la resolví?

La parte que más me costó fue dejar el proyecto estable a nivel de testing y calidad. No fue solo escribir tests, sino conseguir que funcionaran de forma consistente con Next.js, Prisma, API Routes y Playwright.

El mayor reto estuvo en separar correctamente lo que debía probarse con datos reales, con mocks o con una base simulada para E2E. Lo resolví creando una estrategia por capas: utilidades con Vitest, componentes con Testing Library y MSW, API Routes con tests de integración y flujos completos con Playwright.

También fue importante revisar el proyecto con linting estricto y TypeScript, porque aparecieron problemas que no se detectan solo usando la aplicación manualmente.

## Si tuviera que rehacer el proyecto desde cero mañana, ¿qué decisión técnica cambiaría?

Configuraría desde el primer día la parte de calidad: ESLint estricto, TypeScript check, tests, coverage y CI.

Durante el proyecto primero avancé en funcionalidad y después reforcé tests y documentación. En un proyecto nuevo lo haría al revés: empezaría con una base mínima pero ya validada automáticamente, para que cada nueva funcionalidad se añadiera con más seguridad.

También definiría antes un formato común para errores de API y tipos compartidos entre frontend y backend.

## ¿Cómo explicaría la arquitectura en una entrevista técnica?

Explicaría el sistema como una aplicación full-stack de inventario construida con Next.js.

El usuario interactúa desde el navegador con las páginas de productos y categorías. Estas páginas llaman a API Routes internas de Next.js para crear, listar, filtrar, borrar y actualizar stock. Las API Routes usan Prisma como capa de acceso a datos y Prisma se conecta a una base de datos PostgreSQL gestionada en Neon.

La aplicación se despliega en Vercel, por lo que el frontend y las API Routes viven en una arquitectura serverless. Para asegurar la calidad, el proyecto incluye tests unitarios, tests de componentes, tests de integración de API y tests E2E con Playwright.

La idea principal de la arquitectura es mantener un sistema sencillo pero completo: interfaz, API, persistencia, pruebas automatizadas y documentación técnica.
