import { orders as seedOrders } from '../data/orders';
import { products } from '../data/products';
import type { CreateOrderInput, Order, OrderItem, OrderStatus } from '../types';
import { delay } from './delay';

const STORAGE_KEY = 'tienda-orders';

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [...seedOrders];
  } catch {
    return [...seedOrders];
  }
}

let orders: Order[] = loadOrders();

const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  await delay(800);

  if (input.items.length === 0) {
    throw new Error('El pedido no tiene productos.');
  }

  let nextItemId = orders.flatMap((o) => o.items).reduce((m, i) => Math.max(m, i.id), 0) + 1;
  const items: OrderItem[] = [];

  for (const { productId, quantity } of input.items) {
    const product = products.find((p) => p.id === productId);
    if (!product) throw new Error('Uno de los productos ya no existe.');
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Cantidad inválida para "${product.name}".`);
    }
    if (quantity > product.stock) {
      throw new Error(`Stock insuficiente para "${product.name}" (disponible: ${product.stock}).`);
    }
    items.push({
      id: nextItemId++,
      productId: product.id,
      productName: product.name,
      quantity,
      unitPrice: product.price, // precio vigente tomado del catálogo
    });
  }

  // Todo validado: ahora sí se descuenta el inventario
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId)!;
    product.stock -= item.quantity;
  }

  const order: Order = {
    id: orders.reduce((m, o) => Math.max(m, o.id), 0) + 1,
    userId: input.userId,
    createdAt: new Date().toISOString(),
    status: 'pendiente',
    shippingName: input.shippingName,
    shippingAddress: input.shippingAddress,
    shippingCity: input.shippingCity,
    shippingPhone: input.shippingPhone,
    total: items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0), // calculado aquí
    items,
  };

  orders = [order, ...orders];
  save();
  return order;
}

export async function getOrdersByUser(userId: number): Promise<Order[]> {
  await delay(400);
  return orders.filter((o) => o.userId === userId);
}

export async function getAllOrders(): Promise<Order[]> {
  await delay(400);
  return [...orders];
}

// Transiciones válidas: un pedido no puede "saltar" a cualquier estado
const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  pendiente: ['enviado', 'cancelado'],
  enviado: ['entregado'],
  entregado: [],
  cancelado: [],
};

export function getAllowedTransitions(status: OrderStatus): OrderStatus[] {
  return allowedTransitions[status];
}

export async function updateOrderStatus(orderId: number, newStatus: OrderStatus): Promise<Order> {
  await delay(500);
  const order = orders.find((o) => o.id === orderId);
  if (!order) throw new Error('El pedido no existe.');

  if (!allowedTransitions[order.status].includes(newStatus)) {
    throw new Error(`No se puede pasar de "${order.status}" a "${newStatus}".`);
  }

  // Si se cancela, el stock se devuelve al inventario
  if (newStatus === 'cancelado') {
    for (const item of order.items) {
      const product = products.find((p) => p.id === item.productId);
      if (product) product.stock += item.quantity;
    }
  }

  const updated: Order = { ...order, status: newStatus };
  orders = orders.map((o) => (o.id === orderId ? updated : o));
  save();
  return updated;
}