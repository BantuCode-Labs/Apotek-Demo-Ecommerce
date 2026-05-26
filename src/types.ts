export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit: string;
  stockStatus: 'available' | 'out_of_stock';
  rating: number;
  ratingCount: number;
  discountBadge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  name: string;
  phone: string;
  street: string;
  isMain: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  unit: string;
  extraCount?: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Diproses' | 'Dikirim' | 'Selesai';
  items: OrderItem[];
  totalPrice: number;
  shippingCost: number;
  discount: number;
  shippingAddress: Address;
  shippingMethod: string;
  paymentMethod: string;
}
