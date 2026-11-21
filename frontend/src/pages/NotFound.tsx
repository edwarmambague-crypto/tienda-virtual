import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>404 · Página no encontrada</h1>
      <Link to="/" className="btn">Volver al catálogo</Link>
    </div>
  );
}