import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionViewComponent } from './auction-view/auction-view.component';

const routes: Routes = [
  {path: "", component: AuctionViewComponent},
  {path: "**", component: AuctionViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
