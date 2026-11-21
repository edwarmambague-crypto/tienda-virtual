import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';

interface Props {
  role?: Role; // si se indica, además exige ese rol
}

export default function ProtectedRoute({ role }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  // Sin sesión: al login, recordando a dónde quería ir
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Con sesión pero sin permiso
  if (role && user.role !== role) {
    return (
      <div className="state-box error">
        <h1>Acceso denegado</h1>
        <p>No tienes permisos para ver esta página.</p>
      </div>
    );
  }

  return <Outlet />;
}