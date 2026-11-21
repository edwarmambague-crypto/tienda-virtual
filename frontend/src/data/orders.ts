import type { Order } from '../types';

export const orders: Order[] = [
  {
    id: 1, userId: 2, createdAt: '2026-11-02T10:30:00', status: 'entregado',
    shippingName: 'Laura Gómez', shippingAddress: 'Calle 5 # 10-20', shippingCity: 'Popayán', shippingPhone: '3001234567',
    total: 349700,
    items: [
      { id: 1, productId: 1, productName: 'Auriculares Bluetooth Pro', quantity: 1, unitPrice: 189900 },
      { id: 2, productId: 3, productName: 'Mouse inalámbrico', quantity: 2, unitPrice: 79900 },
    ],
  },
  {
    id: 2, userId: 2, createdAt: '2026-11-15T16:45:00', status: 'enviado',
    shippingName: 'Laura Gómez', shippingAddress: 'Calle 5 # 10-20', shippingCity: 'Popayán', shippingPhone: '3001234567',
    total: 119700,
    items: [
      { id: 3, productId: 5, productName: 'Camiseta de algodón', quantity: 3, unitPrice: 39900 },
    ],
  },
  {
    id: 3, userId: 3, createdAt: '2026-11-18T09:15:00', status: 'pendiente',
    shippingName: 'Carlos Ruiz', shippingAddress: 'Carrera 9 # 4-50', shippingCity: 'Cali', shippingPhone: '3109876543',
    total: 279700,
    items: [
      { id: 4, productId: 6, productName: 'Chaqueta impermeable', quantity: 1, unitPrice: 219900 },
      { id: 5, productId: 10, productName: 'Cojín decorativo', quantity: 2, unitPrice: 29900 },
    ],
  },
];