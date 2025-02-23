import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomovilDetailsComponent } from './automovil-details.component';

describe('AutomovilDetailsComponent', () => {
  let component: AutomovilDetailsComponent;
  let fixture: ComponentFixture<AutomovilDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomovilDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomovilDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
