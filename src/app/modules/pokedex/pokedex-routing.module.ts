import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "../../components/pokemon-list/pokemon-list.component";
import {PokemonComponent} from "../../components/pokemon/pokemon.component";
import {MoveListComponent} from "../../components/move-list/move-list.component";
import {PokemonMovementComponent} from "../../components/pokemon-movement/pokemon-movement.component";

const routes: Routes = [

  {path: '', component: PokemonListComponent},
  {path: 'pokemon/:id', component:PokemonComponent},
  {path: 'moves', component: MoveListComponent},
  {path: 'movimiento/:id', component: PokemonMovementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokedexRoutingModule { }
