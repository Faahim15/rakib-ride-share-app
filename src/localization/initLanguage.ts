import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./i18n";

export const initLanguage = async () => {
  const savedLang = (await AsyncStorage.getItem("language")) as
    | "en"
    | "ar"
    | null;

  if (savedLang) {
    i18n.locale = savedLang;
  }
};
