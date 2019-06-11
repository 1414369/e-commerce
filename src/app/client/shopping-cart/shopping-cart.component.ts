import { Component, OnInit, OnDestroy } from '@angular/core';

import { iAppState } from '@/store/state';
import { sShoppingCart } from '@/store/selectors/shopping-cart.selector';
import { GetShoppingCart, ClearCart } from '@/store/actions/shopping-cart.action';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$ = this.store.pipe(select(sShoppingCart));

  constructor(
    private store: Store<iAppState>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new GetShoppingCart());
  }

  clearCart() {
    this.store.dispatch(new ClearCart());
  }

}
