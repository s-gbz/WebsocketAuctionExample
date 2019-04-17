import { Injectable } from '@angular/core';
import { environment } from '../../src/environments/environment';
import { AuctionItem } from './auction-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private auctionChannelUrl = "update-items";
  private initialAuctionItemsUrl = "/all-items";

  constructor(private http: HttpClient) { }

  getWebsocket(): WebSocket {
    return new WebSocket(environment.webSocketUrl);
  }

  getInitialAuctionItems(): Observable<AuctionItem []> {
    return this.http.get<AuctionItem []>(environment.serverUrl + this.initialAuctionItemsUrl);
  }
}
