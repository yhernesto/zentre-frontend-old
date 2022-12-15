<template>
  <div class="direction-whole-container">
    <div id="app" class="modal-vue">
      <q-btn
        :label="$t('direction-tab-new-store-btn')"
        style="background-color: #66af39"
        @click="openModal"
        id="btn-new-store-modal"
      />

      <div class="overlay" v-if="opened" @click="opened = false"></div>

      <div class="modal" v-if="opened">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          class="scroll-area-for-modal"
        >
          <button class="close" @click="opened = false">x</button>
          <h3 style="font-size: large">{{ modalStoreTitle }}</h3>
          <div class="row justify-around q-col-gutter-md">
            <div class="col-lg-6 col-xs-12 col-sm-12">
              <q-input
                outlined
                v-model="newStore.store"
                :label="translate('direction-form-name')"
              />
            </div>
            <div class="col-lg-6 col-xs-12 col-sm-12">
              <q-select
                outlined
                v-model="countryModel"
                :options="countryOptions"
                label="Pais"
              />
            </div>
          </div>
          <br />
          <q-input
            outlined
            v-model="newStore.description"
            type="textarea"
            :label="translate('direction-form-description')"
            style="height: 150px; margin-top: 15px"

          />
          <q-toggle
            v-model="newStore.isMain"
            checked-icon="check"
            color="green"
            :label="translate('direction-form-is-main')"
            unchecked-icon="close"
          />
          <q-toggle
            v-model="newStore.isOpenAlways"
            checked-icon="check"
            color="green"
            :label="translate('direction-form-open-always')"
            unchecked-icon="close"
          />
          <br />

          <q-card style="max-height: 260px">
            <div class="row" style="gap: 5px">
              <div class="col-lg-5 col-xs-12 col-sm-12">
                <vue-tel-input
                  style="height: 55px; margin-right: 5px"
                  autoDefaultCountry
                  v-model="newStore.compleateNumber"
                  :inputOptions="{
                    placeholder: 'Telefono',
                  }"
                ></vue-tel-input>
              </div>
              <div class="col-lg-4 col-xs-12 col-sm-12">
                <q-select
                  outlined
                  v-model="newStore.phones[0].type"
                  :options="phoneTypes"
                  label="Tipo de telefono"
                  emit-value
                  map-options
                />
              </div>
              <div
                class="col-lg-2 col-xs-12 col-sm-12 tooltip"
                style="margin-right: 10px"
                v-if="newStore.phones[0].type !== 'TEL'"
              >
                <q-icon
                  name="fab fa-whatsapp"
                  class="pointer-cursor"
                  size="1.5rem"
                />
                <q-toggle
                  v-model="newStore.phones[0].isWspMain"
                  checked-icon="check"
                  color="green"
                  unchecked-icon="close"
                >
                </q-toggle>
                <q-tooltip
                  class="bg-purple text-body2"
                  :offset="[10, 10]"
                  transition-show="scale"
                  transition-hide="scale"
                  >{{ translate("direction-form-icon-tooltip") }}
                </q-tooltip>
              </div>
            </div>

            <br />
          </q-card>
          <br />

          <div class="row">
            <div class="col-10">
              <q-input
                v-if="isStoreBeingEdited"
                filled
                v-model="newStore.address"
                :label="translate('direction-form-address')"
                disable
              />
            </div>
            <div class="col-2">
              <q-btn
                v-if="isStoreBeingEdited"
                round
                color="deep-orange"
                icon="edit_location"
                @click="setDirectionForExistingStore"
              />
            </div>
          </div>
          <GMapAutocomplete
            v-if="!isStoreBeingEdited"
            class="direction-autocompleate"
            placeholder="Ubicacion"
            @place_changed="setPlace"
          >
          </GMapAutocomplete>

          <br />
          <q-btn
            style="background-color: #049dd9; color: #fff; height: 50px"
            @click="saveStore"
            >Guardar
          </q-btn>
        </q-scroll-area>
      </div>
    </div>
    <div class="direction-list-child">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        class="scroll-area"
      >
        <div v-for="(store, index) in directionController.Stores" :key="index">
          <SingleStoreInformation
            :store="store"
            @edit-store="editExistingStore"
            @select-store="selecStore"
            @delete-store="deleteStore"
          />
        </div>
      </q-scroll-area>
    </div>
    <div class="direction-map-child">
      <GMapMap
        :center="directionController.centerMap"
        :zoom="zoomMap"
        map-type-id="terrain"
        class="mapViewer"
      >
        <GMapCluster>
          <GMapMarker
            :key="index"
            v-for="(m, index) in directionController.markers"
            :position="m.position"
            :icon="{
              url: 'https://w7.pngwing.com/pngs/601/670/png-transparent-bmw-museum-car-mini-bmw-7-series-bmw-emblem-trademark-logo.png',
              scaledSize: { width: 37, height: 37 },
              labelOrigin: { x: 16, y: -10 },
            }"
            :clickable="true"
            :draggable="false"
            @click="selecStore(m)"
          />
        </GMapCluster>
      </GMapMap>
    </div>
  </div>
