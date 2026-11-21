import type { Order } from '../types';
import { formatCurrency, formatDate } from '../utils/format';
import StatusBadge from './StatusBadge';
import './OrderCard.css';

export default function OrderCard({ order }: { order: Order }) {
  return (
    <article className="card order-card">
      <header className="order-card-header">
        <div>
          <h3>Pedido #{order.id}</h3>
          <small>{formatDate(order.createdAt)}</small>
        </div>
        <StatusBadge status={order.status} />
      </header>

      <ul className="order-card-items">
        {order.items.map((item) => (
          <li key={item.id}>
            <span>{item.quantity} × {item.productName}</span>
            <span>{formatCurrency(item.quantity * item.unitPrice)}</span>
          </li>
        ))}
      </ul>

      <footer className="order-card-footer">
        <small>Envío a {order.shippingAddress}, {order.shippingCity}</small>
        <strong>Total: {formatCurrency(order.total)}</strong>
      </footer>
    </article>
  );
}