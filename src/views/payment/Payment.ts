import { reactive } from "vue";
import type { IPaymentList } from "@/views/dashboard/IDashboard";
import DashboardService from "@/views/dashboard/services/DashboardService";
import { EPeriod, getRangesFromPeriod, type IDateRanges } from "@/utils/dates";

export class Payment {
	private _paymentList: Array<IPaymentList> = [];

  // Services
  private _apiDashboardService = new DashboardService();

  constructor() {
    // Constructor definition
  }

	get paymentList(): Array<IPaymentList>{
		return this._paymentList
	}
	set paymentList(value: Array<IPaymentList>){
		this._paymentList = value;
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
		this._paymentList = await this._apiDashboardService.getPaymentList({
      init_date: ranges.actual.from,
      finish_date: ranges.actual.to
    })
  }
}

const payment = reactive(new Payment());
export default payment;
