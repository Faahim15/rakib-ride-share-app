import AppImage from "@/src/components/image/AppImage";
import LanguageSelection from "@/src/components/onboarding/LanguageSelection";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { OnboardingItemProps } from "@/src/types/onboarding.types";
import { scale, verticalScale } from "@/src/utils/scaling";
import React from "react";
import { Dimensions, Text, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const OnboardingItem: React.FC<OnboardingItemProps> = ({
  item,
  onLanguageNext,
}) => {
  const { t } = useLanguage(); // Use t from context

  if (item.isLanguageSelection) {
    return <LanguageSelection onNext={onLanguageNext} />;
  }

  return (
    <View
      className="flex-1 items-center justify-center px-[6%]"
      style={{ width: SCREEN_WIDTH }}
    >
      <View className="w-full h-[60%] items-center justify-center">
        {item.image && (
          <AppImage
            source={item.image}
            width={scale(item.imageWidth || 254)} // Use dynamic width with fallback
            height={verticalScale(item.imageHeight || 236)}
            style={{ resizeMode: "contain" }}
          />
        )}
      </View>

      <Text className="font-poppinsBold text-lg text-white mb-[3%]">
        {t(item.title)}
      </Text>

      <Text className="font-poppins text-base text-white text-center leading-6 px-[4%]">
        {t(item.description)}
      </Text>
    </View>
  );
};

export default OnboardingItem;