</template>

<script setup lang="ts">
//LINK https://vue-map.netlify.app/components/marker.html
//LINk: https://developers.google.com/maps/documentation/javascript/places-autocomplete
//
import type { Ref } from "vue";
import { inject, reactive, ref } from "vue";
import directionController from "@/views/settings/myEnterprise/components/direction/direction";
import { getDistanciaMetros } from "@/utils/distances";
import type {
  IPosition,
  IStore,
  IStoreSave,
} from "@/views/settings/myEnterprise/components/direction/IDirection";
import PhoneModal from "@/views/settings/myEnterprise/components/direction/components/PhoneModal.vue";
import SingleStoreInformation
  from "@/views/settings/myEnterprise/components/direction/components/SingleStoreInformation.vue";
import type { Controller } from "@/controller/Controller";
//
const { t, locale } = useI18n({ useScope: "global" });

directionController.loadInfo();
const zoomMap: Ref<number> = ref(
  directionController.markers.length == 1 ? 15 : 12
);
defineZoom();
const isStoreBeingEdited: Ref<boolean> = ref(false);
function defineZoom() {
  const maxLatitude = Math.max(
    ...directionController.markers.map((e) => {
      return e.position.lat;
    })
  );

  const minLatitude = Math.min(
    ...directionController.markers.map((e) => {
      return e.position.lat;
    })
  );

  const minLongitude = Math.min(
    ...directionController.markers.map((e) => {
      return e.position.lng;
    })
  );

  const maxLongitude = Math.max(
    ...directionController.markers.map((e) => {
      return e.position.lng;
    })
  );
  const distance = getDistanciaMetros(
    minLatitude,
    minLongitude,
    maxLatitude,
    maxLongitude
  );

  parseInt(distance) > 200 ? (zoomMap.value = 8) : 11;
}

const selecStore = (p_marker: IPosition) => {
  directionController.centerMap = Object.assign(
    {},
    {
      lat: parseFloat(String(p_marker.position.lat)),
      lng: parseFloat(String(p_marker.position.lng)),
    }
  );
  zoomMap.value = 17;
};

// //***************************************************
// //******   GOOGLE MAPS AUTOCOMPLEATE ****************
// //***************************************************
//LINK: https://developers.google.com/maps/documentation/places/web-service/details

const setPlace = (e: any) => {
  newStore.latitude = e.geometry.viewport.Ab.h;
  newStore.longitude = e.geometry.viewport.Ua.h;
  newStore.placeLink = e.url;
  newStore.address = e.formatted_address;
  newStore.address_components = e.address_components;
};

// //***************************************************
// //******  MODAL NEW STORE     ***********************
// //***************************************************
// LINK: https://www-npmjs-com.translate.goog/package/vue3-country-intl?_x_tr_sl=auto&_x_tr_tl=es&_x_tr_hl=es
const selectedCountry = () => {};
const isNewStore = ref(false);
const countryOptions = reactive([
  { country: "Perú", iso: "pe", label: "Perú" },
  { country: "España", iso: "es", label: "España" },
]);
const countryModel = ref("");
const modalStoreTitle: Ref<string> = ref("Nueva Tienda");
const openModal = () => {
  modalStoreTitle.value = "Nueva Tienda";
  isNewStore.value = true;
  newStore.store = "";
  newStore.address = "";
  newStore.cityId = 0;
  newStore.isOpenAlways = false;
  newStore.isMain = false;
  newStore.description = "";
  newStore.latitude = 0;
  newStore.longitude = 0;
  newStore.compleateNumber = "";
  opened.value = true;
  newStore?.phones?.push({
    phone: "",
    isWspMain: false,
    countryCode: "",
    type: "",
  });
};

const phoneTypes: Array<{ label: string; value: string }> = [
  {
    label: translate("global-phone-mobile"),
    value: "MOB",
  },
  {
    label: translate("global-phone-tel"),
    value: "TEL",
  },
];

