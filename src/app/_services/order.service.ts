import { OrderHttp } from '@/_models/http-models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { OrderPayload } from '@/_models/http-request-payload';

import { Store } from '@ngrx/store';
import { iAppState } from '@/store/state';
import { ClearCart } from '@/store/actions/shopping-cart.action';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private store: Store<iAppState>,
  ) {

  }

  create(data: OrderPayload) {
    return this.http.post<OrderHttp>(`${environment.apiUrl}/orders`, data).pipe(
      tap(() => {
        this.store.dispatch(new ClearCart());
      })
    );
  }

  getAll() {
    return this.http.get<OrderHttp[]>(`${environment.apiUrl}/orders`);
  }
  get(id) {
    return this.http.get<OrderHttp>(`${environment.apiUrl}/orders/${id}`);
  }

  delete(id) {
    return this.http.delete<OrderHttp>(`${environment.apiUrl}/orders/${id}`);
  }
}
