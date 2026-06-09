# ADR-001: Neon PostgreSQL como base de datos serverless

## Estado

Aceptado

## Contexto

El sistema de inventario necesita persistir productos, categorías, precios y stock. El modelo de datos es relacional, ya que cada producto pertenece a una categoría y las operaciones principales dependen de consultas estructuradas.

Además, el proyecto está pensado para desplegarse en Vercel, por lo que conviene usar una base de datos compatible con entornos serverless.

## Decisión

Usar PostgreSQL gestionado en Neon junto con Prisma ORM como capa de acceso a datos.

## Consecuencias positivas

- PostgreSQL encaja bien con relaciones entre productos y categorías.
- Neon permite trabajar con una base de datos gestionada y compatible con despliegues serverless.
- Prisma aporta tipado, migraciones y una API clara para acceder a los datos.
- La arquitectura separa aplicación y persistencia.

## Compromisos

- Dependencia de un proveedor externo.
- Es necesario configurar correctamente `DATABASE_URL`.
- Hay que cuidar la gestión de conexiones desde un entorno serverless.

## Alternativas descartadas

- SQLite: útil para desarrollo local, pero menos adecuada para un despliegue real.
- MongoDB: flexible, pero el dominio del inventario encaja mejor con una base relacional.
- Base de datos en memoria: válida para tests, pero no para producción.
