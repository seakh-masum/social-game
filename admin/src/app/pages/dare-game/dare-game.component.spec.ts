import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DareGameComponent } from './dare-game.component';

describe('DareGameComponent', () => {
  let component: DareGameComponent;
  let fixture: ComponentFixture<DareGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DareGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DareGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
