import TenancyService from "@/services/TenancyService";
import type { IReqGetPaymentList, IReqGetPaymentsByStatus, IReqGetPaymentsByType, IReqGetSummaryStats, IResGetPaymentList, IResGetPaymentsByStatus, IResGetPaymentsByType, IResGetSummaryStats } from "./IDashboardService";

export default class DashboardService extends TenancyService {
  constructor() {
    super("/pay/dashboard" );
  }

  //****************************************************** */
  //********** DASHBOARD ********************************* */
  //****************************************************** */
  /**
   *
   * @param payload: IReqGetSummaryStats
   */
  async getSummaryStats(payload: IReqGetSummaryStats): Promise<IResGetSummaryStats> {
    return (await this.get("/payments/", {
      params: {
        group_type: payload.group_type,
        prev_init_date: payload.prev_init_date,
        init_date: payload.init_date,
        finish_date: payload.finish_date
      }
    })).data;
  }

  /**
   *
   * @param payload: IReqGetPaymentList
   */
  async getPaymentList(payload: IReqGetPaymentList): Promise<Array<IResGetPaymentList>> {
    return (await this.get("/paymentlist/", {
      params: {
        init_date: payload.init_date,
        finish_date: payload.finish_date
      }
    })).data;
  }

  /**
   *
   * @param payload: IReqGetPaymentsByType
   */
   async getPaymentsByType(payload: IReqGetPaymentsByType): Promise<Array<IResGetPaymentsByType>> {
    return (await this.get("/by_type/", {
      params: {
        init_date: payload.init_date,
        finish_date: payload.finish_date
      }
    })).data;
  }

  /**
   *
   * @param payload: IReqGetPaymentsByStatus
   */
  async getPaymentsByStatus(payload: IReqGetPaymentsByStatus): Promise<Array<IResGetPaymentsByStatus>> {
    return (await this.get("/by_status/" , {
      params: {
        init_date: payload.init_date,
        finish_date: payload.finish_date
      }
    })).data;
  }

}
