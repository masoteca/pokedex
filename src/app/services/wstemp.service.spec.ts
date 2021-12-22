import { TestBed } from '@angular/core/testing';
import {SocketIoModule, SocketIoConfig } from 'ngx-socket-io'
import { WstempService } from './wstemp.service';

describe('WstempService', () => {
  let service: WstempService;
  const config: SocketIoConfig = { url: 'http://192.168.0.10:8988' };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SocketIoModule.forRoot(config) ],
    });
    service = TestBed.inject(WstempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
