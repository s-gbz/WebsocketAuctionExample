import { Component, OnInit, OnDestroy } from '@angular/core';

import { timer, interval, Observable } from 'rxjs'
import { map, take, startWith } from 'rxjs/operators'


import { HttpService } from '../http.service';
import { AuctionItem } from '../auction-item';

import * as Stomp from 'stompjs';


@Component({
  selector: 'app-auction-view',
  templateUrl: './auction-view.component.html',
  styleUrls: ['./auction-view.component.scss']
})
export class AuctionViewComponent implements OnInit, OnDestroy {

  debuging = false;
  auctionItems: AuctionItem[] = [];
  websocket: WebSocket;
  client: Stomp.Client;
  clientConnected = "false";
  time;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.openWebsocketConnection();
    this.getInitialAuctionItems();
  }

  ngOnDestroy() {
    this.closeWebsocketConnection();
  }

  openWebsocketConnection() {
    this.websocket = this.httpService.getWebsocket();

    this.client = Stomp.over(this.websocket);

    this.client.connect({}, () => {
      this.client.subscribe("/update-items", (message) => {
        this.insertOrUpdateItem(JSON.parse(message.body));
      });
    });
  }

  getInitialAuctionItems() {
    this.httpService.getInitialAuctionItems().subscribe((items) => {
      this.auctionItems = items;

      this.auctionItems.forEach(item => this.initCountdown(item));
    });
  }

  insertOrUpdateItem(item: AuctionItem) {
    const searchResultItem = this.auctionItems.find(searchedItem => searchedItem.id === item.id);

    if (searchResultItem) {
      searchResultItem.topBid = item.currentBid;
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

  initCountdown(item: AuctionItem) {
    var counter = item.timeLeft;

    var interval = setInterval(() => {
      this.time = counter;
      counter--;

      if (counter < 0) {

        clearInterval(interval);
      };
    }, 1000);
  }

  increaseBid(index: number, item: AuctionItem) {
    this.auctionItems[index].newBid += 5;
  }

  decreaseBid(index: number, item: AuctionItem) {
    let newBid = this.auctionItems[index].newBid;
    newBid -= 5;

    if (newBid >= this.auctionItems[index].topBid) {
      this.auctionItems[index].newBid = newBid;
    }
  }

  sendBid(index: number) {
    if (this.client) {
      this.auctionItems[index].currentBid = this.auctionItems[index].newBid;
      this.client.send("/update-items", {}, JSON.stringify(this.auctionItems[index]));
    } else {
      console.log("Unable to send bid - Stomp Client undefined or null.");
    }
  }
}
