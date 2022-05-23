import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countryServiceUrl = '';
  public $currentCountry = new ReplaySubject<Country>();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.countryServiceUrl = `${baseUrl}country`;
  }

  init() {
    if (this.hasPreviousCountry()) {
      this.$currentCountry.next(JSON.parse(localStorage.getItem('country')!));
    } else {
      this.getDefault().subscribe((defaultCountry) => {
        this.sync(defaultCountry);
        this.$currentCountry.next(defaultCountry);
      });
    }
  }

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countryServiceUrl);
  }

  getDefault(): Observable<Country> {
    return this.http.get<Country>(`${this.countryServiceUrl}/default`);
  }

  changeCountry(country: Country) {
    this.sync(country);
    this.$currentCountry.next(country);
  }

  private hasPreviousCountry(): boolean {
    return localStorage.getItem('country') !== null;
  }

  private sync(country: Country) {
    localStorage.setItem('country', JSON.stringify(country));
  }
}
