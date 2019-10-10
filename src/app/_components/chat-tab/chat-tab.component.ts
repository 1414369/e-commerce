import { WebsocketService, iSocketEvent, iChatMessages } from '@/_services';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.scss']
})
export class ChatTabComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  messages = {};
  selectedPerson: string = "5d0224dd2ba6282ca0586442";
  id: string;

  @ViewChild("messageBox") el: ElementRef

  constructor(
    private webSocket: WebsocketService,

  ) {
  }

  ngOnInit() {
    this.subscription = this.webSocket.subject.subscribe(
      (socketEvent: iSocketEvent<iChatMessages>) => {
        let event = socketEvent.event;
        let data = socketEvent.data;
        console.log(data);
        if (event === "new_message") {
          this.messages[data.id + this.id] = this.messages[data.id + this.id] || [];
          this.messages[data.id + this.id].push(data);
        }
      },
      err => console.log(err),
      () => console.log('complete')
    );
  }

  sendMessage(message: string) {
    message = message.trim();
    if (message != "") {
      this.webSocket.send('new_message', { receiver: '5d0224dd2ba6282ca0586442', message: message });
      this.el.nativeElement.value = "";
    }
  }

  setID(id: string) {
    this.id = id;
  }

  ngOnDestroy() {
    // this.webSocket.send('close_connection', {});
    this.subscription.unsubscribe();
  }
}
