import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuctionViewComponent } from './auction-view/auction-view.component';
import { ItemBiddingActionsComponent } from './item-bidding-actions/item-bidding-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    AuctionViewComponent,
    ItemBiddingActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
