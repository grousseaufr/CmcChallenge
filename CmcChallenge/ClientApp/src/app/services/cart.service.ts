import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { OrderItemRequest, OrderRequest } from '../models/orderRequest';
import { Product } from '../models/product';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _defaultCurrency = 'AUD';
  private cart: Cart;
  private orderServiceUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.orderServiceUrl = `${baseUrl}order`;

    this.cart = this.hasPreviousCart()
      ? JSON.parse(localStorage.getItem('cart')!)
      : <Cart>{ currencyCode: this._defaultCurrency };
  }

  get currentCart() {
    return this.cart;
  }

  get length(): number {
    return this.cart.items?.reduce(
      (total, { quantity }) => total + quantity,
      0
    );
  }

  addProduct(product: Product) {
    var existingItem = this.getCartItem(product.productId);

    if (existingItem) {
      this.updateCartItem(existingItem, product);
    } else {
      this.addToCart(product);
    }
    this.updateTotalPrice();
    this.sync();
  }

  removeCartItem(cartItem: CartItem) {
    this.cart.items = this.cart.items.filter(
      (x) => x.product.productId !== cartItem.product.productId
    );
    this.updateTotalPrice();
    this.sync();
  }

  emptyCart() {
    this.cart.items = [];
    this.cart.shippingPrice = 0;
    this.cart.totalPrice = 0;
    this.sync();
  }

  changeCurrency(currencyCode: string) {
    this.cart.currencyCode = currencyCode;
    this.sync();
  }

  placeOrder(): Observable<any> {
    let orderRequest = <OrderRequest>{
      currencyCode: this.cart.currencyCode,
      userId: 1, //Fake user Id here
    };

    orderRequest.items = this.cart.items.map((item) => {
      return <OrderItemRequest>{
        productId: item.product.productId,
        quantity: item.quantity,
      };
    });

    return this.http
      .post<OrderRequest>(this.orderServiceUrl, orderRequest)
      .pipe(catchError(this.handleError));
  }

  private updateTotalPrice() {
    this.cart.totalPrice = this.cart.items?.reduce(
      (total, { quantity, product }) => total + product.price * quantity,
      0
    );
  }

  private addToCart(product: Product) {
    if (!this.cart.items) {
      this.cart.items = new Array();
    }

    const cartItem = <CartItem>{
      priceTotal: product.price,
      quantity: 1,
      product: product,
    };
    this.cart.items.push(cartItem);
  }

  private updateCartItem(cartItem: CartItem, product: Product) {
    cartItem.quantity += 1;
    cartItem.priceTotal += product.price;
  }

  private hasPreviousCart(): boolean {
    return localStorage.getItem('cart') !== null;
  }

  private getCartItem(productId: number): CartItem | undefined {
    return this.cart.items?.find((i) => i.product.productId === productId);
  }

  private sync() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
