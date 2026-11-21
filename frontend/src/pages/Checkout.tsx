import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import { validateShipping, type ShippingErrors } from '../utils/validators';
import { formatCurrency } from '../utils/format';
import type { ShippingData } from '../types';
import './Checkout.css';

export default function Checkout() {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();

  const [values, setValues] = useState<ShippingData>({
    shippingName: user?.name ?? '',
    shippingAddress: '',
    shippingCity: '',
    shippingPhone: '',
  });
  const [errors, setErrors] = useState<ShippingErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedId, setConfirmedId] = useState<number | null>(null);

  // Pantalla de confirmación (después de crear el pedido)
  if (confirmedId !== null) {
    return (
      <div className="state-box">
        <h1>✔ ¡Pedido confirmado!</h1>
        <p>Tu pedido #{confirmedId} fue registrado correctamente.</p>
        <div className="confirm-actions">
          <Link to="/mis-pedidos" className="btn">Ver mis pedidos</Link>
          <Link to="/" className="btn btn-outline">Seguir comprando</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) return <Navigate to="/carrito" replace />;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Limpia el error del campo al corregirlo
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const found = validateShipping(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const order = await createOrder({
        userId: user!.id,
        ...values,
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
      });
      clearCart();
      setConfirmedId(order.id);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'No se pudo crear el pedido.');
    } finally {
      setSubmitting(false);
    }
  };

  const field = (name: keyof ShippingData, label: string, type = 'text', placeholder = '') => (
    <label className="field">
      {label}
      <input
        name={name}
        type={type}
        value={values[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={errors[name] ? 'invalid' : ''}
      />
      {errors[name] && <span className="field-error" role="alert">{errors[name]}</span>}
    </label>
  );

  return (
    <div>
      <h1>Datos de entrega</h1>
      <div className="checkout-layout">
        <form className="card checkout-form" onSubmit={handleSubmit} noValidate>
          {field('shippingName', 'Nombre completo')}
          {field('shippingAddress', 'Dirección', 'text', 'Calle 5 # 10-20')}
          {field('shippingCity', 'Ciudad')}
          {field('shippingPhone', 'Celular', 'tel', '3001234567')}

          {submitError && <p className="form-error" role="alert">{submitError}</p>}

          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? 'Confirmando pedido...' : 'Confirmar pedido'}
          </button>
          <Link to="/carrito" className="back-link">← Volver al carrito</Link>
        </form>

        <aside className="card checkout-summary">
          <h2>Resumen del pedido</h2>
          <ul>
            {items.map(({ product, quantity }) => (
              <li key={product.id}>
                <span>{quantity} × {product.name}</span>
                <span>{formatCurrency(product.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Total</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}