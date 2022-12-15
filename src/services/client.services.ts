import ApiService from "@/models/ApiService";
import type { IClient } from "@/models/IClient";

export default class ClientService extends ApiService {
  constructor() {
    super({ context: "/api/client" });
  }

  /**
   * It returns a promise that resolves to the data property of the response object returned by the get
   * function
   * @returns The data property of the response object.
   */
  async getClientInformation(): Promise<IClient> {
    return (await this.get("")).data;
  }

  async changeImage(p_formdata: FormData) {
    console.log(
      "%c⧭",
      "color: #ace2e6",
      "Image from service was changed",
      p_formdata
    );
  }
}
