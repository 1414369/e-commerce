import { OrderPayload } from '@/_models/http-request-payload';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService, AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { shippingHttp } from '@/_models/http-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
  @Input('shopping-cart') shoppingCart;
  shipping = {} as shippingHttp;
  userSubscription: Subscription;
  userId;

  constructor(
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.userSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.userId = user._id;
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    let order = new OrderPayload(this.userId, this.shoppingCart.items, this.shipping);
    this.orderService.create(order).subscribe(result => {
      this.toastr.success('Place order successfully.')
      this.router.navigate(['/']);
    });
  }

}
