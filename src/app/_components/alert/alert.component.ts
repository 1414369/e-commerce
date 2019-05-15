import { AlertService } from '@/_services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  private alertSubscription: Subscription;
  message;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertSubscription = this.alertService.getMessage().subscribe((message) => {
      this.message = message;
    })
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }
}
