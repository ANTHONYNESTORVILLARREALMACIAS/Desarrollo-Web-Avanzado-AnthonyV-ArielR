import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadreCarritoComponent } from './padre-carrito.component';

describe('PadreCarritoComponent', () => {
  let component: PadreCarritoComponent;
  let fixture: ComponentFixture<PadreCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PadreCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadreCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
