import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailDialogComponent } from './send-mail-dialog.component';

describe('SendMailDialogComponent', () => {
  let component: SendMailDialogComponent;
  let fixture: ComponentFixture<SendMailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendMailDialogComponent]
    });
    fixture = TestBed.createComponent(SendMailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
