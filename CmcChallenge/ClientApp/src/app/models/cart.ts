import { Product } from './product';

export interface Cart {
  currencyCode: string;
  totalPrice: number;
  shippingPrice: number;
  items: CartItem[];
}

export interface CartItem {
  quantity: number;
  priceTotal: number;
  product: Product;
}
