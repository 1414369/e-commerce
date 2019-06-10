import { AuthenticationService, ShoppingCartService } from '@/_services';
import { User } from '@/_models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { iAppState } from '@/store/state';
import { sShoppingCartTotalItems } from '@/store/selectors/shopping-cart.selector';
import { GetShoppingCart } from '@/store/actions/shopping-cart.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  totalItemsCount$ = this.store.pipe(select(sShoppingCartTotalItems));

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: ShoppingCartService,
    private store: Store<iAppState>
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser
      .subscribe(
        x => this.currentUser = x
      );

    this.store.dispatch(new GetShoppingCart());
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
