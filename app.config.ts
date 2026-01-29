import "dotenv/config";
import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "ride-share-app",
  slug: "ride-share-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/splash-logo.png",
  scheme: "rideshareapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  ios: {
    bundleIdentifier: "com.fahim15.rideshareapp",
    supportsTablet: true,
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },

  android: {
    adaptiveIcon: {
      backgroundColor: "#053F53",
      foregroundImage: "./assets/images/splash-logo.png",
      backgroundImage: "./assets/images/splash-logo.png",
      monochromeImage: "./assets/images/splash-logo.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.fahim15.rideshareapp",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },

  web: {
    output: "static",
    favicon: "./assets/images/splash-logo.png",
    bundler: "metro",
  },

  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-logo.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#053F53",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    "expo-font",
    "expo-localization",
  ],

  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },

  // ✅ Add extra for runtime access
  extra: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
};

export default config;
