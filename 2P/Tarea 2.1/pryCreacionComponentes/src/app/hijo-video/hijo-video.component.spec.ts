import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijoVideoComponent } from './hijo-video.component';

describe('HijoVideoComponent', () => {
  let component: HijoVideoComponent;
  let fixture: ComponentFixture<HijoVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HijoVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HijoVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
