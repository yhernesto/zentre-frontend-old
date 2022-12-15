import ApiService from "@/models/ApiService";
import TenancyService from "@/services/TenancyService";
import type {IGeneralSettings} from "@/views/bk_settings/myEnterprise/components/general/IGeneral";

export default class GeneralService extends TenancyService {
  constructor() {
    super("/client");
  }

  async getClientInformation(): Promise<IGeneralSettings> {
    return (await this.get('')).data;
  }

  async updateClient(p_client: any, id: number){
    return await this.patch(`/${id}`, p_client);
  }

}
