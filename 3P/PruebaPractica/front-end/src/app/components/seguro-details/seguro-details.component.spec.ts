import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroDetailsComponent } from './seguro-details.component';

describe('SeguroDetailsComponent', () => {
  let component: SeguroDetailsComponent;
  let fixture: ComponentFixture<SeguroDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguroDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
