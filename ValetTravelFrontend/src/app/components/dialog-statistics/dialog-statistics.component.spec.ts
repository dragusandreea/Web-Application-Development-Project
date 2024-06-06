import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStatisticsComponent } from './dialog-statistics.component';

describe('DialogStatisticsComponent', () => {
  let component: DialogStatisticsComponent;
  let fixture: ComponentFixture<DialogStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
