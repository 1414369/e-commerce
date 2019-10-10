import { iSocketEvent, iChatMessages } from '@/_services';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService, AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'e-commerce';
  subscription: Subscription;

  constructor(
    private webSocket: WebsocketService,
    private authenticationService: AuthenticationService

  ) {
    this.authenticationService.currentUser.subscribe(
      (user) => {
        if (user) {
          this.webSocket.send('register_user', {}); // User logged in. Websocket is online.
          this.subscription = this.webSocket.subject.subscribe((dump) => { });
        } else {
          this.webSocket.subject.complete();
          if (this.subscription) {
            this.subscription.unsubscribe();
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.webSocket.subject.complete();
  }
}
