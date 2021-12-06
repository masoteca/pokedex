import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { CacheInterceptor } from './classes/cache-interceptor'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoveListComponent } from './components/move-list/move-list.component';
import { TempGraphComponent } from './components/temp-graph/temp-graph.component';


const socketconfig: SocketIoConfig = { url: 'http://192.168.0.10:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonComponent,
    PokemonListItemComponent,
    MoveListComponent,
    TempGraphComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(socketconfig),
    HttpClientModule,
    AppRoutingModule,
    NgbModule
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
