import { DataTableResource } from 'angular7-data-table';
import { Component, OnInit } from '@angular/core';
import { Order } from '@/_models';
import { OrderService, AuthenticationService } from '@/_services';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  tableResource: DataTableResource<Order>;
  items: Order[] = [];
  itemCount: number;
  isAdmin: boolean;

  constructor(
    private orderService: OrderService,
    private authService: AuthenticationService,
  ) {

  }

  ngOnInit() {
    this.orderService.getAll()
      .subscribe(orders => {
        this.orders = orders;
        this.initializeTable(orders);
      });

    this.isAdmin = this.authService.currentUserValue.isAdmin;
  }

  private initializeTable(orders: Order[]) {
    this.tableResource = new DataTableResource(orders);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);
  }
}
