import type { IAnalyticsAudienceData } from "@/views/bk_charts/models/ICharts";

export interface IAnalyticsAudienceGenResponse {
  sessions: number
  users: number
  newUsers: number
  bounceRate: number
  viewsPerSession: number
  avgSessionDuration: number
  data: IAnalyticsAudienceData[]
}


