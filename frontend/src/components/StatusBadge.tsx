import type { OrderStatus } from '../types';

const labels: Record<OrderStatus, string> = {
  pendiente: 'Pendiente',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};

const classes: Record<OrderStatus, string> = {
  pendiente: 'badge-low',
  enviado: 'badge-info',
  entregado: 'badge-ok',
  cancelado: 'badge-out',
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`badge ${classes[status]}`}>{labels[status]}</span>;
}