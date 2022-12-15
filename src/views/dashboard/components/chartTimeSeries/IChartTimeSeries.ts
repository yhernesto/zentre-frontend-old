import type { XAxisOptions } from 'highcharts';

export interface ISeries {
	name: string;
	data: number[][]
	xAxis?: XAxisOptions
}
