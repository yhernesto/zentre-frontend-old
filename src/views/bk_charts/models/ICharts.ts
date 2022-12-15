export interface IAnalyticsResponse {
  pageViews: string
  sessions: string
  users: string
  countries: ICountryResults[]
}

export interface ICountryResults {
  name: string
  pageViews: string
  sessions: string
  users: string
}

export interface IAnalyticsForCharts {
  data: Array<IAnalyticsChart>;
}

interface IAnalyticsChart {
  country: string;
  pageViews: number;
}


export interface IAnalyticsCountryRegionResponse {
  pageViews: string
  sessions: string
  users: string
  data: IRegionResults
}


export interface IRegionResults {
  country: string
  regions: ICountryResults[]
}

export interface IAnalyticsAudienceData {
  name: string
  sessions: number
  users: number
  newUsers: number
  bounceRate: number
  viewsPerSession: number
  avgSessionDuration: number
}

export interface IBasicResults {
  name?: string
  pageViews?: number
  sessions?: number
  users?: number
  bounceRate?: number
  sessionDuration?: number
  date?: string
}






