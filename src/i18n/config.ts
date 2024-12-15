import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enUS from "./locales/en-us.json";
import esUS from "./locales/es-us.json";
import ptBR from "./locales/pt-br.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "en-US": {
        translation: enUS,
      },
      "pt-BR": {
        translation: ptBR,
      },
      "es-US": {
        translation: esUS,
      },
    },
    fallbackLng: "en-US",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

initReactI18next.init(i18n);

export default i18n;
