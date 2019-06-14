import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '@/_services';
import { Order } from '@/_models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  userId: string;
  id: string;
  order$: Observable<Order>;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.order$ = this.orderService.get(this.id)
  }

}
