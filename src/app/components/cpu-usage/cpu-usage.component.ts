import {DOCUMENT} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {Subscription} from 'rxjs';
import {CpuUsageService} from 'src/app/services/cpu-usage.service';
import * as moment from "moment";

@Component({
    selector: 'app-cpu-usage',
    templateUrl: './cpu-usage.component.html',
    styleUrls: ['./cpu-usage.component.scss']
})
export class CpuUsageComponent implements OnInit, OnDestroy {
    public data: Array<any>[] = [];
    public labels = [] as any;
    public labelsCores = [] as any;
    public datasets = [{
        lineTension: 0,
        label: "User 1",
        data: [] as any
    },
        {
            lineTension: 0,
            label: "Nice 1",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Sys 1 ",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Irq 1 ",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Iddle 1",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "User 2",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Nice 2",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Sys 2 ",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Irq 2 ",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Iddle 2",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "User 3",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Nice 3",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Sys 3 ",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Irq 3 ",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Iddle 3",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "User 4",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Nice 4",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Sys 4",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Irq 4",
            data: [] as any
        },
        {
            lineTension: 0,
            label: "Iddle 4",
            data: [] as any
        }
    ];
    public coresSpeed = [
        {
            lineTension: 0.3,
            label: "core1 speed",
            data: [] as any
        },
        {
            lineTension: 0.3,
            label: "core2 speed",
            data: [] as any
        },
        {
            lineTension: 0.3,
            label: "core3 speed",
            data: [] as any
        },
        {
            lineTension: 0.3,
            label: "core4 speed",
            data: [] as any
        }];
    public chart: any;
    public chartCores: any;

    private observer$: Subscription | undefined;

    constructor(private cpuService: CpuUsageService, @Inject(DOCUMENT) private _document: any) {
    }

    public cpuTimes: Array<any>[] = [];


    ngOnInit(): void {
        const canvas = this._document.getElementById('chart_cpu');
        const canvasCores = this._document.getElementById('chart_cpu_cores');

        this.drawCpuStats( canvas);
        this.drawCoresSpeed(canvasCores);
        try {
            var observer$ = this.getCpuUsage().subscribe(data => {
                this.datasets.forEach(dataset => {
                    if (dataset.data.length >= 120) {
                       this.labels =  this.labels.slice(1);
                       dataset.data = dataset.data.slice(1);
                    }
                })

                this.coresSpeed.forEach(dataset => {
                    if (dataset.data.length >= 120) {
                        this.labelsCores = this.labelsCores.slice(1);
                        dataset.data = dataset.data.slice(1);
                    }
                })
                let sumas = [];
                for (let i = 0; i < 4; i++) {
                    sumas[i] = data[i].times.idle + data[i].times.irq + data[i].times.nice + data[i].times.sys + data[i].times.user;
                }


                this.datasets[0].data.push(Math.round(100 * data[0].times.user / sumas[0]));
                this.datasets[1].data.push(Math.round(100 * data[0].times.nice / sumas[0]));
                this.datasets[2].data.push(Math.round(100 * data[0].times.sys / sumas[0]));
                this.datasets[3].data.push(Math.round(100 * data[0].times.irq / sumas[0]));
                this.datasets[4].data.push(Math.round(100 * data[0].times.idle / sumas[0]));

                this.datasets[5].data.push(Math.round(100 * data[1].times.user / sumas[1]));
                this.datasets[6].data.push(Math.round(100 * data[1].times.nice / sumas[1]));
                this.datasets[7].data.push(Math.round(100 * data[1].times.sys / sumas[1]));
                this.datasets[8].data.push(Math.round(100 * data[1].times.irq / sumas[1]));
                this.datasets[9].data.push(Math.round(100 * data[1].times.idle / sumas[1]));

                this.datasets[10].data.push(Math.round(100 * data[2].times.user / sumas[2]));
                this.datasets[11].data.push(Math.round(100 * data[2].times.nice / sumas[2]));
                this.datasets[12].data.push(Math.round(100 * data[2].times.sys / sumas[2]));
                this.datasets[13].data.push(Math.round(100 * data[2].times.irq / sumas[2]));
                this.datasets[14].data.push(Math.round(100 * data[2].times.idle / sumas[2]));

                this.datasets[15].data.push(Math.round(100 * data[3].times.user / sumas[3]));
                this.datasets[16].data.push(Math.round(100 * data[3].times.nice / sumas[3]));
                this.datasets[17].data.push(Math.round(100 * data[3].times.sys / sumas[3]));
                this.datasets[18].data.push(Math.round(100 * data[3].times.irq / sumas[3]));
                this.datasets[19].data.push(Math.round(100 * data[3].times.idle / sumas[3]));

                this.coresSpeed[0].data.push(data[0].speed)
                this.coresSpeed[1].data.push(data[1].speed)
                this.coresSpeed[2].data.push(data[2].speed)
                this.coresSpeed[3].data.push(data[3].speed)
                this.labels.push(moment().format("YYYY-MM-DD hh:mm:ss"));
                this.labelsCores.push(moment().format("YYYY-MM-DD hh:mm:ss"));

                this.chart.update();
                this.chartCores.update();

            });
        }catch (e) {
            console.error(e)
        }


    }

    getCpuUsage() {
        this.cpuService.connectWs();
        return this.cpuService.getCpu();
    }

    private drawCpuStats( canvas: HTMLCanvasElement) {

         this.chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: this.datasets
            }
        });

    }
    private drawCoresSpeed(canvas: HTMLCanvasElement) {

        this.chartCores = new Chart(canvas, {
            type: 'line',
            data: {
                labels: this.labelsCores,
                datasets: this.coresSpeed
            },
            options: {
                scales: {
                    y: {
                        suggestedMin: 450,
                        suggestedMax: 1700
                    }
                }
            }
        });

    }

    ngOnDestroy() {
        this.cpuService.disconnectWs();
        if(this.observer$ instanceof Subscription) this.observer$.unsubscribe();
    }

}
