import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexRoutingModule } from './pokedex-routing.module';

import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { PokemonComponent } from '../../components/pokemon/pokemon.component';
import { PokemonListItemComponent } from '../../components/pokemon-list-item/pokemon-list-item.component';
import { MoveListComponent } from '../../components/move-list/move-list.component';
import { PokemonMovementComponent } from '../../components/pokemon-movement/pokemon-movement.component';



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonComponent,
    PokemonListItemComponent,
    MoveListComponent,
    PokemonMovementComponent
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule
  ]
})
export class PokedexModule { }
