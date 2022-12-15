import { API_PUBLIC_BASE_URL } from "@/constants";
import ApiService from "@/models/ApiService";
import type { IProfileForEditing } from "@/models/user/IUser";
import type { IPrivacy } from "../ISettings";

export default class PublicService extends ApiService {
  constructor() {
    super({ context: "" });
  }
  /**
   * It takes a user object, and sends it to the server
   * @param {IProfileForEditing} p_user - IProfileForEditing
   * @returns The result of the post method.
   */

  async editUser(p_user: IProfileForEditing, p_email: string) {
    return await this.patch("/user/" + p_email, p_user);
  }

  async getClientQuestions(){
    return await this.get("/client/questions");
  }
}
