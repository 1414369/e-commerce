import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ChatService, FRIEND_LIST, iFriend, FIND_FRIEND_RESULT } from '@/_services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit, OnDestroy {
  @Input('selected-friend') selectedFriend;
  friendList$: Observable<iFriend[]>;
  friendResult$: Observable<iFriend>;
  friends: iFriend[];
  onSearch: boolean;
  @ViewChild("friendSearch") el: ElementRef

  constructor(
    private chatService: ChatService,

  ) {
    this.chatService.getAllFriends();
  }

  ngOnInit() {
    this.friendList$ = this.chatService.subjects[FRIEND_LIST];
    this.friendResult$ = this.chatService.subjects[FIND_FRIEND_RESULT];

  }

  ngOnDestroy() {
  }

  findFriend(id: string) {
    id = id.trim()
    if (id) {
      this.chatService.findFriend(id);
      this.onSearch = true;
    }
  }

  sreachCancel() {
    this.onSearch = false;
    this.el.nativeElement.value = "";
  }

  addFriend(id: string) {
    this.chatService.addFriend(id);
    this.sreachCancel();
  }

  removeFriend(id: string) {
    this.chatService.removeFriend(id);
  }

}
