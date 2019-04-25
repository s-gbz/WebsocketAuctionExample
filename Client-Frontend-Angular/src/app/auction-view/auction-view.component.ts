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

  debuging = false;
  auctionItems: AuctionItem[] = [];
  websocket: WebSocket;
  client: Stomp.Client;
  clientConnected = "false";

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
      searchResultItem.topBid = item.topBid;
      searchResultItem.newBid = item.topBid;
      searchResultItem.timeLeft = item.timeLeft;
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
    let interval = setInterval(() => {
      item.timeLeft--;

      if (item.timeLeft < 0) {
        item.timeLeft = 0;
        this.endAuction(item);
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
      if (this.auctionItems[index].newBid > this.auctionItems[index].topBid) {
        this.auctionItems[index].currentBid = this.auctionItems[index].newBid;
        this.auctionItems[index].topBid = this.auctionItems[index].newBid;

        this.auctionItems[index].timeLeft += 15;
        this.httpService.updateItem(this.auctionItems[index]).subscribe((success: boolean) => {
          console.log(`Update for ${this.auctionItems[index]} was ${success}`);
        });
        this.client.send("/update-items", {}, JSON.stringify(this.auctionItems[index]));
      }
    } else {
      console.log("Unable to send bid - Stomp Client undefined or null.");
    }
  }

  endAuction(item: AuctionItem) {
    if (this.client) {
      this.httpService.updateItem(item).subscribe((success: boolean) => {
        console.log(`Update for ${item} was ${success}`);
      });
      this.client.send("/update-items", {}, JSON.stringify(item));
    } else {
      console.log("Unable to send bid - Stomp Client undefined or null.");
    }
  }
}
