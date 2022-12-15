import type { IJobTitle, ITeam, ITeamSave } from "../teamTable/models/ITeam";
import type { Team } from "../teamTable/models/Team";
import TenancyService from "@/services/TenancyService";

export default class TeamService extends TenancyService {
  constructor() {
    super("/team");
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
