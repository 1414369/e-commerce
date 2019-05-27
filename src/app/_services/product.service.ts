import { Product } from '@/_models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }
  create(data) {
    return this.http.post<Product>(`${environment.apiUrl}/products`, data);
  }
  getAll() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }
  get(id) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }
  update(data) {
    return this.http.put<Product>(`${environment.apiUrl}/products`, data);
  }

}
