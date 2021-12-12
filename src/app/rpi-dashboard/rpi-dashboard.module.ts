import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RpiDashboardRoutingModule } from './rpi-dashboard-routing.module';

import { GraficosRpiComponent} from "../components/graficos-rpi/graficos-rpi.component";
import {TempGraphComponent} from "../components/temp-graph/temp-graph.component";
import {CpuUsageComponent} from "../components/cpu-usage/cpu-usage.component";

@NgModule({
  declarations: [
      TempGraphComponent,
      CpuUsageComponent,
      GraficosRpiComponent
  ],
  imports: [
    CommonModule,
    RpiDashboardRoutingModule
  ]
})
export class RpiDashboardModule { }
