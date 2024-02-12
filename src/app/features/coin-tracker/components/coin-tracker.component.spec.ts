import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinTrackerComponent } from './coin-tracker.component';

describe('CoinTrackerComponent', () => {
  let component: CoinTrackerComponent;
  let fixture: ComponentFixture<CoinTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
