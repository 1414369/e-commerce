import { ChatService, NEW_MESSAGE } from '@/_services/chat.service';
import { AuthenticationService } from '@/_services';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.component.html',
  styleUrls: ['./chat-tab.component.scss']
})
export class ChatTabComponent implements OnInit, OnDestroy, AfterViewChecked {
  subscription: Subscription;
  subscription1: Subscription;
  messages = {};
  selectedFriend: string = "5cddea1c6998c4308ce20c47";
  id: string;
  myID: string;

  @ViewChild("messageBox") el: ElementRef
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.myID = this.authService.currentUserValue._id;

    this.subscription1 = this.route.queryParamMap.subscribe(param => {
      this.selectedFriend = param.get('selected')
    })

    this.subscription = this.chatService.subjects[NEW_MESSAGE].subscribe(
      (wsData) => {
        this.messages[this.selectedFriend] = this.messages[this.selectedFriend] || []; this.messages[this.selectedFriend].push(wsData);
      }
    );

    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
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
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }
}
