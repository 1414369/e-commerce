import { ShoppingCart, Product } from '@/_models';
import { Component, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { ShoppingCartService } from '@/_services';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  quantity: number;

  constructor(
    private cartService: ShoppingCartService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    const shoppingCart: SimpleChange = changes.shoppingCart;
    if (shoppingCart.currentValue) {
      this.quantity = this.getQuantity();
    }
  }

  addToCart() {
    this.cartService.add(this.product).subscribe(result => {
      this.quantity = result.quantity;
    });
  }

  removeFromCart() {
    this.cartService.remove(this.product).subscribe(result => {
      this.quantity = result.quantity;
    });
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    let product = this.shoppingCart.products.find(p => {
      return p._id === this.product._id
    })

    if (!product) return 0;

    return product.quantity;
  }
}
