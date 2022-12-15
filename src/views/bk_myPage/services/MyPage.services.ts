import ApiService from "@/models/ApiService";

export default class MyPageService extends ApiService {
  constructor() {
    super({ baseURL: "" });
  }
  async saveSelectedColors(primaryColor: string, secondaryColor: string) {
    console.log(
      "%c⧭",
      "color: #ffff00",
      `FROM SERVICE, PRIMARY COLOR -> ${primaryColor} --- SECONDARY COLOR --> ${secondaryColor}`
    );
  }



  async saveImage(form: FormData, clientId: number, isLogo: boolean){
    const imageType = isLogo ? 'logo' : 'cover';
    return await this.patch(`/client/${imageType}/${clientId}` , form);
  }
}
