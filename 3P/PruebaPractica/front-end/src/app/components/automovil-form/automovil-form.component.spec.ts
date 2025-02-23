import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomovilFormComponent } from './automovil-form.component';

describe('AutomovilFormComponent', () => {
  let component: AutomovilFormComponent;
  let fixture: ComponentFixture<AutomovilFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomovilFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomovilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
