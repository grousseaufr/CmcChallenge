import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  private shippingServiceUrl = '';
  public $shippingPrice = new ReplaySubject<number>();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.shippingServiceUrl = `${baseUrl}shipping`;
  }

  getShippingCost(totalPrice: number): Observable<number> {
    let params = new HttpParams().set('totalPrice', totalPrice);
    return this.http.get<number>(this.shippingServiceUrl, { params });
  }

  setShippingCost(totalPrice: number) {
    let params = new HttpParams().set('totalPrice', totalPrice);
    this.http
      .get<number>(this.shippingServiceUrl, { params })
      .subscribe((shippingPrice) => this.$shippingPrice.next(shippingPrice));
  }
}
