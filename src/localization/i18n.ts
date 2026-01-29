import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import ar from "./ar";
import en from "./en";

const i18n = new I18n({
  en,
  ar,
});

i18n.enableFallback = true;
i18n.defaultLocale = "en";

// device language (safe)
const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? "en";

i18n.locale = deviceLanguage === "ar" ? "ar" : "en";

export default i18n;
