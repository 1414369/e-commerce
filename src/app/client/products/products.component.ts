import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, ShoppingCartService } from '@/_services';
import { Product, ShoppingCart } from '@/_models';
import { switchMap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { sShoppingCartItems } from '@/store/selectors/shopping-cart.selector';
import { iAppState } from '@/store/state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  subscription: Subscription;
  shoppingCart$ = this.store.pipe(select(sShoppingCartItems));

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private store: Store<iAppState>,
  ) {

    this.subscription = this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap
      })
    ).subscribe(async params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
        this.products.filter(product => {
          return product.category == this.category;
        }) :
        this.products;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
