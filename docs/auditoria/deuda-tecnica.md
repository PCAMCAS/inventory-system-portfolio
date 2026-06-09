# Auditoría de deuda técnica

## Checklist ejecutado

Durante la auditoría se verificaron los comandos principales de calidad del proyecto:

~~~bash
npm run lint
npm run typecheck
npm run test:coverage
npm run build
npm run e2e
~~~

Resultado final:

- ESLint sin errores.
- TypeScript sin errores.
- Cobertura del 100% en utilidades de producto.
- Build de producción correcto.
- Tests unitarios, integración y E2E pasando.

## Problemas encontrados y soluciones aplicadas

### 1. ESLint revisaba artefactos generados

ESLint estaba analizando archivos dentro de `coverage/`, lo que generaba avisos sobre código que no pertenece al código fuente del proyecto.

**Solución:** se añadieron exclusiones para carpetas generadas como `coverage/`, `.next/`, `node_modules/`, `playwright-report/` y `test-results/`.

### 2. Uso de `any` explícito en TypeScript

El mock de base de datos utilizado para los tests E2E contenía varios `any`.

**Solución:** se sustituyeron por tipos específicos para productos, categorías, argumentos de creación, actualización, ordenación y filtros.

### 3. Cargas de datos desde cliente

Algunos componentes cargaban datos desde API Routes usando `useEffect`. La regla de React detectaba el patrón como potencialmente problemático por actualizar estado después de una carga inicial.

**Solución:** se encapsuló la carga de datos en funciones memoizadas con `useCallback`, se añadieron comprobaciones de error HTTP y se documentó el criterio usado. Para este proyecto, la carga inicial desde cliente es una decisión aceptable porque la interfaz de inventario es sencilla y los tests cubren los estados principales.

### 4. Manejo de errores en peticiones

Algunas peticiones asumían que la respuesta de la API era correcta.

**Solución:** se añadieron comprobaciones con `response.ok` y mensajes de error básicos para evitar fallos silenciosos.

## Error más frecuente

El error más frecuente fue avanzar primero en la funcionalidad y dejar para después los detalles de calidad: tipos estrictos, errores de API, limpieza de ESLint y documentación.

## Qué haría diferente en un proyecto nuevo

En un proyecto nuevo configuraría desde el inicio:

- ESLint estricto.
- Scripts de `lint`, `typecheck`, `test`, `coverage` y `build`.
- Formato estándar de errores de API.
- Tests mínimos antes de seguir ampliando funcionalidad.
- ADRs desde las primeras decisiones técnicas importantes.

Esto evitaría tener que corregir varias decisiones al final del proyecto.
