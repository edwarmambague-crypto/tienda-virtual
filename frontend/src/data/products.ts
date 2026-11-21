import type { Product } from '../types';

const img = (seed: string) => `https://picsum.photos/seed/${seed}/400/300`;

export const products: Product[] = [
  { id: 1, name: 'Auriculares Bluetooth Pro', description: 'Cancelación de ruido y 30 horas de batería.', price: 189900, stock: 15, imageUrl: img('auriculares'), categoryId: 1 },
  { id: 2, name: 'Teclado mecánico', description: 'Switches rojos, retroiluminado RGB.', price: 249900, stock: 8, imageUrl: img('teclado'), categoryId: 1 },
  { id: 3, name: 'Mouse inalámbrico', description: 'Ergonómico, sensor de 1600 DPI.', price: 79900, stock: 25, imageUrl: img('mouse'), categoryId: 1 },
  { id: 4, name: 'Cargador USB-C 65W', description: 'Carga rápida para portátil y celular.', price: 59900, stock: 0, imageUrl: img('cargador'), categoryId: 1 },
  { id: 5, name: 'Camiseta de algodón', description: 'Corte clásico, 100% algodón.', price: 39900, stock: 40, imageUrl: img('camiseta'), categoryId: 2 },
  { id: 6, name: 'Chaqueta impermeable', description: 'Ligera, con capucha y bolsillos térmicos.', price: 219900, stock: 6, imageUrl: img('chaqueta'), categoryId: 2 },
  { id: 7, name: 'Jeans clásicos', description: 'Denim resistente, corte recto.', price: 129900, stock: 18, imageUrl: img('jeans'), categoryId: 2 },
  { id: 8, name: 'Lámpara de escritorio LED', description: 'Tres niveles de brillo y puerto USB.', price: 89900, stock: 12, imageUrl: img('lampara'), categoryId: 3 },
  { id: 9, name: 'Set de ollas 3 piezas', description: 'Acero inoxidable con tapa de vidrio.', price: 159900, stock: 5, imageUrl: img('ollas'), categoryId: 3 },
  { id: 10, name: 'Cojín decorativo', description: 'Funda removible y lavable.', price: 29900, stock: 22, imageUrl: img('cojin'), categoryId: 3 },
  { id: 11, name: 'Termo de acero 750 ml', description: 'Mantiene el frío 24 horas.', price: 49900, stock: 3, imageUrl: img('termo'), categoryId: 4 },
  { id: 12, name: 'Balón de fútbol', description: 'Tamaño 5, costura reforzada.', price: 79900, stock: 14, imageUrl: img('balon'), categoryId: 4 },
];