import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit, OnDestroy {
  cart!: Cart;
  selectedCountry!: Country;
  subscriptions: Subscription[] = [];
  $shippingPrice = new ReplaySubject<number>();
  showError = false;

  constructor(
    private cartService: CartService,
    private countryService: CountryService,
    private shippingService: ShippingService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.currentCart;

    this.subscriptions.push(
      this.countryService.$currentCountry.subscribe((currentCountry) => {
        this.selectedCountry = currentCountry;
        this.cdRef.markForCheck();
      })
    );

    if (this.cart.items.length > 0) {
      this.shippingService.setShippingCost(this.cart.totalPrice);
    }

    this.subscriptions.push(
      this.shippingService.$shippingPrice.subscribe((shippingPrice) => {
        this.cart.shippingPrice = shippingPrice;
        this.cdRef.markForCheck();
      })
    );
  }

  getItemDisplayPrice(cartItem: CartItem): number {
    return cartItem.product.price * this.selectedCountry?.conversionRateFromAud;
  }

  getItemTotalDisplayPrice(cartItem: CartItem): number {
    return (
      cartItem.product.price *
      cartItem.quantity *
      this.selectedCountry?.conversionRateFromAud
    );
  }

  getCartTotalDisplayPrice() {
    return this.cart.totalPrice * this.selectedCountry?.conversionRateFromAud;
  }

  getShippingDisplayPrice() {
    return (
      this.cart.shippingPrice * this.selectedCountry?.conversionRateFromAud
    );
  }

  removeCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem);

    if (this.cart.items.length > 0) {
      this.shippingService.setShippingCost(this.cart.totalPrice);
      this.cdRef.markForCheck();
    }
  }

  placeOrder() {
    this.cartService.placeOrder().subscribe(
      (s) => {
        this.cartService.emptyCart();
        this.router.navigate(['/order-confirm']);
      },
      (error) => {
        this.showError = true;
        this.cdRef.markForCheck();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
