import { Component, Input } from '@angular/core';
import { ProductCategoryService } from '@/_services';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  productsCategories$;
  @Input('category') category;

  constructor(
    private productCategoryService: ProductCategoryService,
  ) {
    this.productsCategories$ = this.productCategoryService.getAll();
  }
}
