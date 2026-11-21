import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById, getCategories } from '../services/productService';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
import Spinner from '../components/Spinner';
import StockBadge from '../components/StockBadge';
import QuantitySelector from '../components/QuantitySelector';
import './ProductDetail.css';

// El "key" reinicia todo el estado al cambiar de producto
export default function ProductDetail() {
  const { id } = useParams();
  return <ProductDetailContent key={id} id={Number(id)} />;
}

function ProductDetailContent({ id }: { id: number }) {
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getProductById(id), getCategories()])
      .then(([p, cats]) => {
        if (cancelled) return;
        setProduct(p ?? null);
        setCategoryName(cats.find((c) => c.id === p?.categoryId)?.name ?? '');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <Spinner text="Cargando producto..." />;

  if (!product) {
    return (
      <div className="state-box">
        <p>El producto no existe.</p>
        <Link to="/" className="btn">Volver al catálogo</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
  };

  return (
    <div>
      <Link to="/" className="back-link">← Volver al catálogo</Link>
      <div className="card product-detail">
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-detail-info">
          <span className="product-detail-category">{categoryName}</span>
          <h1>{product.name}</h1>
          <StockBadge stock={product.stock} />
          <p>{product.description}</p>
          <p className="product-detail-price">{formatCurrency(product.price)}</p>

          {product.stock > 0 ? (
            <>
              <QuantitySelector value={quantity} max={product.stock} onChange={setQuantity} />
              <button className="btn" onClick={handleAdd}>Agregar al carrito</button>
            </>
          ) : (
            <p className="out-msg">Producto no disponible por el momento.</p>
          )}

          {added && (
            <p className="added-msg">
              ✔ Agregado. <Link to="/carrito">Ir al carrito</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}