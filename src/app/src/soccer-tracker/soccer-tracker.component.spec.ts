import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerTrackerComponent } from './soccer-tracker.component';

fdescribe('SoccerTrackerComponent', () => {
  let component: SoccerTrackerComponent;
  let fixture: ComponentFixture<SoccerTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoccerTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
