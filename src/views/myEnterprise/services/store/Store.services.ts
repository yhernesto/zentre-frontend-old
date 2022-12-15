import type { ITeam, ITeamSave } from "@/views/myEnterprise/components/team/teamTable/models/ITeam";
import type { IResOpeningHours, IReqOpeningHours } from "@/views/myEnterprise/components/schedule/models/ISchedule";
import type { AxiosResponse } from "axios";
import type {IStore, IStoreSave} from "@/views/myEnterprise/components/direction/IDirection";
import TenancyService from "@/services/TenancyService";

export default class StoreService extends TenancyService {
  constructor() {
    super("/store" );
  }

  //****************************************************** */
  //**********S T O R  E S     ******************************* */
  //******************************************************* */
  /**
   *
   * @param p_newStore
   */
  async saveNewStore(p_newStore: IStoreSave): Promise<AxiosResponse> {
    return await this.post("", p_newStore);
  }

  /**
   *
   * @param p_store
   */
  async editExistingStore(p_store: IStoreSave): Promise<AxiosResponse> {
    return await this.patch(`/${p_store.id}`, p_store);
  }

  async getAllStores(): Promise<Array<IStore>> {
    return (await this.get("")).data;
  }

  async deleteStore(p_storeId: number) {
    return await this.delete(`/${p_storeId}`);
  }

  //****************************************************** */
  //**********W O R K E R S      ******************************* */
  //******************************************************* */

  /**
   *
   * @param p_collaborator
   * @param p_storeId
   */
  async createNewCollaborator(p_collaborator: ITeamSave, p_storeId: number) {
    const response = await this.post(`/${p_storeId}/worker`, p_collaborator);
    return response;
  }
  /**
   *
   * @param p_collaborator
   * @param p_workerId
   */
  async editExistingWorker(p_collaborator: any, p_workerId: number) {
    const response = await this.patch(`/worker/${p_workerId}`, p_collaborator);
    return response;
  }

  /**
   *
   * @param p_workerId
   */
  async deleteWorker(p_workerId: number) {
    return await this.delete(`/worker/${p_workerId}`);
  }

  async getAllCollaborators(): Promise<Array<ITeam>> {
    return (await this.get("/allWorkers")).data;
  }

  //****************************************************** */
  //**********OPENING HOURS     ******************************* */
  //******************************************************* */

  async getAllOpeningHours(): Promise<Array<IResOpeningHours>> {
    return (await this.get("/openingHours")).data;
  }

  async getOpeningHoursByStoreId(p_storeId: number): Promise<Array<IResOpeningHours>> {
    return (await this.get(`/${p_storeId}/openingHours`)).data;
  }

  async saveOpeningHours(storeId: number, openingHours: Array<IReqOpeningHours>): Promise<void> {
    await this.post(`/${storeId}/openingHour`, openingHours)
  }
}
