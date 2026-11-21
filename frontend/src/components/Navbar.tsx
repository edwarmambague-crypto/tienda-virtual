import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">🛍️ Mi Tienda</Link>
        <nav className="navbar-links">
          <NavLink to="/">Catálogo</NavLink>
          <NavLink to="/carrito">Carrito{totalItems > 0 && ` (${totalItems})`}</NavLink>
          <NavLink to="/mis-pedidos">Mis pedidos</NavLink>
          <NavLink to="/admin/pedidos">Admin</NavLink>
          <NavLink to="/login">Ingresar</NavLink>
        </nav>
      </div>
    </header>
  );
}