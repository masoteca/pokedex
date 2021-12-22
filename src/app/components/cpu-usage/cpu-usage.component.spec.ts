import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuUsageComponent } from './cpu-usage.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

describe('CpuUsageComponent', () => {
  let component: CpuUsageComponent;
  let fixture: ComponentFixture<CpuUsageComponent>;
  const config: SocketIoConfig = { url: 'http://192.168.0.10:8988' };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SocketIoModule.forRoot(config) ],
      declarations: [ CpuUsageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
