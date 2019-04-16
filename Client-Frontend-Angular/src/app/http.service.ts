import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private webSocketUrl = "ws://localhost:8080/socket-registry";
  private auctionChannelUrl = "update-items";

  constructor(private http: HttpService) { }

  getWebsocket(): WebSocket {
    return new WebSocket(this.webSocketUrl);
  }
}
