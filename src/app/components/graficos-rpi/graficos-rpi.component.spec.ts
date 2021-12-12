import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosRpiComponent } from './graficos-rpi.component';

describe('GraficosRpiComponent', () => {
  let component: GraficosRpiComponent;
  let fixture: ComponentFixture<GraficosRpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficosRpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosRpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
