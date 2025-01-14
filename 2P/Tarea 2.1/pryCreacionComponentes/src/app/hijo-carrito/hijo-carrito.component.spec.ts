import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijoCarritoComponent } from './hijo-carrito.component';

describe('HijoCarritoComponent', () => {
  let component: HijoCarritoComponent;
  let fixture: ComponentFixture<HijoCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HijoCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HijoCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
