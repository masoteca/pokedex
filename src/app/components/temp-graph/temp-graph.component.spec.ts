import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempGraphComponent } from './temp-graph.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

describe('TempGraphComponent', () => {
  let component: TempGraphComponent;
  let fixture: ComponentFixture<TempGraphComponent>;
  const config: SocketIoConfig = { url: 'http://192.168.0.10:8988' };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SocketIoModule.forRoot(config) ],
      declarations: [ TempGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
