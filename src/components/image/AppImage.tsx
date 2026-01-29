import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
  source?: string | number; // expo-image accepts URI string or require(...)
  width?: number;
  height?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  style?: object;
};

export default function AppImage({
  source,
  width = 100,
  height = 100,
  borderRadius = 0,
  borderWidth = 0,
  borderColor = "transparent",
  style,
}: Props) {
  // expo-image can take string (remote URI) or require(...) directly
  const imageSource = typeof source === "string" ? source : source;

  return (
    <Image
      source={imageSource}
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius,
          borderWidth,
          borderColor,
        },
        style,
      ]}
      contentFit="cover" // expo-image uses contentFit instead of resizeMode
      transition={300} // smooth fade-in
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: "transparent", // fallback background
  },
});
