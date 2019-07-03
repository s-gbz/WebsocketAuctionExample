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

  auctionItems: AuctionItem[] = [];
  webSocket: WebSocket;
  client: Stomp.Client;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.openWebSocketConnection();
    this.initializeAuctionItems();
  }

  ngOnDestroy() {
    this.closeWebSocketConnection();
  }

  openWebSocketConnection() {
    this.webSocket = this.httpService.getWebSocket();

    this.client = Stomp.over(this.webSocket);

    this.client.connect({}, () => {
      this.client.subscribe("/item-updates", (item) => {
        this.insertOrUpdateItem(JSON.parse(item.body));
      });
    });
  }

  initializeAuctionItems() {
    this.httpService.initializeAuctionItems().subscribe((items) => {
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

  closeWebSocketConnection() {
    if (this.client) {
      this.webSocket.close();
      this.client.unsubscribe("/item-updates");
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
      if (this.isNewBidHigherThanTopBid(index)) {
        this.setCurrentBidToTopBid(index);
        this.increaseBiddingTimeForItem(index);

        this.updateItemAndSendBid(this.auctionItems[index]);     
      }
    } else {
      console.log("Unable to send bid - Stomp Client undefined or null.");
    }
  }

  updateItemAndSendBid(item: AuctionItem) {
    this.httpService.updateItem(item).subscribe((success: boolean) => {
      console.log(`Update for ${item} was ${success}`);
    });
    this.client.send("/item-updates", {}, JSON.stringify(item));
  }

  isNewBidHigherThanTopBid(index: number): boolean {
    return this.auctionItems[index].newBid > this.auctionItems[index].topBid;
  }

  setCurrentBidToTopBid(index: number) {
    this.auctionItems[index].currentBid = this.auctionItems[index].newBid;
    this.auctionItems[index].topBid = this.auctionItems[index].newBid;
  }

  increaseBiddingTimeForItem(index: number) {
    this.auctionItems[index].timeLeft += 15;
  }

  endAuction(item: AuctionItem) {
    if (this.client) {
      this.updateItemAndSendBid(item);
    } else {
      console.log("Unable to send bid - Stomp Client undefined or null.");
    }
  }
}
