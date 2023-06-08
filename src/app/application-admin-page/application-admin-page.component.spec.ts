import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAdminPageComponent } from './application-admin-page.component';

describe('ApplicationAdminPageComponent', () => {
  let component: ApplicationAdminPageComponent;
  let fixture: ComponentFixture<ApplicationAdminPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationAdminPageComponent]
    });
    fixture = TestBed.createComponent(ApplicationAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
