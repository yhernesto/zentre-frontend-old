import {
  createErrorNotification,
  createMessageNotification,
  createPositiveNotification,
} from "@/utils/notifications";
import { reactive } from "vue";
import StoreService from "../../../../services/store/Store.services";
import TeamService from "../../service/Team.services";
import type {
  IJobTitle,
  ILocalOptions,
  ITeam,
  ITeamSave,
  ITeamUpdate,
} from "./ITeam";

export class Team {
  private _m_teamList: Array<any> = [];
  private _m_team_service: TeamService = new TeamService();
  private _m_localOptions: Array<ILocalOptions> = [];
  private _m_shared_service: StoreService = new StoreService();
  private jobTitleOptions: Array<IJobTitle> = [];

  constructor() { }


    /**
     * Getter $jobTitleOptions
     * @return {Array<IJobTitle> }
     */
	public get $jobTitleOptions(): Array<IJobTitle>  {
		return this.jobTitleOptions;
	}

    /**
     * Setter $jobTitleOptions
     * @param {Array<IJobTitle> } value
     */
	public set $jobTitleOptions(value: Array<IJobTitle> ) {
		this.jobTitleOptions = value;
	}
  

  get localOptions(): Array<ILocalOptions> {
    return this._m_localOptions;
  }

  get teamList(): Array<ITeam> {
    return this._m_teamList;
  }

  /**
   * This function loads the team list and the local options from the shared service.
   */
  public async loadInfo() {
    this._m_teamList = await this._m_shared_service.getAllCollaborators();
    this._m_localOptions = (await this._m_shared_service.getAllStores()).map(
      (e) => {
        return {
          id: e.id,
          label: e.store,
        };
      }
    );
    this.jobTitleOptions = await this._m_team_service.getJobTitles();
  }

  /**
   * It's a function that removes a collaborator from a project.
   *
   * @param {number} p_collaboratorId - number
   */
  public async removeCollaborator(p_collaboratorId: number) {
    const response = await this._m_shared_service.deleteWorker(
      p_collaboratorId
    );
    this.showOperationNotification(
      response.status.toString(),
      "Eliminado correctamente",
      "Hubo un error"
    );
    await this.loadInfo();
  }

  /**
   * This function saves a collaborator, and then reloads the page.
   * @param {ITeamSave} p_collaborator - ITeamSave,
   * @param {boolean} p_isNew - boolean - this is a boolean that tells the function whether or not the
   * collaborator is new or not.
   * @param {number} [p_collaboratorId] - number
   * @param {any} [p_storeId] - number
   */
  public async saveCollaborator(
    p_collaborator: ITeamSave,
    p_isNew: boolean,
    p_collaboratorId?: number,
    p_storeId?: any
  ) {
    p_collaborator.storeId = p_storeId;
    if (p_isNew) {
      this.createCollaborator(p_collaborator, p_storeId!);
    } else {
      this.editCollaborator(p_collaborator, p_collaboratorId!);
    }
  }

  formatPhone(p_phone: string) {}

  /**
   * It takes a collaborator object and an id, and then it edits the collaborator with the given id.
   * @param {ITeamSave} p_collaborator - ITeamSave
   * @param {number} p_collaboratorId - number
   */
  async editCollaborator(p_collaborator: ITeamSave, p_collaboratorId: number) {
    const existingCollaborator: ITeamUpdate = {
      storeId: p_collaborator.storeId,
      name: p_collaborator.name,
      email: p_collaborator.email,
      jobTitle: p_collaborator.jobTitle,
      phone: p_collaborator.phone,
      countryCode: p_collaborator.countryCode,
      phoneType: p_collaborator.phoneType,
      isActive: p_collaborator.state,
    };
    const editResponse = await this.editCollaboratorResponse(
      existingCollaborator,
      p_collaboratorId
    );
    this.showOperationNotification(
      editResponse.status.toString(),
      "Actualizado correctamente",
      "Hubo un error"
    );
    await this.loadInfo();
  }

  /**
   * This function creates a collaborator and shows a notification if the operation was successful or
   * not.
   * @param {ITeamSave} p_collaborator - ITeamSave = {
   * @param {any} p_storeId - is the id of the store that I'm passing from the parent component
   */
  async createCollaborator(p_collaborator: ITeamSave, p_storeId: any) {
    const response = await this.createCollaboratorResponse(
      p_collaborator,
      p_storeId.id
    );
    this.showOperationNotification(
      response.status.toString(),
      "Creado correctamente",
      "Hubo un error"
    );
    await this.loadInfo();
  }

  /**
   * This function is used to edit an existing collaborator in the database.
   * @param {ITeamUpdate} p_collaborator - ITeamUpdate
   * @param {number} p_collaboratorId - number
   * @returns The response from the API.
   */
  async editCollaboratorResponse(
    p_collaborator: ITeamUpdate,
    p_collaboratorId: number
  ): Promise<any> {
    return await this._m_shared_service.editExistingWorker(
      p_collaborator,
      p_collaboratorId
    );
  }

  /**
   * This function is called when a user clicks a button to create a new collaborator. It calls a service
   * function that makes an HTTP request to the server to create the new collaborator. The service
   * function returns a promise that resolves to the server's response. This function returns the promise
   * that the service function returns.
   * @param {ITeamSave} p_collaborator - ITeamSave = {
   * @param {number} p_storeId - number
   * @returns The response from the API call.
   */
  async createCollaboratorResponse(
    p_collaborator: ITeamSave,
    p_storeId: number
  ): Promise<any> {
    return await this._m_shared_service.createNewCollaborator(
      p_collaborator,
      p_storeId
    );
  }

  /**
   * This function returns an array of objects that match the id passed in.
   * @param {number} p_storeId - number - The id of the store you want to get.
   * @returns An array of objects that match the filter criteria.
   */
  public getStoreById(p_storeId: number) {
    return this._m_localOptions.filter((e) => e.id === p_storeId);
  }

  /**
   * It takes a string, checks if it starts with a 2, 4, or 5, and then calls a function based on the
   * result.
   * @param {string} state - string - the state of the operation
   * @param {string} positiveMessage - The message to be displayed when the operation is successful.
   * @param {string} negativeMessage - The message to be displayed when the operation fails.
   */
  public showOperationNotification(
    state: string,
    positiveMessage: string,
    negativeMessage: string
  ) {
    if (state.startsWith("2")) {
      createPositiveNotification(positiveMessage);
    } else if (state.startsWith("4") || state.startsWith("5")) {
      createErrorNotification(negativeMessage);
    }
  }
}

const teamController = reactive(new Team());
export default teamController;
