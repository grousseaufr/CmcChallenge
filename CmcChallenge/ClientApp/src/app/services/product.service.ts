import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productServiceUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.productServiceUrl = `${baseUrl}product`;
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productServiceUrl);
  }
}
