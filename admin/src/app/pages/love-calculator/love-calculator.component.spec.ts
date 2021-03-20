import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveCalculatorComponent } from './love-calculator.component';

describe('LoveCalculatorComponent', () => {
  let component: LoveCalculatorComponent;
  let fixture: ComponentFixture<LoveCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoveCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoveCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
