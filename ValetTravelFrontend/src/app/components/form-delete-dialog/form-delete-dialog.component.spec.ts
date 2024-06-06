import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeleteDialogComponent } from './form-delete-dialog.component';

describe('FormDeleteDialogComponent', () => {
  let component: FormDeleteDialogComponent;
  let fixture: ComponentFixture<FormDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
