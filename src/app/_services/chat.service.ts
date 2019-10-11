import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

export const NEW_MESSAGE = 'new_message';
export const FRIEND_LIST = 'friend_list';
export const FIND_FRIEND_RESULT = 'find_friend_result';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  events: string[] = [NEW_MESSAGE, FRIEND_LIST, FIND_FRIEND_RESULT];
  subjects: Subject<any>[] = [];

  constructor(
    private webSocket: WebsocketService,
  ) {
    this.events.forEach((eventType) => {
      this.subjects[eventType] = new Subject();
    });

    this.webSocket.subject.pipe(
      tap((wsData) => this.subjects[wsData.event].next(wsData.data))
    ).subscribe((dump) => { });
  }

  send(message: string, targetID: string) {
    message = message.trim();
    if (message != "") {
      this.webSocket.send('new_message', { receiver: targetID, message: message });
    }
  }

  findFriend(id: string) {
    this.webSocket.send("find_friend", { friend_id: id });
  }
  addFriend(id: string) {
    this.webSocket.send("add_friend", { friend_id: id });
  }

  removeFriend(id: string) {
    this.webSocket.send("remove_friend", { friend_id: id });
  }

  getAllFriends() {
    this.webSocket.send("get_friends", {});
  }
}

export interface iSocketEvent<T> {
  event: string,
  data: T,
  token?: string,
}

export interface iSocketData {
  time_date: number,
}
export interface iChatMessages extends iSocketData {
  id: string,
  receiver: string,
  message: string,
}

export interface iFriend {
  messages: string[],
  lastDateMessage: number,
  friendDate: number,
  userInfo: {
    _id: string,
    name: string
  },
}