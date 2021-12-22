import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosRpiComponent } from './graficos-rpi.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

describe('GraficosRpiComponent', () => {
  let component: GraficosRpiComponent;
  let fixture: ComponentFixture<GraficosRpiComponent>;
  const config: SocketIoConfig = { url: 'http://192.168.0.10:8988' };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SocketIoModule.forRoot(config) ],
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
