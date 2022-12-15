// Import Quasar css
import "quasar/dist/quasar.css";

// Import icon libraries
// import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import iconSet from "quasar/icon-set/fontawesome-v5";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-sharp/material-icons-sharp.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import "@quasar/extras/mdi-v4/mdi-v4.css";
import "@quasar/extras/eva-icons/eva-icons.css";

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    brand: {
      primary: "#027BE3",
      secondary: "#26A69A",
      accent: "#9C27B0",

      dark: "#1D1D1D",

      positive: "#21BA45",
      negative: "#C1f015",
      info: "#31CCEC",
      warning: "#F2C037",
    },
  },
  plugins: {},
  iconSet: iconSet,
  extras: [
    "material-icons",
    "mdi-v6",
    "ionicons-v4", // last webfont was available in v4.6.3
    "eva-icons",
    "fontawesome-v6",
    "themify",
    "line-awesome",
    "bootstrap-icons",
  ],
};
