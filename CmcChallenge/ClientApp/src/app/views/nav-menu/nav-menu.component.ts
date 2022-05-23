import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isExpanded = false;
  selectedCountry!: Country;
  countries!: Country[];
  subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.countryService.getAll().subscribe((countries) => {
        this.countries = countries;
      })
    );

    this.countryService.$currentCountry.subscribe(
      (currentCountry) => (this.selectedCountry = currentCountry)
    );
  }

  compareFn = (a: Country, b: Country) => this._compareFn(a, b);
  _compareFn(a: Country, b: Country) {
    if (!!a && !!b) {
      return a.countryId === b.countryId;
    }
    return false;
  }

  get isViewCartLinkVisible(): boolean {
    return this.cartService.length > 0;
  }
  get cartItemCount(): number {
    return this.cartService.length;
  }

  onCountryChange(event: Event) {
    this.countryService.changeCountry(this.selectedCountry);
    this.cartService.changeCurrency(this.selectedCountry.currencyCode);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
