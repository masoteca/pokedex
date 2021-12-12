import { Component, Inject, OnInit } from '@angular/core';
import * as moment from 'moment';
import { map } from 'rxjs';
import { ServerTemp } from 'src/app/interfaces/server-temp';
import { WstempService } from 'src/app/services/wstemp.service';
import Chart from 'chart.js/auto';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-temp-graph',
  templateUrl: './temp-graph.component.html',
  styleUrls: ['./temp-graph.component.scss']
})
export class TempGraphComponent implements OnInit {
  public data :Array<any>[] = [ ];
  public labels = [] as any;
  public datasets = [{
    tension: 0.1,
    fill: true,
    label:  "Temperatura Rpi",
    data: [] as  any
  }]
  public chart: any;

  constructor(private temperaturaService: WstempService,@Inject(DOCUMENT) private _document: any) { }
  public dataTemp  :Array<any>[]= [];





  ngOnInit(): void {
    const canvas = this._document.getElementById('chart_temp');
    this.drawSample(canvas);
    this.getTemp().pipe(
      map(data => {
        (data as ServerTemp).time = moment((data as ServerTemp).time).format("YYYY-MM-DD hh:mm:ss");


        let infoTemp = { "label": (data as ServerTemp).time, "data":  parseFloat((data as ServerTemp).temp).toFixed(2) };
        return infoTemp;
      }
      )).subscribe(data => {
        if(this.datasets[0].data.length === 120) {
          this.labels.shift();

          this.datasets[0].data.shift();
        }

        this.labels.push(data.label);

        this.datasets[0].data.push(data.data);
        this.chart.update();
      });


  }

  getTemp() {
    return this.temperaturaService.getTemperature();
  }
  private drawSample(canvas: HTMLCanvasElement) {

     this.chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: this.labels,
            datasets: this.datasets,
        },
        options: {
          scales: {
              y: {
                  suggestedMin: 40,
                  suggestedMax: 100
              }
          }
      }
    });

}
}
