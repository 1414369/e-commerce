
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { iAppState } from '@/store/state';
import { sShoppingCart } from '@/store/selectors/shopping-cart.selector';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  shoppingCart$;

  constructor(
    private store: Store<iAppState>,
  ) { }

  ngOnInit() {
    this.shoppingCart$ = this.store.pipe(select(sShoppingCart))
  }
}
