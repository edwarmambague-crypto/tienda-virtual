import { users } from '../data/users';
import type { User } from '../types';
import { delay } from './delay';

// Solo para la simulación. En la Entrega 2 esto lo valida el servidor.
const demoPasswords: Record<string, string> = {
  'admin@tienda.com': 'admin123',
  'laura@correo.com': 'cliente123',
  'carlos@correo.com': 'cliente123',
};

export async function login(email: string, password: string): Promise<User> {
  await delay(500);
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || demoPasswords[user.email] !== password) {
    throw new Error('Correo o contraseña incorrectos.');
  }
  return user;
}