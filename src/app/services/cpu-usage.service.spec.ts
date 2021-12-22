import { TestBed } from '@angular/core/testing';

import { CpuUsageService } from './cpu-usage.service';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

describe('CpuUsageService', () => {
  let service: CpuUsageService;
  const config: SocketIoConfig = { url: 'http://192.168.0.10:8988' };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SocketIoModule.forRoot(config) ],
    });
    service = TestBed.inject(CpuUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
