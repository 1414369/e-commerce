import { ShoppingCart, Product } from '@/_models';
import { Component, Input, SimpleChanges, SimpleChange, OnInit } from '@angular/core';
import { ShoppingCartService } from '@/_services';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService,
  ) { }

  addToCart() {
    this.cartService.add(this.product).subscribe(result => {
    });
  }

  removeFromCart() {
    this.cartService.remove(this.product).subscribe(result => {
    });
  }
}
