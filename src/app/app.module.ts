import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { CacheInterceptor } from './classes/cache-interceptor'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import {RpiDashboardModule} from './modules/rpi-dashboard/rpi-dashboard.module';
import {PokedexModule} from './modules/pokedex/pokedex.module';

import {FormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
const socketconfig: SocketIoConfig = { url: 'http://192.168.0.10:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(socketconfig),
    HttpClientModule,
    AppRoutingModule,
    RpiDashboardModule,
    PokedexModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
