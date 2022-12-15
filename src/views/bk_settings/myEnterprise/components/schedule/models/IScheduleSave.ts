export interface IScheduleSave {
  weekDay: number;
  ranges: Array<IOpeningRange>
}

export interface IOpeningRange {
  from: string;
  to: string;
}
export interface ISchedule {
  id: number;
  storeId: number;
  weekDay: number;
  from: string;
  to: string;
}
export interface IScheduleFormatted {
  
}

export interface ISingleHourRange {
  from: string;
  to: string;
  id: number;
  storeId: number
}

export interface IUpdateOpeningHours {
  ranges: Array<IOpeningRange>;
}
