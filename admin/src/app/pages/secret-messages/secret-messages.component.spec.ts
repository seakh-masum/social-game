import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretMessagesComponent } from './secret-messages.component';

describe('SecretMessagesComponent', () => {
  let component: SecretMessagesComponent;
  let fixture: ComponentFixture<SecretMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
