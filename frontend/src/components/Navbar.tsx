import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">🛍️ Mi Tienda</Link>
        <nav className="navbar-links">
          <NavLink to="/">Catálogo</NavLink>
          <NavLink to="/carrito">Carrito{totalItems > 0 && ` (${totalItems})`}</NavLink>

          {user && !isAdmin && <NavLink to="/mis-pedidos">Mis pedidos</NavLink>}
          {isAdmin && <NavLink to="/admin/pedidos">Pedidos (admin)</NavLink>}

          {user ? (
            <>
              <span className="navbar-user">Hola, {user.name.split(' ')[0]}</span>
              <button className="navbar-logout" onClick={logout}>Salir</button>
            </>
          ) : (
            <NavLink to="/login">Ingresar</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}