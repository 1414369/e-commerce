import { ChatService, NEW_MESSAGE } from '@/_services/chat.service';
import { WebsocketService, iSocketEvent, iChatMessages } from '@/_services';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.scss']
})
export class ChatTabComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  messages = {};
  selectedFriend: string = "5cddea1c6998c4308ce20c47";
  id: string;

  @ViewChild("messageBox") el: ElementRef

  constructor(
    // private webSocket: WebsocketService,
    private chatService: ChatService,
    private route: ActivatedRoute,

  ) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(param => {
      this.selectedFriend = param.get('selected')
    })

    this.subscription = this.chatService.subjects[NEW_MESSAGE].subscribe(
      (wsData) => {
        console.log(wsData);
      }
    );
  }

  sendMessage(message: string) {
    this.chatService.send(message, this.selectedFriend);
    this.el.nativeElement.value = "";
  }

  findFriend(id: string) {
    this.chatService.findFriend(id);
  }
  addFriend(id: string) {
    this.chatService.addFriend(id);
  }

  removeFriend(id: string) {
    this.chatService.removeFriend(id);
  }

  getAllFriends() {
    this.chatService.getAllFriends();
  }

  ngOnDestroy() {
    // this.webSocket.send('close_connection', {});
    this.subscription.unsubscribe();
  }
}
