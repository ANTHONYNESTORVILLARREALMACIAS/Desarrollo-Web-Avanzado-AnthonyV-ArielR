import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioListComponent } from './propietario-list.component';

describe('PropietarioListComponent', () => {
  let component: PropietarioListComponent;
  let fixture: ComponentFixture<PropietarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropietarioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropietarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
