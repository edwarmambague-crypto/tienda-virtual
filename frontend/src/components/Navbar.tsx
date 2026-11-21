import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">🛍️ Mi Tienda</Link>
        <nav className="navbar-links">
          <NavLink to="/">Catálogo</NavLink>
          <NavLink to="/carrito">Carrito</NavLink>
          <NavLink to="/mis-pedidos">Mis pedidos</NavLink>
          <NavLink to="/admin/pedidos">Admin</NavLink>
          <NavLink to="/login">Ingresar</NavLink>
        </nav>
      </div>
    </header>
  );
}