import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadreContadorComponent } from './padre-contador.component';

describe('PadreContadorComponent', () => {
  let component: PadreContadorComponent;
  let fixture: ComponentFixture<PadreContadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PadreContadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadreContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
