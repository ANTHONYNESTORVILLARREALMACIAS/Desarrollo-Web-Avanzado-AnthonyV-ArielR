import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadreFormularioComponent } from './padre-formulario.component';

describe('PadreFormularioComponent', () => {
  let component: PadreFormularioComponent;
  let fixture: ComponentFixture<PadreFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PadreFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadreFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
