import { reactive } from "vue";
import StoreService from "@/views/myEnterprise/services/store/Store.services";
import {
  createErrorNotification,
  createPositiveNotification,
} from "@/utils/notifications";
import type {
  IStore,
  IStoreSave,
} from "@/views/myEnterprise/components/direction/IDirection";

export class DirectionController {
  private _m_stores: Array<IStore> = [];

  private _m_storeService: StoreService = new StoreService();
  private _markers: Array<{ position: { lat: number; lng: number } }> = [];
  private _centerMap: { lat: number; lng: number } = { lat: 0, lng: 0 };

  constructor() {}

  get centerMap(): { lat: number; lng: number } {
    return this._centerMap;
  }

  get markers(): Array<{ position: { lat: number; lng: number } }> {
    return this._markers;
  }

  set centerMap(center: { lat: number; lng: number }) {
    this._centerMap = center;
  }

  get Stores(): Array<IStore> {
    return this._m_stores;
  }

  set Stores(value: Array<IStore>) {
    this._m_stores = value;
  }

  async loadInfo() {
    this._m_stores = Object.assign(
      [],
      await this._m_storeService.getAllStores()
    );

    for (let i = 0; i < this._m_stores.length; i++) {
      let _currPhone = this._m_stores[i].phones
      if (_currPhone !== undefined && _currPhone.length > 0) {
        this._m_stores[i].compleateNumber =
          "+" +
          _currPhone[0].countryCode +
          _currPhone[0].phone;
      }
    }

    console.log("%c⧭", "color: #cc0036", this._m_stores);
    this._markers = Object.assign(
      [],
      this._m_stores.map((e) => {
        return {
          position: {
            lat: parseFloat(String(e.latitude)),
            lng: parseFloat(String(e.longitude)),
          },
        };
      })
    );
    this._centerMap = this._markers
      .map((e) => {
        return {
          lat: e.position.lat,
          lng: e.position.lng,
        };
      })
      .reduce(function (acumulator, nextValue) {
        return {
          lat: parseFloat(String(acumulator.lat + nextValue.lat)),
          lng: parseFloat(String(acumulator.lng + nextValue.lng)),
        };
      });
    this.centerMap.lat = this.centerMap.lat / this.markers.length;
    this._centerMap.lng = this.centerMap.lng / this.markers.length;
  }

  async saveOrEditNewStore(p_store: IStoreSave, isNew: boolean) {
    if (isNew) {
      const response = await this._m_storeService.saveNewStore(p_store);
      this.showOperationNotification(
        response.status.toString(),
        "Creado correctamente",
        "Hubo un error"
      );
    } else {
      const response = await this._m_storeService.editExistingStore(p_store);
      this.showOperationNotification(
        response.status.toString(),
        "Actualizado correctamente",
        "Hubo un error"
      );
    }
    await this.loadInfo();
  }

  async removeStore(p_store: IStore) {
    const response = await this._m_storeService.deleteStore(p_store.id);
    this.showOperationNotification(
      response.status.toString(),
      "Eliminado correctamente",
      "Hubo un error"
    );
    await this.loadInfo();
  }

  public showOperationNotification(
    state: string,
    positiveMessage: string,
    negativeMessage: string
  ) {
    if (state.startsWith("2")) {
      createPositiveNotification(positiveMessage);
    } else if (state.startsWith("4") || state.startsWith("5")) {
      createErrorNotification(negativeMessage);
    }
  }
}

const directionController = reactive(new DirectionController());
export default directionController;
