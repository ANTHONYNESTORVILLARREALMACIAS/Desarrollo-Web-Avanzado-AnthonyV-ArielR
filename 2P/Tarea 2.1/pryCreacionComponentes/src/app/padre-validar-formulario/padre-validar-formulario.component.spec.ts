import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadreValidarFormularioComponent } from './padre-validar-formulario.component';

describe('PadreValidarFormularioComponent', () => {
  let component: PadreValidarFormularioComponent;
  let fixture: ComponentFixture<PadreValidarFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PadreValidarFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadreValidarFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
