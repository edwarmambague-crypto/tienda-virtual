# Mi Tienda · Tienda virtual de catálogo y pedidos

Proyecto final de **Desarrollo de Aplicaciones Web**.
Autores: José David Miranda, Jhonatan Steven Garzon  y Edwar Andrés Mambagüe

## Descripción

Tienda web sencilla para explorar productos, administrar un carrito y registrar pedidos.
No incluye pasarela de pagos.

**Estado:** Entrega 1 (Frontend funcional con datos simulados). La Entrega 2 integrará
API REST y PostgreSQL.

## Tecnologías

| Capa | Tecnología | Justificación |
|---|---|---|
| Frontend | React + Vite + TypeScript | Componentes reutilizables y tipado estático |
| Enrutamiento | React Router | Navegación y rutas protegidas |
| Estado | React Context | Carrito y sesión compartidos sin librerías extra |
| Backend (Entrega 2) | NestJS | Validación y Swagger integrados |
| Base de datos (Entrega 2) | PostgreSQL | Modelo relacional |

## Requisitos

- Node.js (LTS) y npm

## Cómo ejecutar el Frontend

```bash
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173

## Cuentas de prueba (simuladas)

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@tienda.com | admin123 |
| Cliente | laura@correo.com | cliente123 |
| Cliente | carlos@correo.com | cliente123 |

Son datos ficticios de demostración, no contraseñas reales.

## Vistas implementadas

| Ruta | Vista | Acceso |
|---|---|---|
| `/` | Catálogo con búsqueda y filtros (nombre, categoría, rango de precio) | Público |
| `/producto/:id` | Detalle de producto y selector de cantidad | Público |
| `/carrito` | Carrito con modificación de cantidades | Público |
| `/login` | Inicio de sesión simulado | Público |
| `/checkout` | Datos de entrega validados y resumen del pedido | Con sesión |
| `/mis-pedidos` | Historial de pedidos del cliente | Cliente |
| `/admin/pedidos` | Todos los pedidos, filtro por estado y cambio de estado | Administrador |

## Estados de interfaz

- **Carga:** spinner en catálogo, detalle y pedidos.
- **Sin resultados:** catálogo sin coincidencias, carrito vacío, sin pedidos.
- **Confirmación:** pantalla de pedido confirmado y aviso al agregar al carrito.
- **Error:** mensajes por campo en formularios y mensajes generales en operaciones fallidas.

## Datos simulados y supuestos

- 4 categorías, 12 productos (uno agotado y varios con stock bajo), 3 usuarios y 3 pedidos
  iniciales, en `frontend/src/data/`.
- Los datos tienen la misma forma que las tablas previstas en PostgreSQL:
  `users`, `categories`, `products`, `orders`, `order_items`.
- `frontend/src/services/` simula la API con retardos artificiales. En la Entrega 2 solo
  cambia el interior de estas funciones; las pantallas no se modifican.
- El carrito, la sesión y los pedidos nuevos se guardan en `localStorage`.
- El stock descontado al comprar vive solo en memoria y vuelve a su valor inicial al
  recargar (limitación de la simulación que resolverá PostgreSQL).
- El total del pedido se recalcula en el servicio con los precios del catálogo, no con
  lo que envía el carrito.
- Las imágenes provienen de picsum.photos, por lo que requieren internet.

## Decisiones de diseño

- CSS propio con variables, sin librerías de UI, diseño adaptable con grid y media queries.
- Capa `services` que aísla el origen de los datos de la interfaz.
- Componentes reutilizables: `ProductCard`, `StockBadge`, `StatusBadge`, `QuantitySelector`,
  `Spinner`, `OrderCard`, `ProtectedRoute`.
- Rutas protegidas por sesión y por rol.
- Transiciones de estado válidas: pendiente → enviado → entregado; pendiente → cancelado.