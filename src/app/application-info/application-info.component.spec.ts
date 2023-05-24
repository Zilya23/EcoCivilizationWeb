import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationInfoComponent } from './application-info.component';

describe('ApplicationInfoComponent', () => {
  let component: ApplicationInfoComponent;
  let fixture: ComponentFixture<ApplicationInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationInfoComponent]
    });
    fixture = TestBed.createComponent(ApplicationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
