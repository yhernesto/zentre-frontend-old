import StoreService from "@/views/bk_settings/myEnterprise/services/store/Store.services";
import {reactive} from "vue";
import type {ISchedule } from "./models/ISchedule";
import { Notify } from 'quasar'

export class Schedule {

  private _sharedServices: StoreService = new StoreService();
  private _schedule: Array<ISchedule> = [];
  private _storeId: number | undefined = undefined;

  constructor() { }

  // Getters / Setters

  get schedule(): Array<ISchedule> {
    return this._schedule;
  }

  getIsOpened(weekDay: number): boolean {
    return (this.getScheduleByDay(weekDay)?.ranges || []).length > 0; 
  }

  // useful for avoid many finds
  getScheduleByDay(weekDay: number): ISchedule | undefined {
    return this._schedule.find((__schedule) => __schedule.weekDay === weekDay);
  }

  //
  // Methods
  //
  async loadInfo(storeId: number){
    this._storeId = storeId;
    const res = await this._sharedServices.getOpeningHoursByStoreId(storeId)

    this._schedule = res.reduce((acc, curr) => {
      const _scheduleFound = acc.find((_openingRange) => _openingRange.weekDay == curr.weekDay )
      if (_scheduleFound){
        _scheduleFound.ranges.push({from: curr.from.padStart(5,"0"), to: curr.to.padStart(5,"0")}) // hour is padded to ensure the format HH:MM (5 spaces)
        return [...acc]
      } 
      
      const _schedule: ISchedule = {
          storeId: curr.storeId,
          weekDay: curr.weekDay,
          ranges: [{
            from: curr.from.padStart(5,"0"),
            to: curr.to.padStart(5,"0")
          }]
        }
      return [...acc, _schedule]
    }, [] as Array<ISchedule>);
  }

  
  public closeScheduleByDay(weekDay: number) {
    this._schedule = this._schedule.filter((__schedule) => __schedule.weekDay !== weekDay) || []
  }

  public openScheduleByDay(weekDay: number) {
    if (this._storeId) {
      this._schedule.push({
          storeId: this._storeId,
          weekDay: weekDay,
          ranges: [{
            from: '',
            to: ''
          }]
      })
    }
    // else
      // Create default schedule
  }

  public async saveSchedule(){
    if (this._storeId)
      await this._sharedServices.saveOpeningHours(this._storeId, this._schedule);
  }
}

const scheduleController = reactive(new Schedule());
export default scheduleController;