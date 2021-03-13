import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveCrushComponent } from './love-crush.component';

describe('LoveCrushComponent', () => {
  let component: LoveCrushComponent;
  let fixture: ComponentFixture<LoveCrushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoveCrushComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoveCrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
