import { useEffect, useState } from 'react';
import { getProducts } from './services/productService';
import { formatCurrency } from './utils/format';
import type { Product } from './types';

export default function App() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setItems);
  }, []);

  return (
    <ul>
      {items.map((p) => (
        <li key={p.id}>{p.name}: {formatCurrency(p.price)}</li>
      ))}
    </ul>
  );
}