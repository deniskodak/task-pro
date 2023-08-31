import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsItemComponent } from './columns-item.component';

describe('ColumnsItemComponent', () => {
  let component: ColumnsItemComponent;
  let fixture: ComponentFixture<ColumnsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnsItemComponent]
    });
    fixture = TestBed.createComponent(ColumnsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
