import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private webSocketUrl = "ws://localhost:8080/socket-registry";
  private auctionChannelUrl = "update-items";

  constructor(private http: HttpService) { }

  connectWebsocket(): WebSocket {
    return new WebSocket(this.webSocketUrl);
  }

/*   connectWebsocket(): any {
    return socketIo(this.webSocketUrl);
  } */
}
