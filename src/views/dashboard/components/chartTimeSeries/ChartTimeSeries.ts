import Highcharts, {type Options, Chart, type SeriesOptionsType, type SeriesAreasplineOptions } from 'highcharts';
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);

import type { IDateRange } from '../../IDashboard';

export default class ChartTimeSeries{
  private _containerId: string;
  private _chart: Chart | null = null;
  private _series: Array<SeriesAreasplineOptions> = [{ type: 'areaspline',  name: '', data: [] }];
  private _title: string = "";
  private _color: string = "#7cb5ec";
  private _units: string = "";
  private _renderDateRange: IDateRange | undefined = undefined;
  private _renderPrvDateRange: IDateRange | undefined = undefined;

  constructor(p_containerId: string){
    this._containerId = p_containerId;
  }

  get title(): string {
    return this._title;
  }

  set title(p_title: string){
    this._title = p_title;
  }
  
  get color(): string {
    return this._color;
  }

  set color(p_color: string){
    this._color = p_color;
  }

  get units(): string {
    return this._units;
  }

  set units(p_units: string){
    this._units = p_units;
  }

  get renderDateRange(): IDateRange | undefined {
    return this._renderDateRange;
  }
  set renderDateRange(p_renderDateRange: IDateRange | undefined){
    this._renderDateRange = p_renderDateRange;
    this._chart?.xAxis[0].update({
      min: p_renderDateRange?.from.getTime(),
      max: p_renderDateRange?.to.getTime()
      })
  }
  
  get renderPrvDateRange(): IDateRange | undefined {
    return this._renderPrvDateRange;
  }
  set renderPrvDateRange(p_renderPrvDateRange: IDateRange | undefined){
    this._renderPrvDateRange = p_renderPrvDateRange;
    this._chart?.xAxis[1].update({
      min: p_renderPrvDateRange?.from.getTime(),
      max: p_renderPrvDateRange?.to.getTime()
    })
  }

  get series(): Array<SeriesAreasplineOptions>{
    return this._series
  }

  set series( p_series: Array<SeriesAreasplineOptions>){
    this._series = p_series;

    const _length: number = this._chart?.series.length || 0;
    Array.from({ length: _length }).forEach( () => { this._chart?.series[0]?.remove(true); } )

    p_series.forEach( (_series : SeriesAreasplineOptions) => {
      this._chart?.addSeries(_series as SeriesOptionsType);
    })
  }

  createChart() : void {
    const option = {
      chart: {
        renderTo: this._containerId,
        backgroundColor: 'transparent',
        type: 'spline',
        style: {
          fontFamily: 'PT Serif'
        },
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false
      },
      xAxis: [{
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
              month: '%e. %b',
              year: '%b'
            },
            showFirstLabel: true,
            units:[
              [
                'day',
                [1, 2]
              ], [
                'week',
                [1, 2]
              ], [
                'month',
                [1, 2, 3, 4, 6]
              ], [
                'year',
                null
              ]
            ],
            title: {
              text: 'Current'
            },
            // tickInterval: 30 * 24 * 3600 * 1000,
            // min: new Date(2021,3,1).getTime(), //this._renderDateRange?.from.getTime(),
            // max: new Date(2021,5,1).getTime(), //this._renderDateRange?.to.getTime(),
            min: this._renderDateRange?.from.getTime(),
            max: this._renderDateRange?.to.getTime(),
          }, {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
              month: '%e. %b',
              year: '%b'
            },
            units:[
              [
                'day',
                [1, 2]
              ], [
                'week',
                [1, 2]
              ], [
                'month',
                [1, 2, 3, 4, 6]
              ], [
                'year',
                null]
            ],
            title: {
              text: 'Previous'
            },
            visible: false,
            // tickInterval: 30 * 24 * 3600 * 1000,
            min: this._renderPrvDateRange?.from.getTime(),
            max: this._renderPrvDateRange?.to.getTime(),
      }],

      yAxis: {
        title: {
          text: ''
        },
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
      },
    
      plotOptions: {
        series: {
          marker: {
            enabled: true
          }
        }
      },
    
      colors: ['#6CF', '#fcc572', '#06C', '#036', '#000'],
    
      // Define the data points. All series have a dummy year
      // of 1970/71 in order to be compared on the same x axis. Note
      // that in JavaScript, months start at 0 for January, 1 for February etc.
      series: this._series,
      exporting: {
        enabled: false
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            plotOptions: {
              series: {
                marker: {
                  radius: 2.5
                }
              }
            }
          }
        }]
      }
    
    }
    this._chart = new Highcharts.Chart(option as Options);
  }
}