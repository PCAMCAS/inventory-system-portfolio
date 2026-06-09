# Sistema de Inventario — Full-Stack Management Platform

> Sistema de gestión de inventario profesional para productos, categorías y control de stock, construido con Next.js, Prisma, PostgreSQL y pruebas automatizadas.

[![CI](https://github.com/PCAMCAS/inventory-system-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/PCAMCAS/inventory-system-portfolio/actions/workflows/ci.yml)

## Demo en vivo

- **Aplicación:** pendiente de despliegue final en Vercel.
- **Video demo técnica:** pendiente de añadir enlace público de Loom.
- **Cobertura Codecov:** pendiente de conectar el repositorio con Codecov.

## Descripción

Este proyecto es una plataforma full-stack de inventario creada como cierre de portfolio técnico junior.

Permite gestionar productos, categorías, precios, stock, búsqueda, filtrado por categoría y actualización de stock. El objetivo no es solo que la aplicación funcione, sino demostrar criterio técnico mediante arquitectura documentada, tests automatizados, auditoría de calidad y decisiones técnicas justificadas.

## Arquitectura

![Diagrama de arquitectura](docs/arquitectura/diagrama.png)

| Servicio | Tecnología | Despliegue |
|----------|------------|------------|
| Aplicación | Next.js 16 + React 19 | Vercel |
| API | Next.js API Routes | Vercel Serverless |
| Base de datos | PostgreSQL | Neon |
| ORM | Prisma | Aplicación Next.js |
| Tests unitarios | Vitest | Local / CI |
| Tests de componentes | Testing Library + MSW | Local / CI |
| Tests E2E | Playwright | Local / CI |
| CI | GitHub Actions | GitHub |

## Decisiones técnicas

| Decisión | Alternativas | Razón principal |
|----------|--------------|-----------------|
| Next.js App Router | Express separado, backend independiente | Permite frontend y API en un único proyecto |
| Neon PostgreSQL | SQLite, MongoDB, base local | Base relacional compatible con arquitectura serverless |
| Prisma | SQL manual, Drizzle | Tipado, migraciones y acceso a datos consistente |
| Vitest + Testing Library | Jest, tests manuales | Tests rápidos y cercanos al uso real |
| Playwright | Cypress, pruebas manuales | Validación completa de flujos críticos |

## Funcionalidades principales

- Listado de productos.
- Creación de productos.
- Búsqueda por nombre.
- Filtrado por categoría.
- Actualización de stock.
- Eliminación de productos.
- Gestión de categorías.
- Visualización de productos asociados a cada categoría.

## Testing

El proyecto usa una estrategia de testing por capas:

| Capa | Herramienta | Objetivo |
|------|-------------|----------|
| Unitarios | Vitest | Validar utilidades de producto |
| Componentes | Testing Library + MSW | Validar renderizado, errores y eventos |
| Integración | next-test-api-route-handler | Validar API Routes |
| E2E | Playwright | Validar flujos reales de usuario |

Comandos principales:

~~~bash
npm test -- --run
npm run test:coverage
npm run e2e
~~~

## Auditoría de calidad

Checklist usado antes de cerrar el proyecto:

~~~bash
npm run lint
npm run typecheck
npm run test:coverage
npm run build
npm run e2e
~~~

Estado final:

- ESLint sin errores.
- TypeScript sin errores.
- Build de producción correcto.
- Tests unitarios, integración y E2E pasando.
- Cobertura superior al 80%.
- Utilidades de producto con 100% de cobertura.
- Código auditado sin `any` explícitos.

Más detalle:

- [`docs/auditoria/deuda-tecnica.md`](docs/auditoria/deuda-tecnica.md)

## Architecture Decision Records

- [`ADR-001: Neon PostgreSQL como base de datos serverless`](docs/adr/adr-001-neon-postgresql.md)
- [`ADR-002: Next.js en Vercel para aplicación full-stack`](docs/adr/adr-002-nextjs-vercel.md)
- [`ADR-003: Estrategia de testing`](docs/adr/adr-003-testing-strategy.md)

## Documentación adicional

- [`docs/testing/estrategia.md`](docs/testing/estrategia.md)
- [`docs/testing/integracion.md`](docs/testing/integracion.md)
- [`docs/testing/e2e.md`](docs/testing/e2e.md)
- [`docs/portfolio/reflexion-final.md`](docs/portfolio/reflexion-final.md)
- [`docs/arquitectura/diagrama.png`](docs/arquitectura/diagrama.png)

## Instalación local

~~~bash
git clone https://github.com/PCAMCAS/inventory-system-portfolio.git
cd inventory-system-portfolio
npm install
~~~

Crea un archivo `.env`:

~~~env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
~~~

Prepara Prisma y la base de datos:

~~~bash
npx prisma generate
npx prisma db push
npm run seed
~~~

Arranca el proyecto:

~~~bash
npm run dev
~~~

Abre:

~~~txt
http://localhost:3000
~~~

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Arranca Next.js en desarrollo |
| `npm run build` | Genera build de producción |
| `npm run start` | Ejecuta el build |
| `npm run lint` | Ejecuta ESLint |
| `npm run lint:fix` | Aplica correcciones automáticas de ESLint |
| `npm run typecheck` | Ejecuta TypeScript sin emitir archivos |
| `npm run test` | Ejecuta Vitest |
| `npm run test:run` | Ejecuta Vitest una vez |
| `npm run test:coverage` | Ejecuta tests con cobertura |
| `npm run e2e` | Ejecuta Playwright |
| `npm run seed` | Carga datos iniciales |

## Estructura del proyecto

~~~txt
src/
  app/
    api/
    categories/
    products/
  components/
  lib/
  stores/
  test/
docs/
  adr/
  arquitectura/
  auditoria/
  portfolio/
  testing/
e2e/
prisma/
.github/
  workflows/
~~~

## Demo técnica

La demo técnica se grabará en Loom y se añadirá aquí cuando esté publicada.

Guion previsto:

1. Contexto del sistema y problema que resuelve.
2. Demo de productos, categorías, filtros y stock.
3. Explicación del diagrama de arquitectura.
4. Reto técnico encontrado y solución aplicada.
5. Revisión rápida de tests y CI.

## Autor

Pedro Campos — Prácticas Corner Studio.
