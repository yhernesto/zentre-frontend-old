import ApiService from "@/models/ApiService";

export default class PublicService extends ApiService {
  constructor(service: string) {
    super({ context: "/public" + service });
  }

}
