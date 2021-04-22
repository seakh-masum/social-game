import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoynomousUsersComponent } from './annoynomous-users.component';

describe('AnnoynomousUsersComponent', () => {
  let component: AnnoynomousUsersComponent;
  let fixture: ComponentFixture<AnnoynomousUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnoynomousUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoynomousUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
