import Highcharts, { type Options, Chart, type PointOptionsObject } from "highcharts";
import HC_more from "highcharts/highcharts-more"; //module
HC_more(Highcharts); //init module
// Load the exporting module.
import Exporting from "highcharts/modules/exporting";
// Initialize exporting module.
Exporting(Highcharts);

export default class ChartPie {
  private m_containerId: string;
  private m_chart: Chart | null = null;

  private m_data: Array<number | [string, number | null] | null | PointOptionsObject> = [];

  private m_tooltipPointFormat: string | undefined;

  constructor(p_containerId: string) {
    this.m_containerId = p_containerId;
  }

  get tooltipFormatter(): string | undefined {
    return this.m_tooltipPointFormat;
  }
  set tooltipFormatter(value: string | undefined) {
    this.m_tooltipPointFormat = value;
    this.m_chart?.update({
      tooltip: {
        pointFormat: this.m_tooltipPointFormat
      }
    });
  }

  get data(): Array<number | [string, number | null] | null | PointOptionsObject>  {
    return this.m_data;
  }
  set data(p_data: Array<number | [string, number | null] | null | PointOptionsObject>) {
    this.m_data = p_data;
    this.m_chart?.series[0].setData(p_data);
  }

  createChart(): void {
    const option = {
      chart: {
        renderTo: this.m_containerId,
        // type: 'pie',
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      tooltip: {
        pointFormat: this.m_tooltipPointFormat
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          dataLabels: {
            style: {
              fontWeight: "bold",
              color: "white",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          showInLegend: false,
          colorByPoint: true,
          data: this.m_data,
          cursor: "pointer",
        },
      ],
    };
    this.m_chart = new Highcharts.Chart(option as Options);
  }
}
