import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { map, tap } from 'rxjs';
import { ServerTemp } from 'src/app/interfaces/server-temp';
import { WstempService } from 'src/app/services/wstemp.service';

@Component({
  selector: 'app-temp-graph',
  templateUrl: './temp-graph.component.html',
  styleUrls: ['./temp-graph.component.scss']
})
export class TempGraphComponent implements OnInit {

  constructor(private temperaturaService: WstempService) { }
  public dataTemp: Array<ServerTemp> = [];

  ngOnInit(): void {
    this.getTemp().pipe(
      map( data => {
        console.log(data);
        (data as ServerTemp).time = moment((data as ServerTemp).time).format("YYYY-MM-DD hh:mm:ss");
        return data;
    }
    )).subscribe( data => {
      if(this.dataTemp.length === 20) this.dataTemp.shift();
      this.dataTemp.push(data as ServerTemp);
      console.log(this.dataTemp);
    });
  }

  getTemp() {
    return this.temperaturaService.getTemperature();
  }


}
