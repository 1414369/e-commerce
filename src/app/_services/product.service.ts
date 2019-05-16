import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<{ name: string }>(`${environment.apiUrl}/products`);
  }

  create(data) {
    return this.http.post(`${environment.apiUrl}/products`, data);
  }
}
