import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {path: '',  loadChildren: () => import('./modules/pokedex/pokedex.module').then(m => m.PokedexModule) },

  {path: 'graficos',  loadChildren: () => import('./rpi-dashboard/rpi-dashboard.module').then(m => m.RpiDashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
