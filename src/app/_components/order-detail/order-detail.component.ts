import { Component, OnInit } from '@angular/core';
import { OrderService } from '@/_services';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  userId: string;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.orderService.getAllByUser()
      .subscribe(order => {
        console.log(order);
      });
  }

}
