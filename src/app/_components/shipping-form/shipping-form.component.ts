import { User } from '@/_models';
import { OrderPayload } from '@/_models/http-request-payload';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService, AuthenticationService } from '@/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { shippingHttp } from '@/_models/http-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
  @Input('shopping-cart') shoppingCart;
  @Input('shipping') shipping = {} as shippingHttp;
  @Input('delete-action') deleteAction: boolean = false;

  orderId: string;
  userSubscription: Subscription;
  user: User;

  constructor(
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.user = this.authenticationService.currentUserValue;
  }

  deleteOrder() {
    this.orderService.delete(this.orderId).subscribe(result => {
      this.toastr.success('Delete order successfully.')
      if (this.user.isAdmin) {
        this.router.navigate(['/admin/orders']);
      } else {
        this.router.navigate(['/my/orders']);
      }
    });
  }

  placeOrder() {
    let order = new OrderPayload(this.user._id, this.shoppingCart.items, this.shipping);
    this.orderService.create(order).subscribe(result => {
      this.toastr.success('Place order successfully.')
      this.router.navigate(['/']);
    });
  }
}
