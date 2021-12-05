import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CacheInterceptor } from './classes/cache-interceptor'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoveListComponent } from './components/move-list/move-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonComponent,
    PokemonListItemComponent,
    MoveListComponent
  ],
  imports: [
    BrowserModule,
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
