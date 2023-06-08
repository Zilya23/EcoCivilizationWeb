import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoAdminPageComponent } from './user-info-admin-page.component';

describe('UserInfoAdminPageComponent', () => {
  let component: UserInfoAdminPageComponent;
  let fixture: ComponentFixture<UserInfoAdminPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoAdminPageComponent]
    });
    fixture = TestBed.createComponent(UserInfoAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
