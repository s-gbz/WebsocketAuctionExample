import { Injectable } from '@angular/core';
import { environment } from '../../src/environments/environment';
import { AuctionItem } from './auction-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private getAllAuctionItemsUrl = "/all-items";
  private updateAuctionItemsUrl = "/update-item";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  updateItem(item: AuctionItem): Observable<boolean> {
    return this.http.post<boolean>(environment.serverUrl + this.updateAuctionItemsUrl, JSON.stringify(item), this.httpOptions);
  }

  getWebsocket(): WebSocket {
    return new WebSocket(environment.webSocketUrl);
  }

  getInitialAuctionItems(): Observable<AuctionItem []> {
    return this.http.get<AuctionItem []>(environment.serverUrl + this.getAllAuctionItemsUrl);
  }
}
