# ADR-003: Estrategia de testing con Vitest, Testing Library, MSW y Playwright

## Estado

Aceptado

## Contexto

El proyecto debe demostrar criterio de calidad. No basta con validar la aplicación manualmente: es necesario cubrir lógica de negocio, componentes, API Routes y flujos reales de usuario.

## Decisión

Usar una estrategia de testing por capas:

- Vitest para tests unitarios.
- Testing Library para componentes React.
- MSW para simular respuestas HTTP.
- next-test-api-route-handler para integración de API Routes.
- Playwright para tests E2E.

## Consecuencias positivas

- Las utilidades de producto quedan cubiertas con tests rápidos.
- Los componentes se prueban desde la perspectiva del usuario.
- Las API Routes se validan de forma aislada.
- Playwright verifica los flujos principales en navegador.

## Compromisos

- Aumenta el número de herramientas del proyecto.
- Hay que mantener mocks y datos de prueba consistentes.
- Los tests E2E son más lentos que los unitarios.

## Alternativas descartadas

- Solo tests manuales: no son repetibles ni aportan confianza suficiente.
- Solo tests unitarios: no validan integración ni flujos completos.
- Cypress: alternativa válida, pero Playwright encaja bien con el enfoque E2E actual.
