import ApiService from "@/models/ApiService";
import type {IAnalyticsCountryRegionResponse, IAnalyticsResponse} from "@/views/bk_charts/models/ICharts";
import type { IAnalyticsAudienceGenResponse } from "@/views/bk_charts/models/IAudienceTypes";
import { API_WEB_BASE_URL } from "@/constants";
import type { IAnalyticsViewsResponse } from "@/views/bk_charts/models/IAnalyticsViews";


export default class ChartServices extends ApiService{
  constructor() {
    super({ baseURL: "/analytics" }, API_WEB_BASE_URL);
  }

  async getUsersViewsByCountry(): Promise<IAnalyticsResponse>{
     return (await this.get("/geo/country/2022-05-24")).data;
  }

  async getUsersViewsByCountryAndDate(country: string,date: string): Promise<IAnalyticsCountryRegionResponse>{
     return (await this.get(`/geo/region/${country}/${date}`)).data;
  }

  async getUsersReturningTypes(date: string): Promise<IAnalyticsAudienceGenResponse>{
    return (await this.get(`/audience/types/${date}`)).data;
  }

  async getUserDevices(date: string): Promise<IAnalyticsAudienceGenResponse>{
    return (await this.get(`/audience/devices/${date}`)).data;
  }
  async getGeneralStats(date: string): Promise<IAnalyticsViewsResponse>{
    return (await this.get(`/views/${date}`)).data;
  }
}