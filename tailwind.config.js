/** @type {import('tailwindcss').Config} */
const { GlobalColors } = require("./src/utils/globalColor");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        poppinsMedium: ["Poppins_500Medium"],
        poppinsSemiBold: ["Poppins_600SemiBold"],
        poppinsBold: ["Poppins_700Bold"],
      },
      colors: {
        primaryColor: GlobalColors.primaryColor,
        brandColor: GlobalColors.brandColor,
        brandColor2: GlobalColors.brandColor2,
        themeGray: GlobalColors.gray,
        themeGray2: GlobalColors.gray2,
      },
    },
  },
  plugins: [],
};
