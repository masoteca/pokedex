import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CacheInterceptor } from './classes/cache-interceptor'
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonComponent,
    PokemonListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
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
