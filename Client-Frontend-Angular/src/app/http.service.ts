import { Injectable } from '@angular/core';
import { environment } from '../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private auctionChannelUrl = "update-items";

  constructor(private http: HttpService) { }

  getWebsocket(): WebSocket {
    return new WebSocket(environment.webSocketUrl);
  }
}
