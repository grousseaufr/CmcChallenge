import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { Product } from '../../../models/product';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent implements OnInit, OnDestroy {
  @Input() product!: Product;

  selectedCountry!: Country;
  subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private countryService: CountryService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.countryService.$currentCountry.subscribe((currentCountry) => {
        this.selectedCountry = currentCountry;
        this.cdRef.markForCheck();
      })
    );
  }

  get displayPrice(): number {
    return this.product?.price * this.selectedCountry?.conversionRateFromAud;
  }

  addItemToCart() {
    this.cartService.addProduct(this.product);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
