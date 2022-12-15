import { createI18n } from "vue-i18n";

/**
 * import locale messages resource from json for global scope
 */
import es from "@/plugins/i18n/locales/es.json";
import en from "@/plugins/i18n/locales/en.json";
import { DEFAULT_LANGUAGE } from "@/constants";

// TODO
// function loadLocaleMessages(): LocaleMessages<VueMessageType> {
//   const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages: LocaleMessages<VueMessageType> = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key).default
//     }
//   })
//   return messages
// }

const numberFormats = {
  en: {
    decimal: {
      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
    },
    percent: {
      style: 'percent', useGrouping: false
    }
  },
  es: {
    decimal: {
      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
    },
    percent: {
      style: 'percent', useGrouping: false
    }
  },
}

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANGUAGE || "en",
  fallbackLocale: ["es", "en"],
  numberFormats,
  datetimeFormats:  {
    en: {
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
      }
    },
    es: {
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
      }
    }
  },
  messages: {
    es: es,
    en: en,
  },
  globalInjection: true,
});

export default i18n;

export function translate(word: string) {
  return i18n.global.t(word);
}
