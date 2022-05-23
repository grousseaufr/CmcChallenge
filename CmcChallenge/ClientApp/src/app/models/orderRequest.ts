export interface OrderRequest {
  currencyCode: string;
  userId: number;
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}
