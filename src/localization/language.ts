import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./i18n";

export const setLanguage = async (lang: "en" | "ar") => {
  i18n.locale = lang;
  await AsyncStorage.setItem("language", lang);
};
