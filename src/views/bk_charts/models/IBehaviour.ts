import type { IBasicResults } from "@/views/bk_charts/models/ICharts";

export interface IAnalyticsBehaviourResponse {
  pageViews: string
  sessions: string
  intervals: IAnalyticsIntervals
}
export interface IAnalyticsIntervals {
  '0-10 seconds': IBasicResults
  '11-30 seconds': IBasicResults
  '31-60 seconds': IBasicResults
  '61-180 seconds': IBasicResults
  '181-600 seconds': IBasicResults
  '601-1800 seconds': IBasicResults
  '>1800 seconds': IBasicResults
}
