import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdminPageComponent } from './users-admin-page.component';

describe('UsersAdminPageComponent', () => {
  let component: UsersAdminPageComponent;
  let fixture: ComponentFixture<UsersAdminPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersAdminPageComponent]
    });
    fixture = TestBed.createComponent(UsersAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
