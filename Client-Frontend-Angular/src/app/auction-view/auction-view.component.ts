import { Component, OnInit, OnDestroy } from '@angular/core';

import { HttpService } from '../http.service';
import { AuctionItem } from '../auction-item';

import * as Stomp from 'stompjs';


@Component({
  selector: 'app-auction-view',
  templateUrl: './auction-view.component.html',
  styleUrls: ['./auction-view.component.scss']
})
export class AuctionViewComponent implements OnInit, OnDestroy {

  auctionItems: AuctionItem [] = [{ id: 1, price: 10, name: "Book", description: "A great book to read" }];
  websocket: WebSocket;
  client: Stomp.Client;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.openWebsocketConnection();
  }

  ngOnDestroy() {
    this.closeWebsocketConnection();
  }

  openWebsocketConnection() {
    if (!this.client) {
      this.websocket = this.httpService.getWebsocket();
      this.client = Stomp.over(this.websocket);

      this.client.connect({}, () => {
        this.client.subscribe("/update-items", (message) => {
          this.insertOrUpdateItem(JSON.parse(message.body));
        });
      });
    }
  }

  insertOrUpdateItem(item: AuctionItem) {
    const searchResultItem = this.auctionItems.find(searchedItem => searchedItem.id === item.id);

    if (searchResultItem) {
      searchResultItem.price = item.price;
    } else {
      this.auctionItems.push(item);
    }
  }

  closeWebsocketConnection() {
    if (this.client) {
      this.websocket.close();
      this.client.unsubscribe("/update-items");
    }
  }

  increaseBid(index: number, item: AuctionItem) {
    this.auctionItems[index].price += 5;
  }

  decreaseBid(index: number, item: AuctionItem) {
    this.auctionItems[index].price -= 5;
  }

  sendBid(item: AuctionItem) {
    if (this.client) {

      this.client.send("/update-items", {}, JSON.stringify(item));
    } else {
      console.log("Unable to send bid - Stomp Client undefined or null.");
    }
  }
}