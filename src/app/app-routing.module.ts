import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoveListComponent } from './components/move-list/move-list.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { TempGraphComponent } from './components/temp-graph/temp-graph.component';

const routes: Routes = [

  {path: '', component: PokemonListComponent},
  {path: 'pokemon/:id', component:PokemonComponent},
  {path: 'moves', component: MoveListComponent},
  {path: 'temp', component: TempGraphComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
