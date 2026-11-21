import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatCurrency } from '../utils/format';
import StockBadge from './StockBadge';
import './ProductCard.css';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card product-card">
      <Link to={`/producto/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <StockBadge stock={product.stock} />
        <p className="product-card-price">{formatCurrency(product.price)}</p>
        <Link to={`/producto/${product.id}`} className="btn btn-outline">
          Ver detalle
        </Link>
      </div>
    </article>
  );
}