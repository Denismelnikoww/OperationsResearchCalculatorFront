import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymplexComponent } from './symplex-component';

describe('SymplexComponent', () => {
  let component: SymplexComponent;
  let fixture: ComponentFixture<SymplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SymplexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
