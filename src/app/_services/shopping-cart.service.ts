import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Product } from '@/_models';
import { ShoppingCartHttp, ShoppingCartItemHttp } from '@/_models/http-models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cartId: string;

  constructor(private http: HttpClient) {
    this.getOrCreateId().then(result => {
      this.cartId = result;
    });
  }

  getCart(): Observable<ShoppingCartHttp> {
    if (!this.cartId) return new Observable();
    return this.http.get<ShoppingCartHttp>(`${environment.apiUrl}/shopping-carts/${this.cartId}`)
  }

  clearCart(): Observable<ShoppingCartHttp> {
    if (!this.cartId) return new Observable();
    return this.http.put<ShoppingCartHttp>(`${environment.apiUrl}/shopping-carts/${this.cartId}`, {})
  }

  add(product: Product) {
    return this.http.post<ShoppingCartItemHttp>(`${environment.apiUrl}/shopping-carts/${this.cartId}/items/${product._id}`, product)
  }

  remove(product: Product) {
    return this.http.put<ShoppingCartItemHttp>(`${environment.apiUrl}/shopping-carts/${this.cartId}/items/${product._id}`, product)
  }

  private create() {
    let data = {
      createdDate: new Date().getTime(),
    }
    return this.http.post<ShoppingCartHttp>(`${environment.apiUrl}/shopping-carts`, data).toPromise();
  }

  private async getOrCreateId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create()
    localStorage.setItem('cartId', result._id);
    return result._id;
  }
}
