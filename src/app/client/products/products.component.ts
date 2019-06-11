import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '@/_services';
import { Product } from '@/_models';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { sShoppingCart } from '@/store/selectors/shopping-cart.selector';
import { iAppState } from '@/store/state';

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
  shoppingCart$ = this.store.pipe(select(sShoppingCart));

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store<iAppState>,
  ) { }

  ngOnInit() {
    this.populateProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private populateProducts() {
    this.subscription = this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap
      })
    ).subscribe(async params => {
      this.category = params.get('category');
      this.applyFillter();
    })
  }

  private applyFillter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => { return p.category == this.category; }) :
      this.products;
  }
}
