import { createApp } from "vue";
import { Quasar, Dialog, Notify, Loading, QSpinnerGears } from "quasar";
import App from "./App.vue";
// import HighchartsVue from "highcharts-vue";
// Plugins
import router from "./plugins/router";
import quasarUserOptions from "./plugins/quasar/quasar-user-options";
import i18n from "./plugins/i18n/i18n";
// @ts-ignore
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";
//LINK: (documentacion) https://www.npmjs.com/package/vue-google-maps
import VueGoogleMaps from "@fawmi/vue-google-maps";

import "vue-advanced-cropper/dist/style.css";

//LINK: (documentacion) https://animate.style/
import "animate.css";

// main Controllers
import appController from "@/controller/Controller";

// Style
import "@/styles/base.css";

import { GOOGLE_MAPS_KEY } from "@/constants";
const globalOptions = {
  mode: "international",
  autoFormat: true
};

const app = createApp(App);

app.use(router);
app.use(
  Quasar,
  { plugins: { Dialog, Notify, Loading, QSpinnerGears } },
  quasarUserOptions
);
app.use(i18n);
// @ts-ignore
// app.use(HighchartsVue);

app.use(VueTelInput, globalOptions);
app.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAPS_KEY,
    libraries: "places",
  },
});
app.provide("appController", appController);
app.mount("#app");
