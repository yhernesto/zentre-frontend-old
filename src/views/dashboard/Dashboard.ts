import { EPeriod, getRangesFromPeriod, type IDateRanges } from "@/utils/dates";
import { reactive } from "vue";
import type { IPaymentList, IPaymentsByStatus, IPaymentsByType, ISummaryStats } from "./IDashboard";
import DashboardService from "./services/DashboardService";

export class Dashboard {
  private _summaryStats: ISummaryStats | null = null;
	private _paymentList: Array<IPaymentList> = [];
  private _paymentsByType: Array<IPaymentsByType> = [];
  private _paymentsByStatus: Array<IPaymentsByStatus> = [];

  // Services
  private _apiService = new DashboardService();

  constructor() {
    // Constructor definition
  }

	get paymentList(): Array<IPaymentList>{
		return this._paymentList
	}
	set paymentList(value: Array<IPaymentList>){
		this._paymentList = value;
	}

  get summaryStats(): ISummaryStats | null {
    return this._summaryStats;
  }

  set summaryStats(value: ISummaryStats | null) {
    this._summaryStats = value;
  }

  get paymentsByType(): Array<IPaymentsByType> {
    return this._paymentsByType;
  }

  set paymentsByType(value: Array<IPaymentsByType>) {
    this._paymentsByType = value;
  }

  get paymentsByStatus(): Array<IPaymentsByStatus> {
    return this._paymentsByStatus;
  }

  set paymentsByStatus(value: Array<IPaymentsByStatus>) {
    this._paymentsByStatus = value;
  }

  /***************
   * Methods
   ***************/

  /**
   *
   * @param period: string
   */
	public async loadInfo(period: EPeriod): Promise<void> {

    const ranges: IDateRanges = getRangesFromPeriod(period)

    this._paymentList = await this._apiService.getPaymentList({
      init_date: ranges.actual.from,
      finish_date: ranges.actual.to
    });

    this._paymentsByType = await this._apiService.getPaymentsByType({
      init_date: ranges.actual.from,
      finish_date: ranges.actual.to
    });
    
    // const _rs = this._paymentsByType;
    // _rs.push({
    //     "payment_type": "credit",
    //     "amount": Number("140.94000"),
    //     "quantity": Number("2")
    // })
    // _rs.push({
    //     "payment_type": "credit-2",
    //     "amount": Number("110.94000"),
    //     "quantity": Number("2")
    // })
    // this._paymentsByType = _rs;

    this._paymentsByStatus = await this._apiService.getPaymentsByStatus({
      init_date: ranges.actual.from,
      finish_date: ranges.actual.to
    });

    const _rsSummaryStats = await this._apiService.getSummaryStats({
      group_type: Dashboard.getGroupType(period),
      prev_init_date: ranges.previous.from,
      init_date: ranges.actual.from,
      finish_date: ranges.actual.to
    })
    // Inferring types
    this._summaryStats = {
      current: {
        init_time: ranges.actual.from,
        finish_time: ranges.actual.to,
        sell_quantity: Number(_rsSummaryStats.current.sell_quantity),
        sells: Number(_rsSummaryStats.current.sells),
        ticket_avg: Number(_rsSummaryStats.current.ticket_avg),
        stats_by_time: _rsSummaryStats.current.stats_by_time?.map((_byTime) => {
                                                          return {
                                                            time: _byTime.time,
                                                            sell_quantity: Number(_byTime.sell_quantity),
                                                            sells: Number(_byTime.sells),
                                                            ticket_avg: Number(_byTime.ticket_avg)
                                                          }
                                                        })
      },
      prev: {
        init_time: ranges.previous.from,
        finish_time: ranges.previous.to,
        sell_quantity: Number(_rsSummaryStats.prev.sell_quantity),
        sells: Number(_rsSummaryStats.prev.sells),
        ticket_avg: Number(_rsSummaryStats.prev.ticket_avg),
        stats_by_time: _rsSummaryStats.prev.stats_by_time?.map((_byTime) => {
                                                          return {
                                                            time: _byTime.time,
                                                            sell_quantity: Number(_byTime.sell_quantity),
                                                            sells: Number(_byTime.sells),
                                                            ticket_avg: Number(_byTime.ticket_avg)
                                                          }
                                                        })
      }
    }
  }

  private static getGroupType(period: EPeriod): string {
    // - For range equal than 1 day ⇒ group_type = ‘H’ (points: min 1, max 24 )
    // - For 7 days, 1 month, 3 months  ⇒ group_type = ‘D’ (points: min 7, max 90)
    // - For 6 months, 1 year  ⇒ group_type = ‘W’ (points: min 24, max 51)

    if(period === EPeriod.TODAY)
      return 'H'
    if(period === EPeriod.WEEK || period === EPeriod.MONTH || period === EPeriod.MONTH3)
      return 'D'
    // if(period === EPeriod.MONTH6 || period === EPeriod.YEAR)
    return 'W'
  }
}

const dashboard = reactive(new Dashboard());
export default dashboard;
