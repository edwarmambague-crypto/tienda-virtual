import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUser } from '../services/orderService';
import type { Order } from '../types';
import OrderCard from '../components/OrderCard';
import Spinner from '../components/Spinner';

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    getOrdersByUser(user.id)
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch(() => {
        if (!cancelled) setError('No se pudieron cargar tus pedidos.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading) return <Spinner text="Cargando tus pedidos..." />;
  if (error) return <div className="state-box error">{error}</div>;

  return (
    <div>
      <h1>Mis pedidos</h1>
      {orders.length === 0 ? (
        <div className="state-box">
          <p>Aún no has realizado ningún pedido.</p>
          <Link to="/" className="btn">Ir al catálogo</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}