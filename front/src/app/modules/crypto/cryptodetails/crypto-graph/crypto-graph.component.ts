import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { 
  NgApexchartsModule, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle 
} from 'ng-apexcharts';
import { CryptoService } from '../../../../services/crypto/crypto.service';
import { ActivatedRoute } from '@angular/router';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

interface ChartElement {
  x: number
  y: []
}

@Component({
  selector: 'app-crypto-graph',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  template: `
    <div class="graph-container">
      <apx-chart
        [series]="chartOptions.series"
        [chart]="chartOptions.chart"
        [xaxis]="chartOptions.xaxis"
        [title]="chartOptions.title">
      </apx-chart>
    </div>
  `,
  styles: [`
    .graph-container {
      max-width: 700px;
      margin: auto;
      padding: 1rem;
      color: rgba(0,0,0, .8);
    }
  `]
})
export class CryptoGraphComponent implements OnInit, OnDestroy {
  private cryptoService = inject(CryptoService)
  private route = inject(ActivatedRoute)
  graphData:ChartElement[] = []
  cryptoId!: string
  chartOptions!: ChartOptions;
  constructor(){

  }
  ngOnInit(): void {
    this.cryptoId = this.route.snapshot.paramMap.get('id')!;
    this.generateGraphData()
  }

  ngOnDestroy(): void {
  }

  generateGraphData= async () => {
    await this.cryptoService.getHistoryOHCL(this.cryptoId).subscribe({
      next: (data : any) => {
        this.graphData = data
        this.chartOptions = {
          series: [{
              data: this.graphData
            }],
            chart: {
              type: 'candlestick',
              height: 350
            },
            title: {
              text: `${this.cryptoId.toLocaleUpperCase()} in the last year`,
              align: 'left'
            },
            xaxis: {
              type: 'datetime'
            }
        };
      }
    })
  }

  
}
