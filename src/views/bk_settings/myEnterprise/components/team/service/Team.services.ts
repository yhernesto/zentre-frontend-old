import ApiService from "@/models/ApiService";
import type { IJobTitle, ITeam, ITeamSave } from "../teamTable/models/ITeam";
import type { Team } from "../teamTable/models/Team";
import StoreService from "@/views/bk_settings/myEnterprise/services/store/Store.services";

export default class TeamService extends ApiService {
  constructor() {
    super({ baseURL: "/team" });
  }

  deleteCollaborator(collaboratorId: string) {}

  addNewCollaborator(p_collaborator: ITeamSave) {}

  async getJobTitles() {
    //return (await this.get("/job-titles")).data;
    const tmp: Array<IJobTitle> = [
      {
        code: "code1",
        title: "title1",
      },
      {
        code: "code2",
        title: "title2",
      },
      {
        code: "code3",
        title: "title3",
      },
    ];
    return tmp;
  }

  editExistingCollaborator(
    p_collaboratorId: string,
    p_collaborator: ITeamSave
  ) {}
}
