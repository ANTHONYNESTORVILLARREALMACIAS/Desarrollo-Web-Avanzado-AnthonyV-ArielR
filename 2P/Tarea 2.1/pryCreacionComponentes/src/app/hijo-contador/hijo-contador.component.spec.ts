import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijoContadorComponent } from './hijo-contador.component';

describe('HijoContadorComponent', () => {
  let component: HijoContadorComponent;
  let fixture: ComponentFixture<HijoContadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HijoContadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HijoContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
