import { ProductService } from './../../_services/product.service';
import { Product } from '@/_models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$;

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getAll()
  }
}
