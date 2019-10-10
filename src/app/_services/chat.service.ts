import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
  ) {
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