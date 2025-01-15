import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionEntradaSalidaComponent } from './operacion-entrada-salida.component';

describe('OperacionEntradaSalidaComponent', () => {
  let component: OperacionEntradaSalidaComponent;
  let fixture: ComponentFixture<OperacionEntradaSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperacionEntradaSalidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperacionEntradaSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
