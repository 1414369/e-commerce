import { ShoppingCart } from '@/_models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('shopping-cart') cart: ShoppingCart
  
  constructor() { }

  ngOnInit() {
  }

}
