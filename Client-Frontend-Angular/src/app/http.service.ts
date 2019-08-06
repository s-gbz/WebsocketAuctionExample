import { Injectable } from '@angular/core';
import { AuctionItem } from './auction-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private getAllAuctionItemsUrl = "/all-items";
  private updateAuctionItemsUrl = "/item-updates";
  private serverUrl = "http://localhost:8080";
  private webSocketUrl = "ws://localhost:8080/socket-registry";

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  updateItem(item: AuctionItem): Observable<boolean> {
    return this.http.post<boolean>(this.serverUrl + this.updateAuctionItemsUrl, JSON.stringify(item), this.httpOptions);
  }

  getWebSocket(): WebSocket {
    return new WebSocket(this.webSocketUrl);
  }

  initializeAuctionItems(): Observable<AuctionItem []> {
    return this.http.get<AuctionItem []>(this.serverUrl + this.getAllAuctionItemsUrl);
  }
}
