import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../services/productService';
import type { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';
import ProductFilters, { type FilterValues } from '../components/ProductFilters';
import Spinner from '../components/Spinner';
import './Catalog.css';

const emptyFilters: FilterValues = {
  search: '',
  categoryId: '',
  minPrice: '',
  maxPrice: '',
};

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<FilterValues>(emptyFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Categorías: se cargan una sola vez
  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  // Productos: se recargan cada vez que cambian los filtros
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getProducts({
      search: filters.search.trim() || undefined,
      categoryId: filters.categoryId ? Number(filters.categoryId) : undefined,
      minPrice: filters.minPrice !== '' ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice !== '' ? Number(filters.maxPrice) : undefined,
    })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {
        if (!cancelled) setError('No se pudieron cargar los productos. Intenta de nuevo.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Evita que una respuesta vieja pise a una más reciente
    return () => {
      cancelled = true;
    };
  }, [filters]);

  return (
    <div>
      <h1>Catálogo</h1>
      <ProductFilters
        values={filters}
        categories={categories}
        onChange={setFilters}
        onClear={() => setFilters(emptyFilters)}
      />

      {loading && <Spinner text="Cargando productos..." />}

      {!loading && error && <div className="state-box error">{error}</div>}

      {!loading && !error && products.length === 0 && (
        <div className="state-box">
          <p>No encontramos productos con esos filtros.</p>
          <button className="btn btn-outline" onClick={() => setFilters(emptyFilters)}>
            Limpiar filtros
          </button>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}