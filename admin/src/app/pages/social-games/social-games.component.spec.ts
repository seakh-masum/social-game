import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialGamesComponent } from './social-games.component';

describe('SocialGamesComponent', () => {
  let component: SocialGamesComponent;
  let fixture: ComponentFixture<SocialGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
