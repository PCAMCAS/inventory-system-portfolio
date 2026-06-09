import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="space-y-5">
          <p className="w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
            Portfolio técnico junior · Inventario full-stack
          </p>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Sistema de Inventario para gestión de productos, categorías y stock.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Aplicación construida con Next.js, Prisma, PostgreSQL y una suite
              completa de testing con Vitest, Testing Library, MSW y Playwright.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Ver productos
            </Link>

            <Link
              href="/categories"
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-100 transition hover:bg-slate-900"
            >
              Gestionar categorías
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold">Arquitectura</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Frontend y API Routes en Next.js, persistencia con Prisma y
              PostgreSQL en Neon.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold">Calidad</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Linting, TypeScript, cobertura, tests de componentes, integración
              y E2E.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold">Portfolio</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Documentación profesional, ADRs, auditoría técnica y demo
              preparada para revisión.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
