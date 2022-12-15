import ApiService from "@/models/ApiService";
import appController from "@/controller/Controller";
import type { ISubject } from "@/models/observer/ISubject";
import { ConcreteSubject } from "@/models/observer/Subject";
import { TENANCY_HEADER_KEY } from "@/constants";

export default class TenancyService extends ApiService {

  constructor(service: string) {
    super({ context: "/tenant" + service});

    const _tenancy: string = appController.user.profile?.tenancies[0].name || ''
    
    ApiService.setHeader({key: TENANCY_HEADER_KEY, value: _tenancy});

    // This observer is needed in case after a new login the tenancy change
    appController.user.loginSubject.attach({update: this.update})
  }

  // *********************
  // *** Observer function
  // *********************
  private update(subject: ISubject): void {
    if (subject instanceof ConcreteSubject) {
          const _tenancy: string = appController.user.profile?.tenancies[0].name || ''
          ApiService.setHeader({key: TENANCY_HEADER_KEY, value: _tenancy});
      }
  }
}
