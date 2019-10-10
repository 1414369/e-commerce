import { iSocketEvent, iSocketData } from './chat.service';
import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { environment } from 'environments/environment';
import { AuthenticationService } from './authentication.service';
import { Subscription } from 'rxjs';

@Injectable()
export class WebsocketService {
  private callbacks = {};
  public subject: WebSocketSubject<iSocketEvent<iSocketData>>;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.subject = webSocket<iSocketEvent<iSocketData>>({
      url: environment.websocketUrl,
      serializer: (data) => {
        data.token = this.authenticationService.getToken();
        return JSON.stringify(data);
      }
    });
  }

  bind(event_name, callback) {
    this.callbacks[event_name] = this.callbacks[event_name] || [];
    this.callbacks[event_name].push(callback);
  };

  send(event_name, event_data) {
    this.subject.next({ event: event_name, data: event_data });
  };

  dispatch(event_name, message) {
    var chain = this.callbacks[event_name];
    if (typeof chain == 'undefined') return; // no callbacks for this event
    for (var i = 0; i < chain.length; i++) {
      chain[i](message)
    }
  }
}