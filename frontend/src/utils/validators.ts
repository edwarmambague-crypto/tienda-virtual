export interface ShippingErrors {
  shippingName?: string;
  shippingAddress?: string;
  shippingCity?: string;
  shippingPhone?: string;
}

export function validateShipping(values: {
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPhone: string;
}): ShippingErrors {
  const errors: ShippingErrors = {};

  if (values.shippingName.trim().length < 3) {
    errors.shippingName = 'Ingresa tu nombre completo (mínimo 3 caracteres).';
  }
  if (values.shippingAddress.trim().length < 5) {
    errors.shippingAddress = 'Ingresa una dirección válida (mínimo 5 caracteres).';
  }
  if (values.shippingCity.trim().length < 2) {
    errors.shippingCity = 'Ingresa la ciudad.';
  }
  if (!/^3\d{9}$/.test(values.shippingPhone.replace(/\s/g, ''))) {
    errors.shippingPhone = 'Ingresa un celular colombiano de 10 dígitos que empiece por 3.';
  }
  return errors;
}