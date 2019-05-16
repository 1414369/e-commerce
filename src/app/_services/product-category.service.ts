import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<{ name: string }>(`${environment.apiUrl}/products/category`);
  }
}
