import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadreGaleriaImagenesComponent } from './padre-galeria-imagenes.component';

describe('PadreGaleriaImagenesComponent', () => {
  let component: PadreGaleriaImagenesComponent;
  let fixture: ComponentFixture<PadreGaleriaImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PadreGaleriaImagenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadreGaleriaImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
