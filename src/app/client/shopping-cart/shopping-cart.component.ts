import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '@/_services';
import { ShoppingCartItem } from '@/_models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  totalItemsCount$;
  cartItems: ShoppingCartItem[];
  subscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
  ) {
    this.totalItemsCount$ = this.cartService.totalCount;
    this.subscription = this.cartService.getCart().subscribe(result => {
      this.cartItems = result.products
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
