import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearComponent } from './linear.component';

describe('LinearComponent', () => {
  let component: LinearComponent;
  let fixture: ComponentFixture<LinearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinearComponent]
    });
    fixture = TestBed.createComponent(LinearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
