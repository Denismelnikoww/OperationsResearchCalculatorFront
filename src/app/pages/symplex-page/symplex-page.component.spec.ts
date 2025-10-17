import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymplexPage } from './symplex-page.component';

describe('SymplexComponent', () => {
  let component: SymplexPage;
  let fixture: ComponentFixture<SymplexPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SymplexPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymplexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