const editExistingStore = (store: IStore) => {
  isStoreBeingEdited.value = true;
  newStore.id = store.id;
  modalStoreTitle.value = "Editar tienda: " + store.store;
  isNewStore.value = false;
  newStore.store = store.store;
  newStore.description = store.description;
  newStore.latitude = store.latitude;
  newStore.address = store.address;
  newStore.compleateNumber = store.compleateNumber;
  newStore.longitude = store.longitude;
  newStore.isMain = store.isMain;
  newStore.isOpenAlways = store.isOpenAlways;
  if (store.phones?.length === 0) {
    newStore?.phones?.push({
      phone: "",
      isWspMain: false,
      countryCode: "",
      type: "",
    });
  } else {
    newStore.phones = store.phones;
  }
  opened.value = true;
};
const deleteStore = (store: IStore) => {
  directionController.removeStore(store);
};

function setDirectionForExistingStore() {
  isStoreBeingEdited.value = false;
}

let newStore: IStoreSave = reactive({
  store: "",
  description: "",
  address: "",
  isMain: false,
  latitude: 0,
  longitude: 0,
  isOpenAlways: false,
  cityId: 0,
  phones: [],
});
const opened = ref(false);

const saveStore = () => {
  //newStore.country = countryModel.value;
  if (newStore.phones) {
    newStore.phones[0].countryCode = newStore.compleateNumber?.split(" ")[0]!;
    newStore.phones[0].phone = newStore.compleateNumber
      ?.split(" ")
      .slice(1)
      .join("")!;

    if (newStore.phones[0].type === "TEL") {
      newStore.phones[0].isWspMain = false;
    }
  }

  directionController.saveOrEditNewStore(newStore, isNewStore.value);
  opened.value = false;
};

const thumbStyle = {
  right: "2px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: "0.75",
};

const contentStyle = {
  backgroundColor: "#fff",
  color: "#000000",
};

watch(
  () => newStore.phones,
  () => {
    if (newStore.phones) {
      if (newStore.phones?.filter((e) => (e.isWspMain = true)).length > 1)
        createWarnNotification(
          "WhatsApp For more than one mobile is not posible"
        );
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.mapViewer {
  width: 60vw;
  height: 60vh;
  margin: auto;
}

.example-item {
  height: 76px;
  width: 300px;
}

.modal-vue .overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.direction-autocompleate {
  width: 37vw !important;
  height: 5vh;
  background-color: #ffffff;
  border-radius: 5px;
  border-style: outset;
  margin-bottom: 15px;
  padding-left: 10px;
  border-color: #c2c2c2;
  border-width: 1px;
}

.item-store {
  padding: 10px;
  border: 1px solid #f3f4f5;
  box-shadow: -1px 1px #f3f4f5, 2px 2px #f3f4f5, -3px 3px #f3f4f5,
    -4px 4px #f3f4f5, -5px 5px #f3f4f5;
}

.item-store-active {
  background-color: aqua;
}
.tooltip:hover {
  cursor: help;
}

@media (min-width: 1300px) {
  .modal-vue .modal {
    position: fixed;
    width: 41vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }

  .scroll-area-for-modal {
    height: 65vh;
  }
}

@media (max-width: 530px) {
  .modal-vue .modal {
    position: fixed;
    width: 70vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    left: 50%;
    top: 80px;
    transform: translate(-50%, 0);
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
  .scroll-area-for-modal {
    height: 80vh;
  }
}

@media (min-width: 531px) and (max-width: 900px) {
  .modal-vue .modal {
    position: fixed;
    width: 60vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    margin-left: 10%;
    left: 40%;
    top: 10px;
    transform: translate(-50%, 0);
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
  .scroll-area-for-modal {
    height: 65vh;
  }
}

@media (min-width: 901px) and (max-width: 1299px) {
  .modal-vue .modal {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    width: 60vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    top: 10px;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
}

@media (max-width: 1049px) {
  .direction-whole-container {
    display: block;
    justify-content: space-around;
    width: 100%;
  }

  .scroll-area {
    height: 150px;
    margin: 5% auto 10%;
    max-width: 520px;
    min-width: 350px;
    width: auto;
    display: block;
  }
}

@media (min-width: 1050px) {
  .direction-whole-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .direction-list-child {
    flex-grow: 1;
    margin-left: 15px;
  }

  .direction-map-child {
    flex-grow: 1;
    margin-bottom: 5%;
    margin-top: 2%;
  }

  .scroll-area {
    position: page;
    margin-top: 50%;
    height: 400px;
    width: 20vw;
    background-color: #ffffff;
  }

  #btn-new-store-modal {
    position: absolute;
    top: 15%;
    left: 200px;
  }
}
</style>
