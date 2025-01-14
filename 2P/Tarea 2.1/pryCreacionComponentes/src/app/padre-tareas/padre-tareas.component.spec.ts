import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadreTareasComponent } from './padre-tareas.component';

describe('PadreTareasComponent', () => {
  let component: PadreTareasComponent;
  let fixture: ComponentFixture<PadreTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PadreTareasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadreTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
