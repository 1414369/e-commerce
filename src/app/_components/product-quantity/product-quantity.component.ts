import { ShoppingCart, Product } from '@/_models';
import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { iAppState } from '@/store/state';
import { AddToCart, RemoveFromCart } from '@/store/actions/shopping-cart.action';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    private store: Store<iAppState>,
  ) { }

  addToCart() {
    this.store.dispatch(new AddToCart(this.product));
  }

  removeFromCart() {
    this.store.dispatch(new RemoveFromCart(this.product));
  }

}
