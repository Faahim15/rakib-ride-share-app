import { Dimensions } from "react-native";

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const { width, height } = Dimensions.get("window");

export const scale = (size: number): number => (width / BASE_WIDTH) * size;

export const verticalScale = (size: number): number =>
  (height / BASE_HEIGHT) * size;

const Scaling = {
  scale,
  verticalScale,
};

export default Scaling;
