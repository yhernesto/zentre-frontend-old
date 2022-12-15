export interface IDateRanges {
  actual: {
    from: Date;
    to: Date;
  };
  previous: {
    from: Date;
    to: Date;
  };
}

export enum EPeriod {
  TODAY = "1-d",
  WEEK = "7-d",
  MONTH = "1-m",
  MONTH3 = "3-m",
  MONTH6 = "6-m",
  YEAR = "1-y"
}

export const PeriodList = [
  {label: "calendar-today", value: EPeriod.TODAY},
  {label: "calendar-week", value: EPeriod.WEEK},
  {label: "calendar-month", value: EPeriod.MONTH},
  {label: "calendar-3months", value: EPeriod.MONTH3},
  {label: "calendar-6months", value: EPeriod.MONTH6},
  {label: "calendar-year", value: EPeriod.YEAR}
]

// Get Days From Period
export function getDaysFromPeriod(period: EPeriod): number {
  let _days: number = 0;
  let _months: number = 0;
  let _years: number = 0;

	const _dateTo: Date = new Date();
  const _dateFrom: Date = new Date();

  // One day Time in ms (milliseconds)
  const one_day = 1000 * 60 * 60 * 24

  // Choosing interval
  switch (period) {
    case EPeriod.TODAY:
      break;
    case EPeriod.WEEK:
      _days = 7;
      break;
    case EPeriod.MONTH:
      _months = 1;
      break;
    case EPeriod.MONTH3:
      _months = 3;
      break;
    case EPeriod.MONTH6:
      _months = 6;
      break;
    case EPeriod.YEAR:
      _years = 1;
      break;
  }

  // Setting date
  if (_days != 0)
    _dateFrom.setDate(_dateTo.getDate() - _days);
  if (_months != 0)
  _dateFrom.setMonth(_dateTo.getMonth() - _months);
  if (_years != 0)
  _dateFrom.setFullYear(_dateTo.getFullYear() - _years);

  // Start mode it set the hours at the beginning of the day
  _dateFrom.setHours(0,0,0,0)
  _dateTo.setHours(0,0,0,0)

  // End mode it set the minutes at the end of the day
  // _dateTo.setHours(23,59,59,999)

  // To Calculate the result in milliseconds and then converting into days
  const _result: number = Math.round(_dateTo.getTime() - _dateFrom.getTime()) / (one_day);

  // To remove the decimals from the (Result) resulting days value
  return Number(_result.toFixed(0));

}

// Get Ranges From Period
// return 
export function getRangesFromPeriod(period: EPeriod): IDateRanges {
  // Actual
  let _days: number = 0;
  let _months: number = 0;
  let _years: number = 0;

	const _dateTo: Date = new Date();
  const _dateFrom: Date = new Date();

  // Previous
  let _prvDays: number = 0;

  let _prvDateTo: Date = new Date();
  const _prvDateFrom: Date = new Date();

  // Choosing interval
  switch (period) {
    case EPeriod.TODAY:
      _prvDays = 1
      break;
    case EPeriod.WEEK:
      _prvDays = 1;
      _days = 6;
      break;
    case EPeriod.MONTH:
      _months = 1;
      break;
    case EPeriod.MONTH3:
      _months = 3;
      break;
    case EPeriod.MONTH6:
      _months = 6;
      break;
    case EPeriod.YEAR:
      _years = 1;
      break;
  }

  // Setting date
  if (_days != 0){
    _dateFrom.setDate(_dateTo.getDate() - _days);
  }
  if (_months != 0){
    _dateFrom.setMonth(_dateTo.getMonth() - _months);
  }
  if (_years != 0){
    _dateFrom.setFullYear(_dateTo.getFullYear() - _years);
  }

  // Start mode it set the hours at the beginning of the day
  _dateFrom.setHours(0,0,0,0)
  // End mode it set the minutes at the end of the day
  _dateTo.setHours(23,59,59,999)

  // Previous Dates
  _prvDateTo = cloneDate(_dateFrom)
  _prvDateTo.setDate(_dateFrom.getDate() - _prvDays)

  if (_days != 0)
    _prvDateFrom.setDate(_prvDateTo.getDate() - _days);
  if (_months != 0)
    _prvDateFrom.setMonth(_prvDateTo.getMonth() - _months);
  if (_years != 0)
    _prvDateFrom.setFullYear(_prvDateTo.getFullYear() - _years);

  // Start mode it set the hours at the beginning of the day
  _prvDateFrom.setHours(0,0,0,0)
  // End mode it set the minutes at the end of the day
  _prvDateTo.setHours(23,59,59,999)

  // To remove the decimals from the (Result) resulting days value
  return {
    actual: {
      from: _dateFrom,
      to: _dateTo
    },
    previous: {
      from: _prvDateFrom,
      to: _prvDateTo
    }
  }
}


export function formatDateToDayMonthYear(date: Date): string {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}


export function cloneDate(p_date: Date): Date {
  // TODO: Try this
  // Date.prototype.clone = function () {
  //     return new Date(this.getTime());
  // }
  const copiedDate = new Date(p_date.getTime());
  return copiedDate
}