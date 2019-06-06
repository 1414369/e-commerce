import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, ShoppingCartService } from '@/_services';
import { Product, ShoppingCart } from '@/_models';
import { switchMap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  subscription: Subscription;
  shoppingCart: ShoppingCart;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    this.subscription = this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap
      })
    ).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
        this.products.filter(product => {
          return product.category == this.category;
        }) :
        this.products;

      //Update cart every time change filter
      this.updateCart();
    })
  }

  ngOnInit() {
    this.updateCart();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateCart() {
    this.cartService.getCart().subscribe((x) => {
      this.shoppingCart = x
    });
  }
}
