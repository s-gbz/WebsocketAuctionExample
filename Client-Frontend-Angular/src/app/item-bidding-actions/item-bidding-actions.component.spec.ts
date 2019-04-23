import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBiddingActionsComponent } from './item-bidding-actions.component';

describe('ItemBiddingActionsComponent', () => {
  let component: ItemBiddingActionsComponent;
  let fixture: ComponentFixture<ItemBiddingActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemBiddingActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBiddingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
