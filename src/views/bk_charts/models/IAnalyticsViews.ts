import type { IBasicResults } from "@/views/bk_charts/models/ICharts";

export interface IAnalyticsViewsResponse {
  users: number
  sessions: number
  bounceRate: number
  sessionDuration: number
  dates: IBasicResults[]
}