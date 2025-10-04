import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearSystemComponent } from './linear-system-component';

describe('LinearSystemComponent', () => {
  let component: LinearSystemComponent;
  let fixture: ComponentFixture<LinearSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinearSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinearSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
