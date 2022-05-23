import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of, ReplaySubject } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { OrderConfirmComponent } from '../order-confirm/order-confirm.component';

import { NavMenuComponent } from './nav-menu.component';

describe('OrderConfirmComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let $currentCountryMock = new ReplaySubject<Country>();

  const spyObj = {
    ...jasmine.createSpyObj('CountryService', ['getAll']),
    $country: $currentCountryMock,
  };

  const mockCountries = <Country[]>[
    {
      countryId: 1,
      conversionRateFromAud: 1,
      currencyCode: 'AUD',
      name: 'Australia',
    },
    {
      countryId: 2,
      conversionRateFromAud: 0.67,
      currencyCode: 'EUR',
      name: 'France',
    },
  ];

  beforeEach(async () => {
    let mockCountryService = {
      $currentCountry: $currentCountryMock,
      ...jasmine.createSpyObj('CountryService', ['getAll']),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
      declarations: [NavMenuComponent, OrderConfirmComponent],
      providers: [
        { provide: 'BASE_URL', useValue: 'http://localhost' },
        {
          provide: CountryService,
          useValue: mockCountryService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;

    let countryServiceSpy = TestBed.inject(
      CountryService
    ) as jasmine.SpyObj<CountryService>;
    countryServiceSpy.getAll.and.returnValue(of(mockCountries));

    $currentCountryMock.next(mockCountries[0]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries', () => {
    const selectCountry = fixture.debugElement.queryAll(
      By.css('select option')
    );
    expect(selectCountry.length).toBe(2);
  });
});
