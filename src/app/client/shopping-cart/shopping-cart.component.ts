import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '@/_services';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  totalItemsCount$;
  cart$;

  constructor(
    private cartService: ShoppingCartService,
  ) {
    this.totalItemsCount$ = this.cartService.totalItemsCount;
    this.cart$ = this.cartService.getCart();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
