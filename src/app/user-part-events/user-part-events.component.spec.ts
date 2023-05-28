import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPartEventsComponent } from './user-part-events.component';

describe('UserPartEventsComponent', () => {
  let component: UserPartEventsComponent;
  let fixture: ComponentFixture<UserPartEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPartEventsComponent]
    });
    fixture = TestBed.createComponent(UserPartEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
