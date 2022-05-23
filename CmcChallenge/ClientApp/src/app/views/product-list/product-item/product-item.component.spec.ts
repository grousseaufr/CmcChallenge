import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductItemComponent } from './product-item.component';
import { Product } from 'src/app/models/product';
import { By } from '@angular/platform-browser';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { ReplaySubject } from 'rxjs';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  const $currentCountry = new ReplaySubject<Country>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProductItemComponent],
      providers: [
        { provide: 'BASE_URL', useValue: 'http://localhost' },
        { provide: CountryService, useValue: { $currentCountry } },
      ],
    }).compileComponents();
  });

  const mockProduct = <Product>{
    productId: 1,
    description: 'test description',
    name: 'test name',
    price: 10,
  };

  const mockCountryAus = <Country>{
    countryId: 1,
    conversionRateFromAud: 1,
    currencyCode: 'AUD',
    name: 'Australia',
  };

  const mockCountryFr = <Country>{
    countryId: 2,
    conversionRateFromAud: 0.67,
    currencyCode: 'EUR',
    name: 'France',
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;

    component.product = mockProduct;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product information', () => {
    $currentCountry.next(mockCountryAus);
    fixture.detectChanges();

    const h3 = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3.textContent).toEqual(component.product.name);

    const p_description = fixture.nativeElement.querySelector('p.description')!;
    expect(p_description.textContent).toEqual(component.product.description);

    const p_price = fixture.nativeElement.querySelector('p.price')!;
    expect(p_price.textContent.trim()).toEqual(
      'Price : A$' + component.product.price.toFixed(2)
    );
  });

  describe('When changing country', () => {
    beforeEach(() => {
      $currentCountry.next(mockCountryFr);
      fixture.detectChanges();
    });

    it('should display price according to country', () => {
      const priceEur = mockProduct.price * mockCountryFr.conversionRateFromAud;
      const p_price = fixture.debugElement.query(By.css('p.price'))!;

      expect(p_price.nativeElement.textContent.trim()).toEqual(
        'Price : €' + priceEur.toFixed(2)
      );
    });
  });
});
