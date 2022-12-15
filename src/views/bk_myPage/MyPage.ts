import type { IClient } from "@/models/IClient";
import ClientService from "@/services/client.services";
import { reactive } from "vue";
import type { IColor } from "./models/IMyPage";
import MyPageService from "./services/MyPage.services";
import { createErrorNotification, createPositiveNotification } from "@/utils/notifications";

class MyPageController {
  private clientService: ClientService = new ClientService();
  private clientInformation: IClient | undefined = undefined;
  private myPageService: MyPageService = new MyPageService();
  constructor() {
  }

  async loadInfo() {
    this.clientInformation = structuredClone(await this.clientService.getClientInformation());
  }



  /**
   * Getter $clientInformation
   * @return {IClient }
   */
  public get $clientInformation(): IClient {
    return this.clientInformation!;
  }

  /**
   * Setter $clientInformation
   * @param {IClient } value
   */
  public set $clientInformation(value: IClient) {
    this.clientInformation = value;
  }



  async saveColor(
    primaryColors: Array<IColor>,
    secondaryColors: Array<IColor>
  ) {
    console.log("%c⧭", "color: #f200e2", "FROM CONTROLLER");
    console.log("%c⧭", "color: #f200e2", { primaryColors, secondaryColors });
    const primaryColor = primaryColors.filter((e) => e.selected);
    const secondaryColor = secondaryColors.filter((e) => e.selected);
    await this.myPageService.saveSelectedColors(
      primaryColor[0].color,
      secondaryColor[0].color
    );
    //TODO: backend communication
  }

  async changeImage(form: FormData, clientId: number, isLogo: boolean){
   const response = await this.myPageService.saveImage(form, clientId, isLogo);
   if(response.status.toString().startsWith('2')){
      createPositiveNotification('Actualizado correctamente');
      await this.loadInfo();
   }
   else{
     createErrorNotification('Hubo un error al cambiar la imagen')
     await this.loadInfo();
    }
   console.log('Response for image is: ', response);
  }
}

const myPageController = reactive(new MyPageController());
export default myPageController;
