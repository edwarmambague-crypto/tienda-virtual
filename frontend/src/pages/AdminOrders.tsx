import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus, getAllowedTransitions } from '../services/orderService';
import type { Order, OrderStatus } from '../types';
import { users } from '../data/users';
import { formatCurrency, formatDate } from '../utils/format';
import StatusBadge from '../components/StatusBadge';
import Spinner from '../components/Spinner';
import './AdminOrders.css';

const statusOptions: OrderStatus[] = ['pendiente', 'enviado', 'entregado', 'cancelado'];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'' | OrderStatus>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    getAllOrders()
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch(() => {
        if (!cancelled) setError('No se pudieron cargar los pedidos.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChangeStatus = async (orderId: number, newStatus: OrderStatus) => {
    setActionError(null);
    setBusyId(orderId);
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'No se pudo cambiar el estado.');
    } finally {
      setBusyId(null);
    }
  };

  const customerName = (userId: number) =>
    users.find((u) => u.id === userId)?.name ?? `Usuario ${userId}`;

  if (loading) return <Spinner text="Cargando pedidos..." />;
  if (error) return <div className="state-box error">{error}</div>;

  const visible = filter ? orders.filter((o) => o.status === filter) : orders;

  return (
    <div>
      <h1>Pedidos (administración)</h1>

      <div className="admin-toolbar">
        <label>
          Filtrar por estado{' '}
          <select value={filter} onChange={(e) => setFilter(e.target.value as '' | OrderStatus)}>
            <option value="">Todos</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <span>{visible.length} pedido(s)</span>
      </div>

      {actionError && <p className="form-error" role="alert">{actionError}</p>}

      {visible.length === 0 ? (
        <div className="state-box">No hay pedidos con ese estado.</div>
      ) : (
        <div className="card data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((o) => {
                const next = getAllowedTransitions(o.status);
                return (
                  <>
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{customerName(o.userId)}</td>
                      <td>{formatDate(o.createdAt)}</td>
                      <td>{formatCurrency(o.total)}</td>
                      <td><StatusBadge status={o.status} /></td>
                      <td className="admin-actions">
                        <button
                          className="btn btn-outline"
                          onClick={() => setExpandedId(expandedId === o.id ? null : o.id)}
                        >
                          {expandedId === o.id ? 'Ocultar' : 'Detalle'}
                        </button>
                        {next.map((s) => (
                          <button
                            key={s}
                            className="btn"
                            disabled={busyId === o.id}
                            onClick={() => handleChangeStatus(o.id, s)}
                          >
                            Marcar {s}
                          </button>
                        ))}
                      </td>
                    </tr>
                    {expandedId === o.id && (
                      <tr key={`${o.id}-detail`} className="admin-detail-row">
                        <td colSpan={6}>
                          <strong>Entrega:</strong> {o.shippingName}, {o.shippingAddress}, {o.shippingCity} · Tel. {o.shippingPhone}
                          <ul>
                            {o.items.map((i) => (
                              <li key={i.id}>
                                {i.quantity} × {i.productName} a {formatCurrency(i.unitPrice)} c/u
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}