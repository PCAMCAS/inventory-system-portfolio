"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: string | number;
  stock: number;
  categoryId: string;
  category: { id: string; name: string };
};

type Category = {
  id: string;
  name: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("1");
  const [stock, setStock] = useState("0");

  const totalStock = useMemo(
    () => products.reduce((total, product) => total + product.stock, 0),
    [products]
  );

  const lowStockCount = useMemo(
    () => products.filter((product) => product.stock <= 5).length,
    [products]
  );

  const inventoryValue = useMemo(
    () =>
      products.reduce(
        (total, product) => total + Number(product.price) * product.stock,
        0
      ),
    [products]
  );

  const loadData = useCallback(async () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (categoryId) params.set("categoryId", categoryId);

    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`/api/products?${params.toString()}`),
      fetch("/api/categories"),
    ]);

    if (!productsRes.ok || !categoriesRes.ok) {
      alert("Error al cargar los datos del inventario.");
      return;
    }

    setProducts((await productsRes.json()) as Product[]);
    setCategories((await categoriesRes.json()) as Category[]);
  }, [search, categoryId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  async function createProduct() {
    const selectedCategory = categoryId || categories[0]?.id;
    if (!selectedCategory || !name) return;

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        stock: Number(stock),
        categoryId: selectedCategory,
      }),
    });

    if (!res.ok) {
      alert("Error al crear el producto.");
      return;
    }

    setName("");
    setPrice("1");
    setStock("0");
    void loadData();
  }

  async function deleteProduct(id: string) {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

    if (!res.ok) {
      alert("Error al borrar el producto.");
      return;
    }

    void loadData();
  }

  async function updateStock(product: Product, nextStock: number) {
    const previous = products;

    setProducts((current) =>
      current.map((item) =>
        item.id === product.id ? { ...item, stock: nextStock } : item
      )
    );

    const res = await fetch(`/api/products/${product.id}/stock`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: nextStock }),
    });

    if (!res.ok) {
      setProducts(previous);
      alert("Error al actualizar stock. Se restaura el valor anterior.");
    } else {
      void loadData();
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
          <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="text-sm font-semibold text-emerald-300">
              Sistema de Inventario
            </Link>

            <div className="flex gap-2 text-sm">
              <Link
                href="/products"
                className="rounded-full bg-white px-4 py-2 font-medium text-slate-950"
              >
                Productos
              </Link>
              <Link
                href="/categories"
                className="rounded-full border border-slate-700 px-4 py-2 font-medium text-slate-200"
              >
                Categorías
              </Link>
            </div>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              <p className="w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                Gestión operativa de inventario
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Productos
              </h1>
              <p className="max-w-2xl text-slate-300">
                Controla precios, categorías y stock desde una interfaz clara,
                preparada para validación técnica y demo de portfolio.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-slate-800 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Productos visibles</p>
                <p className="mt-1 text-3xl font-bold">{products.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Stock total</p>
                <p className="mt-1 text-3xl font-bold">{totalStock}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Valor inventario</p>
                <p className="mt-1 text-3xl font-bold">
                  {inventoryValue.toFixed(2)} €
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3">
          <input
            className="rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none ring-emerald-400 transition focus:ring-2"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none ring-emerald-400 transition focus:ring-2"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button
            className="rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
            onClick={() => {
              setSearch("");
              setCategoryId("");
            }}
          >
            Limpiar filtros
          </button>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Crear producto</h2>
              <p className="text-sm text-slate-500">
                Añade nuevas referencias al inventario.
              </p>
            </div>

            {lowStockCount > 0 && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                {lowStockCount} con stock bajo
              </span>
            )}
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none ring-emerald-400 transition focus:ring-2"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none ring-emerald-400 transition focus:ring-2"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none ring-emerald-400 transition focus:ring-2"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <button
              className="rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
              onClick={createProduct}
            >
              Crear producto
            </button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Categoría: {product.category.name}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.stock <= 5
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {product.stock <= 5 ? "Stock bajo" : "Disponible"}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Precio</p>
                  <p className="mt-1 text-2xl font-bold">
                    {Number(product.price).toFixed(2)} €
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Stock</p>
                  <p className="mt-1 text-2xl font-bold">Stock: {product.stock}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold transition hover:bg-slate-100"
                  onClick={() =>
                    updateStock(product, Math.max(0, product.stock - 1))
                  }
                >
                  -
                </button>
                <button
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold transition hover:bg-slate-100"
                  onClick={() => updateStock(product, product.stock + 1)}
                >
                  +
                </button>
                <button
                  className="ml-auto rounded-xl border border-red-200 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50"
                  onClick={() => deleteProduct(product.id)}
                >
                  Borrar
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
