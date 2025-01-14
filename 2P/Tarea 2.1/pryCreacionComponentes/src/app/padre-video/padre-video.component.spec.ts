import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadreVideoComponent } from './padre-video.component';

describe('PadreVideoComponent', () => {
  let component: PadreVideoComponent;
  let fixture: ComponentFixture<PadreVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PadreVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadreVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
