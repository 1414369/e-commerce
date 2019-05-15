import { AuthenticationService } from '@/_services';
import { User } from '@/_models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser
      .subscribe(
        x => this.currentUser = x
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
