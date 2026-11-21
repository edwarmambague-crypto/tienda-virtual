export default function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) return <span className="badge badge-out">Agotado</span>;
  if (stock <= 5) return <span className="badge badge-low">Quedan {stock}</span>;
  return <span className="badge badge-ok">Disponible</span>;
}