import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreatedEventsComponent } from './user-created-events.component';

describe('UserCreatedEventsComponent', () => {
  let component: UserCreatedEventsComponent;
  let fixture: ComponentFixture<UserCreatedEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCreatedEventsComponent]
    });
    fixture = TestBed.createComponent(UserCreatedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
