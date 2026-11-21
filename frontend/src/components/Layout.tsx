import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className="container" style={{ flex: 1, paddingTop: '1.5rem' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}