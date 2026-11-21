import { products } from '../data/products';
import { categories } from '../data/categories';
import type { Product, Category } from '../types';
import { delay } from './delay';

export interface ProductFilters {
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  await delay();
  const { search, categoryId, minPrice, maxPrice } = filters;
  return products.filter((p) =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (!categoryId || p.categoryId === categoryId) &&
    (minPrice === undefined || p.price >= minPrice) &&
    (maxPrice === undefined || p.price <= maxPrice)
  );
}

export async function getProductById(id: number): Promise<Product | undefined> {
  await delay(300);
  return products.find((p) => p.id === id);
}

export async function getCategories(): Promise<Category[]> {
  await delay(200);
  return categories;
}