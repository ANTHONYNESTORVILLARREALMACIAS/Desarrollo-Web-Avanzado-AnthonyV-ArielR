import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijoFormularioComponent } from './hijo-formulario.component';

describe('HijoFormularioComponent', () => {
  let component: HijoFormularioComponent;
  let fixture: ComponentFixture<HijoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HijoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HijoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
