interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image?: any;
  imageWidth?: number; // Add this
  imageHeight?: number; // Add this
  isLanguageSelection?: boolean;
}

const onboardingData: OnboardingSlide[] = [
  {
    id: "1",
    title: "onboarding.slide1.title",
    description: "onboarding.slide1.description",
    image: require("@/assets/images/onboarding/frame.png"),
    imageWidth: 244,
    imageHeight: 232,
    isLanguageSelection: true,
  },
  {
    id: "2",
    title: "onboarding.slide2.title",
    description: "onboarding.slide2.description",
    imageWidth: 252,
    imageHeight: 232,
    image: require("@/assets/images/onboarding/cars.png"),
  },
  {
    id: "3",
    title: "onboarding.slide3.title",
    description: "onboarding.slide3.description",
    imageWidth: 216,
    imageHeight: 216,
    image: require("@/assets/images/onboarding/car2.png"),
  },
  {
    id: "4",
    title: "onboarding.slide4.title",
    description: "onboarding.slide4.description",
    imageWidth: 254,
    imageHeight: 220,
    image: require("@/assets/images/onboarding/car.svg"),
  },
  {
    id: "5",
    title: "onboarding.slide5.title",
    description: "onboarding.slide5.description",
    imageWidth: 244,
    imageHeight: 220,
    image: require("@/assets/images/onboarding/car5.png"),
  },
  {
    id: "6",
    title: "onboarding.slide6.title",
    description: "onboarding.slide6.description",
    imageWidth: 203,
    imageHeight: 182,
    image: require("@/assets/images/onboarding/driver.png"),
  },
  {
    id: "7",
    title: "onboarding.slide7.title",
    description: "onboarding.slide7.description",
    imageWidth: 244,
    imageHeight: 216,
    image: require("@/assets/images/onboarding/bro.png"),
  },
  {
    id: "8",
    title: "onboarding.slide8.title",
    description: "onboarding.slide8.description",
    imageWidth: 254,
    imageHeight: 220,
    image: require("@/assets/images/onboarding/Location.png"),
  },
];

export default onboardingData;
