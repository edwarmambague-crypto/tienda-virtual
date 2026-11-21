import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
import QuantitySelector from '../components/QuantitySelector';
import './Cart.css';

export default function Cart() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="state-box">
        <h1>Tu carrito está vacío</h1>
        <p>Explora el catálogo y agrega algunos productos.</p>
        <Link to="/" className="btn">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Carrito</h1>
      <div className="cart-layout">
        <section className="cart-list">
          {items.map(({ product, quantity }) => (
            <article key={product.id} className="card cart-item">
              <img src={product.imageUrl} alt={product.name} />
              <div className="cart-item-info">
                <Link to={`/producto/${product.id}`}><h3>{product.name}</h3></Link>
                <p>{formatCurrency(product.price)} c/u</p>
                <QuantitySelector
                  value={quantity}
                  max={product.stock}
                  onChange={(q) => updateQuantity(product.id, q)}
                />
              </div>
              <div className="cart-item-side">
                <strong>{formatCurrency(product.price * quantity)}</strong>
                <button className="link-danger" onClick={() => removeItem(product.id)}>
                  Quitar
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="card cart-summary">
          <h2>Resumen</h2>
          <div className="cart-summary-row">
            <span>Total</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </div>
          <button className="btn" onClick={() => navigate('/checkout')}>
            Continuar con el pedido
          </button>
          <button className="btn btn-outline" onClick={clearCart}>
            Vaciar carrito
          </button>
        </aside>
      </div>
    </div>
  );
}