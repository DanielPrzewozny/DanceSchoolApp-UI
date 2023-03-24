import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenticesComponent } from './apprentices.component';

describe('ApprenticesComponent', () => {
  let component: ApprenticesComponent;
  let fixture: ComponentFixture<ApprenticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprenticesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
