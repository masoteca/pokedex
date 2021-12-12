import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GraficosRpiComponent} from "../components/graficos-rpi/graficos-rpi.component";

const routes: Routes = [
  {
    path: '', component : GraficosRpiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpiDashboardRoutingModule { }
