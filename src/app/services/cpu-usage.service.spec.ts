import { TestBed } from '@angular/core/testing';

import { CpuUsageService } from './cpu-usage.service';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

describe('CpuUsageService', () => {
  let service: CpuUsageService;
  const config: SocketIoConfig = { url: 'http://192.168.0.10:2020' };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SocketIoModule.forRoot(config) ],
    });
    service = TestBed.inject(CpuUsageService);

  });
  afterEach(() => {

  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('get cpu data', () => {
    expect(service.getCpu()).toBeTruthy();
  })
});
