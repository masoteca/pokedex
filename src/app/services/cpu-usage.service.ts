import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CpuData } from '../interfaces/cpu-data';

@Injectable({
  providedIn: 'root'
})
export class CpuUsageService {


  constructor(private socket: Socket) { }


  getCpu() {
    return  this.socket.fromEvent<Array<CpuData>>('cpu_usage');

  }
}
