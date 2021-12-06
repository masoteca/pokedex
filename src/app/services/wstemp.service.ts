import { Injectable } from '@angular/core';
import {Socket } from 'ngx-socket-io'
import { ServerTemp } from '../interfaces/server-temp';

@Injectable({
  providedIn: 'root'
})
export class WstempService {

  constructor(private socket: Socket) { }


  getTemperature() {
    return  this.socket.fromEvent('temperatura');

  }


}
