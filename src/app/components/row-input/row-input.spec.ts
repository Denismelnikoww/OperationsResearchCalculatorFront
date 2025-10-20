import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowInput } from './row-input';

describe('RowInput', () => {
  let component: RowInput;
  let fixture: ComponentFixture<RowInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
