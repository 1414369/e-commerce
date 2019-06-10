import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ShoppingCart, ShoppingCartItem, Product } from '@/_models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cartId: string;
  private totalCountSubject: BehaviorSubject<number>;
  public totalItemsCount: Observable<number>;

  constructor(private http: HttpClient) {
    this.getOrCreateId().then(result => {
      this.cartId = result;
    });

    this.totalCountSubject = new BehaviorSubject<number>(0);
    this.totalItemsCount = this.totalCountSubject.asObservable();
  }

  // getCart(): Observable<ShoppingCart> {
  //   if (!this.cartId) return new Observable();
  //   return this.http.get<ShoppingCart>(`${environment.apiUrl}/shopping-carts/${this.cartId}`)
  //     .pipe(
  //       map((data) => {
  //         this.totalCountSubject.next(data.totalItemsCount);
  //         return new ShoppingCart(data.products);
  //       })
  //     );
  // }

  getCart(): Observable<ShoppingCart> {
    if (!this.cartId) return new Observable();
    return this.http.get<ShoppingCart>(`${environment.apiUrl}/shopping-carts/${this.cartId}`)
  }

  add(product: Product) {
    return this.http.post<ShoppingCartItem>(`${environment.apiUrl}/shopping-carts/${this.cartId}/items/${product._id}`, product)
      .pipe(
        map((data) => {
          this.totalCountSubject.next(this.getTotalItemsCount(data.quantity, true));
          return data;
        })
      );
  }

  remove(product: Product) {
    return this.http.put<ShoppingCartItem>(`${environment.apiUrl}/shopping-carts/${this.cartId}/items/${product._id}`, product)
      .pipe(
        map((data) => {
          this.totalCountSubject.next(this.getTotalItemsCount(data.quantity, false));
          return data;
        })
      );
  }

  private getTotalItemsCount(curQuantity: number, isAdd: boolean) {
    if (isAdd) return this.totalCountSubject.value + 1;

    if (curQuantity >= 0) {
      return this.totalCountSubject.value - 1;
    } else {
      return this.totalCountSubject.value;
    }
  }
  private create() {
    let data = {
      createdDate: new Date().getTime(),
    }
    return this.http.post<ShoppingCart>(`${environment.apiUrl}/shopping-carts`, data).toPromise();
  }

  private async getOrCreateId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create()
    localStorage.setItem('cartId', result._id);
    return result._id;
  }
}
