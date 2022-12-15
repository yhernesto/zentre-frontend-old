import type { IResGetPaymentList, IResGetPaymentsByStatus, IResGetPaymentsByType } from "./services/IDashboardService";

// ***************
// *** Interfaces
// ***************

export interface IPaymentsByStatus extends IResGetPaymentsByStatus {}
export interface IPaymentsByType extends IResGetPaymentsByType {}
export interface IPaymentList extends IResGetPaymentList {}

interface IStatsByTime {
  time: string
  sell_quantity: number
  sells: number
  ticket_avg: number
}

export interface IPeriodSummaryStats {
  init_time: Date;// Date
  finish_time: Date;// Date
  sell_quantity: number;
  sells: number;
  ticket_avg: number;
  stats_by_time?: IStatsByTime[]
}

export interface ISummaryStats {
  prev: IPeriodSummaryStats;
  current: IPeriodSummaryStats;
}


export interface IDateRange {
	from: Date;
	to: Date;
}

// **********
// *** Enums
// **********
export enum CARD_CODES {
	SALES_NUMBER = "SALES_NUMBER",
	SALES_AMOUNT = "SALES_AMOUNT",
  TICKETS = "TICKETS"
}