import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountPageComponent } from './user-account-page.component';

describe('UserAccountPageComponent', () => {
  let component: UserAccountPageComponent;
  let fixture: ComponentFixture<UserAccountPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccountPageComponent]
    });
    fixture = TestBed.createComponent(UserAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
