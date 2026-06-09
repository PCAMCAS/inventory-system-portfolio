"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  description?: string | null;
  _count?: { products: number };
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadCategories = useCallback(async () => {
    const res = await fetch("/api/categories");

    if (!res.ok) {
      alert("Error al cargar las categorías.");
      return;
    }

    setCategories((await res.json()) as Category[]);
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  async function createCategory() {
    if (!name) return;

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    if (!res.ok) {
      alert("Error al crear la categoría.");
      return;
    }

    setName("");
    setDescription("");
    void loadCategories();
  }

  async function deleteCategory(id: string) {
    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("No se puede borrar una categoría con productos asociados.");
    }

    void loadCategories();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
          <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="text-sm font-semibold text-emerald-300">
              Sistema de Inventario
            </Link>

            <div className="flex gap-2 text-sm">
              <Link
                href="/products"
                className="rounded-full border border-slate-700 px-4 py-2 font-medium text-slate-200"
              >
                Productos
              </Link>
              <Link
                href="/categories"
                className="rounded-full bg-white px-4 py-2 font-medium text-slate-950"
              >
                Categorías
              </Link>
            </div>
          </nav>

          <div className="space-y-4">
            <p className="w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              Organización del catálogo
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Categorías
            </h1>
            <p className="max-w-2xl text-slate-300">
              Agrupa productos por familias para facilitar búsquedas, filtros y
              control operativo del inventario.
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Crear categoría</h2>
            <p className="text-sm text-slate-500">
              Define nuevas familias de productos.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none ring-emerald-400 transition focus:ring-2"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none ring-emerald-400 transition focus:ring-2"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              className="rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
              onClick={createCategory}
            >
              Crear categoría
            </button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <article
              key={category.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="mt-2 text-slate-500">
                    {category.description || "Sin descripción."}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  Productos: {category._count?.products ?? 0}
                </span>
              </div>

              <button
                className="mt-5 rounded-xl border border-red-200 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50"
                onClick={() => deleteCategory(category.id)}
              >
                Borrar
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
