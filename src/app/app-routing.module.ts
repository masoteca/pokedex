import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficosRpiComponent } from './components/graficos-rpi/graficos-rpi.component';
import { MoveListComponent } from './components/move-list/move-list.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';


const routes: Routes = [

  {path: '', component: PokemonListComponent},
  {path: 'pokemon/:id', component:PokemonComponent},
  {path: 'moves', component: MoveListComponent},
  {path: 'graficos', component: GraficosRpiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
