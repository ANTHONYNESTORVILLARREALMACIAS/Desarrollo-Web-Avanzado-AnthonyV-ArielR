import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroListComponent } from './seguro-list.component';

describe('SeguroListComponent', () => {
  let component: SeguroListComponent;
  let fixture: ComponentFixture<SeguroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguroListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
