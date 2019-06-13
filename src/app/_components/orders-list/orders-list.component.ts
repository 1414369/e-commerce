import { DataTableResource } from 'angular7-data-table';
import { Component, OnInit } from '@angular/core';
import { OrderPayload } from '@/_models/http-request-payload';
import { OrderService } from '@/_services';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: OrderPayload[] = [];
  tableResource: DataTableResource<OrderPayload>;
  items: OrderPayload[] = [];
  itemCount: number;

  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
    this.orderService.getAll()
      .subscribe(orders => {
        console.log(orders);
        this.orders = orders;
        this.initializeTable(orders);
      });
  }

  private initializeTable(orders: OrderPayload[]) {
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
