import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClubCardsComponent } from './view-club-cards.component';

describe('ViewClubCardsComponent', () => {
  let component: ViewClubCardsComponent;
  let fixture: ComponentFixture<ViewClubCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClubCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClubCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
