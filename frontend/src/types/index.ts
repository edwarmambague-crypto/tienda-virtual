export type Role = 'admin' | 'cliente';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
}

export type OrderStatus = 'pendiente' | 'enviado' | 'entregado' | 'cancelado';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number; // precio vigente al momento de comprar
}

export interface Order {
  id: number;
  userId: number;
  createdAt: string;
  status: OrderStatus;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPhone: string;
  total: number;
  items: OrderItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingData {
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPhone: string;
}

export interface CreateOrderInput extends ShippingData {
  userId: number;
  items: { productId: number; quantity: number }[]; // sin precios: solo ids y cantidades
}