import type { IProfile } from "@/models/user/IUser";
import ApiService from "@/models/ApiService";
import { StatusCodes } from "http-status-codes";
import type { ILoginForm, IResLogin } from "./interfaces/IAuth";

export default class AuthService extends ApiService {
  constructor() {
    super({ context: "/auth" });
  }

  /**
   * Login the user and store the access token to TokenService.
   *
   * @param p_payload ILoginForm
   * @returns
   */
  async doLogin(p_payload: ILoginForm): Promise<IResLogin | null> {
    const m_data: ILoginForm = p_payload;

    const rs = await this.post("/login", m_data);

    if (rs.status == StatusCodes.CREATED) return rs.data;
    else return null;
  }

  async doLogout(): Promise<void> {
    await this.post("/logout");
  }

  async getProfile(): Promise<IProfile> {
    return (await this.get("/profile")).data;
  }

}
