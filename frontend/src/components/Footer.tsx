import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} Mi Tienda · Proyecto final de Aplicaciones Web
      </div>
    </footer>
  );
}