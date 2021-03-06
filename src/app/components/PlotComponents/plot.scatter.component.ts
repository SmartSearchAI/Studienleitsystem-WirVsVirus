import { Component, OnChanges, AfterViewInit, SimpleChanges, Input, ViewChild, HostListener} from '@angular/core';
import { EChartsComponent } from '@amcdnl/ngx-echarts';

// const xAxisData = [];
// const yAxisData = [];

@Component({
  selector: 'plot-scatter',
  templateUrl: './plot.scatter.component.html',
  styleUrls: ['./plot.scatter.component.scss']
})

export class PlotScatterComponent implements OnChanges, AfterViewInit {
  @Input() $Ids: Array<string>;
  @Input() $Data: Array<Array<number>>;
  @ViewChild(EChartsComponent, {static: false}) $chart:EChartsComponent;
  $dotSelected: boolean= false ; // hidden by default NOT working (?)
  
  $xAxis = {
    scale: true,
    axisLabel: {
      show: false,
    }
  };
  $yAxis = {
    scale: true,
    axisLabel: {
      show: false
    }
  };

  $tooltip = {
    trigger: 'item',
    formatter: function (param) {
        return param.data[2];
    }
  };
  $series = [];

  ngAfterViewInit() {
    this.resize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize();
  }

  onChartClick(event) {
    console.log("onChartClick")
    console.log(event.data);
    console.log(this.$dotSelected);
    this.$dotSelected = ! this.$dotSelected; 
    console.log(this.$dotSelected);

    const studiesDiv = document.getElementById("selectedStudiesMainDiv");
    var studyDiv = document.createElement("div");
    studyDiv.innerHTML=event.data[2];
    studiesDiv.appendChild(studyDiv);
  }
  resize() {
    console.log(this.$chart);
    this.$chart.resize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const data = this.$Ids.map((id, i) => {
      const xy = this.$Data[i];
      return [xy[0], xy[1], id];
    });
    // Update Chart
    this.$series = [{
      data,
      type: 'scatter',
      symbolSize: 10
    }];
  }
}
