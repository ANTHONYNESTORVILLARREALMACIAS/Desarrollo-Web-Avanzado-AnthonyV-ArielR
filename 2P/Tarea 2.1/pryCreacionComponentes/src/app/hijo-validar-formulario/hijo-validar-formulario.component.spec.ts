import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijoValidarFormularioComponent } from './hijo-validar-formulario.component';

describe('HijoValidarFormularioComponent', () => {
  let component: HijoValidarFormularioComponent;
  let fixture: ComponentFixture<HijoValidarFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HijoValidarFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HijoValidarFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
