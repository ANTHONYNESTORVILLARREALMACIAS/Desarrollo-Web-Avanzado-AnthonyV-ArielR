import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroFormComponent } from './seguro-form.component';

describe('SeguroFormComponent', () => {
  let component: SeguroFormComponent;
  let fixture: ComponentFixture<SeguroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguroFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
