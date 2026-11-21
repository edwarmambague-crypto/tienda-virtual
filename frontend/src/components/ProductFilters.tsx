import type { Category } from '../types';
import './ProductFilters.css';

export interface FilterValues {
  search: string;
  categoryId: string; // '' = todas
  minPrice: string;
  maxPrice: string;
}

interface Props {
  values: FilterValues;
  categories: Category[];
  onChange: (values: FilterValues) => void;
  onClear: () => void;
}

export default function ProductFilters({ values, categories, onChange, onClear }: Props) {
  const set = (field: keyof FilterValues, value: string) =>
    onChange({ ...values, [field]: value });

  return (
    <section className="card filters">
      <input
        type="search"
        placeholder="Buscar por nombre..."
        value={values.search}
        onChange={(e) => set('search', e.target.value)}
      />
      <select value={values.categoryId} onChange={(e) => set('categoryId', e.target.value)}>
        <option value="">Todas las categorías</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <input
        type="number"
        min={0}
        placeholder="Precio mín."
        value={values.minPrice}
        onChange={(e) => set('minPrice', e.target.value)}
      />
      <input
        type="number"
        min={0}
        placeholder="Precio máx."
        value={values.maxPrice}
        onChange={(e) => set('maxPrice', e.target.value)}
      />
      <button type="button" className="btn btn-outline" onClick={onClear}>
        Limpiar
      </button>
    </section>
  );
}