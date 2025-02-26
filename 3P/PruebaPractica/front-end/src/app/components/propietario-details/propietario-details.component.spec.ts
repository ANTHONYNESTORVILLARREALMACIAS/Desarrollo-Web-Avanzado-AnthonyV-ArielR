import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioDetailsComponent } from './propietario-details.component';

describe('PropietarioDetailsComponent', () => {
  let component: PropietarioDetailsComponent;
  let fixture: ComponentFixture<PropietarioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropietarioDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropietarioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
