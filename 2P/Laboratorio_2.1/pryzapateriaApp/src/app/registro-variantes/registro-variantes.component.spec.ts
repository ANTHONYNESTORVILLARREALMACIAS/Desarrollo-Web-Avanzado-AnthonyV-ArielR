import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVariantesComponent } from './registro-variantes.component';

describe('RegistroVariantesComponent', () => {
  let component: RegistroVariantesComponent;
  let fixture: ComponentFixture<RegistroVariantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroVariantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroVariantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
