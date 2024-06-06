import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBookingsComponent } from './dialog-bookings.component';

describe('DialogBookingsComponent', () => {
  let component: DialogBookingsComponent;
  let fixture: ComponentFixture<DialogBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
