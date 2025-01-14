import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijoGaleriaImagenesComponent } from './hijo-galeria-imagenes.component';

describe('HijoGaleriaImagenesComponent', () => {
  let component: HijoGaleriaImagenesComponent;
  let fixture: ComponentFixture<HijoGaleriaImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HijoGaleriaImagenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HijoGaleriaImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
