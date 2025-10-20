import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportConditions } from './transport-conditions';

describe('TransportConditions', () => {
  let component: TransportConditions;
  let fixture: ComponentFixture<TransportConditions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportConditions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportConditions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
