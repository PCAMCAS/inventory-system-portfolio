# ADR-002: Next.js en Vercel para aplicación full-stack

## Estado

Aceptado

## Contexto

El proyecto necesita una interfaz web y endpoints para gestionar productos, categorías y stock. Para un portfolio junior interesa una arquitectura sencilla de desplegar, revisar y explicar.

## Decisión

Usar Next.js con App Router y API Routes, desplegado en Vercel.

## Consecuencias positivas

- Frontend y API viven en el mismo repositorio.
- API Routes permiten implementar endpoints sin crear un backend separado.
- Vercel simplifica el despliegue desde GitHub.
- La arquitectura es fácil de explicar en una entrevista técnica.

## Compromisos

- La arquitectura serverless condiciona algunas decisiones técnicas.
- No es ideal para procesos persistentes de larga duración.
- Requiere configurar correctamente variables de entorno en producción.

## Alternativas descartadas

- Express separado: habría aumentado la complejidad del despliegue.
- Backend independiente en Railway: válido, pero menos simple para este caso.
- Monolito tradicional: más control, pero más infraestructura.
