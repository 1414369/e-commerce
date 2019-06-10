import { AuthenticationService, ShoppingCartService } from '@/_services';
import { User } from '@/_models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { iAppState } from '@/store/state';
import { sShoppingCart } from '@/store/selectors/shopping-cart.selector';
import { GetShoppingCart } from '@/store/actions/shopping-cart.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  subscription: Subscription;
  totalItemsQuantity: number;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<iAppState>
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser
      .subscribe(
        x => this.currentUser = x
      );

    this.store.dispatch(new GetShoppingCart());
    this.store.pipe(select(sShoppingCart)).subscribe(shoppingCart => {
      this.totalItemsQuantity = shoppingCart.totalItemsQuantity;
    })
  }
}
