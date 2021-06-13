import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupMessagesComponent } from './setup-messages.component';

describe('SetupMessagesComponent', () => {
  let component: SetupMessagesComponent;
  let fixture: ComponentFixture<SetupMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
