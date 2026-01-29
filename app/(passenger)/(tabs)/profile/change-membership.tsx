import { useLanguage } from "@/src/localization/LangaugeContext";
import { verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MembershipPlan {
  id: string;
  nameKey: string;
  title?: string;
  monthlyPrice: number;
  icon: string;
  featuresKeys: string[];
  popular?: boolean;
  color: string;
  bgColor: string;
  borderColor: string;
  buttonBgColor: string;
  buttonTextKey: string;
}

const membershipPlans: MembershipPlan[] = [
  {
    id: "1",
    nameKey: "driver.tabs.membershipPlans.freePlan.name",
    monthlyPrice: 0,
    icon: "gift-outline",
    color: "#6B7280",
    bgColor: "#F9FAFB",
    borderColor: "#111",
    buttonBgColor: "#6B7280",
    buttonTextKey: "driver.tabs.membershipPlans.freePlan.buttonText",
    featuresKeys: [
      "driver.tabs.membershipPlans.freePlan.features.0",
      "driver.tabs.membershipPlans.freePlan.features.1",
      "driver.tabs.membershipPlans.freePlan.features.2",
      "driver.tabs.membershipPlans.freePlan.features.3",
    ],
  },
  {
    id: "2",
    nameKey: "driver.tabs.membershipPlans.premium.name",
    title: "driver.tabs.membershipPlans.premium.title",
    monthlyPrice: 4,
    icon: "star",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    borderColor: "#2563EB",
    buttonBgColor: "#2563EB",
    buttonTextKey: "driver.tabs.membershipPlans.premium.buttonText",
    featuresKeys: [
      "driver.tabs.membershipPlans.premium.features.0",
      "driver.tabs.membershipPlans.premium.features.1",
      "driver.tabs.membershipPlans.premium.features.2",
      "driver.tabs.membershipPlans.premium.features.3",
      "driver.tabs.membershipPlans.premium.features.4",
    ],
    popular: true,
  },
  {
    id: "3",
    nameKey: "driver.tabs.membershipPlans.allAccess.name",
    title: "driver.tabs.membershipPlans.allAccess.title",
    monthlyPrice: 6,
    icon: "medal",
    color: "#D97706",
    bgColor: "#FFFBEB",
    borderColor: "#D97706",
    buttonBgColor: "#D97706",
    buttonTextKey: "driver.tabs.membershipPlans.allAccess.buttonText",
    featuresKeys: [
      "driver.tabs.membershipPlans.allAccess.features.0",
      "driver.tabs.membershipPlans.allAccess.features.1",
      "driver.tabs.membershipPlans.allAccess.features.2",
      "driver.tabs.membershipPlans.allAccess.features.3",
      "driver.tabs.membershipPlans.allAccess.features.4",
    ],
  },
  {
    id: "4",
    nameKey: "driver.tabs.membershipPlans.premiumPlus.name",
    title: "driver.tabs.membershipPlans.premiumPlus.title",
    monthlyPrice: 7,
    icon: "diamond",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#7C3AED",
    buttonBgColor: "#7C3AED",
    buttonTextKey: "driver.tabs.membershipPlans.premiumPlus.buttonText",
    featuresKeys: [
      "driver.tabs.membershipPlans.premiumPlus.features.0",
      "driver.tabs.membershipPlans.premiumPlus.features.1",
      "driver.tabs.membershipPlans.premiumPlus.features.2",
      "driver.tabs.membershipPlans.premiumPlus.features.3",
      "driver.tabs.membershipPlans.premiumPlus.features.4",
      "driver.tabs.membershipPlans.premiumPlus.features.5",
    ],
  },
];

export default function MembershipPlanScreen() {
  const { t } = useLanguage();
  const router = useRouter();
  const activePlanId = "1"; // Free plan is now active

  const handlePlanNavigation = (planId: string) => {
    switch (planId) {
      case "2":
        router.push({
          pathname: "/shared/rakib-payment-form",
          params: { id: "premium" },
        });
        break;

      case "3":
        router.push({
          pathname: "/shared/rakib-payment-form",
          params: { id: "allAccess" },
        });
        break;

      case "4":
        router.push({
          pathname: "/shared/rakib-payment-form",
          params: { id: "getplus" },
        });
        break;

      default:
        // Free plan or fallback
        break;
    }
  };

  const renderPlanCard = (plan: MembershipPlan) => {
    const isActivePlan = plan.id === activePlanId;

    return (
      <View
        key={plan.id}
        className="rounded-3xl p-[6%] mb-[4%]"
        style={{
          backgroundColor: plan.bgColor,
          borderWidth: 2,
          borderColor: isActivePlan ? plan.color : plan.borderColor,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isActivePlan ? 0.15 : 0.1,
          shadowRadius: isActivePlan ? 12 : 8,
          elevation: isActivePlan ? 6 : 4,
        }}
      >
        {isActivePlan && (
          <View className="absolute -top-3 self-center px-4 py-1.5 rounded-full bg-green-500">
            <Text className="font-poppinsSemiBold text-white text-xs">
              Current Plan
            </Text>
          </View>
        )}

        {plan.popular && !isActivePlan && (
          <View
            className="absolute -top-3 self-center px-4 py-1.5 rounded-full"
            style={{ backgroundColor: plan.color }}
          >
            <Text className="font-poppinsSemiBold text-white text-xs">
              {t("driver.tabs.membershipPlans.popular")}
            </Text>
          </View>
        )}

        <View className="items-center mb-4">
          <View className="w-16 h-16 rounded-full items-center justify-center mb-3 bg-white">
            <Ionicons name={plan.icon as any} size={32} color={plan.color} />
          </View>

          <Text
            className="font-poppinsBold text-2xl mb-1 text-center"
            style={{ color: plan.color }}
          >
            {t(plan.nameKey)}
          </Text>

          <View className="flex-row items-baseline justify-center">
            <Text
              className="font-poppinsBold text-4xl"
              style={{ color: plan.color }}
            >
              {plan.monthlyPrice}
            </Text>
            <Text className="font-poppinsMedium text-gray-600 text-base ml-1">
              JOD
            </Text>
          </View>
        </View>

        {plan.title && (
          <View>
            <Text
              style={{ color: plan.buttonBgColor }}
              className="font-poppins text-sm pb-[1.5%] text-[#03465c] "
            >
              {t(plan.title)}
            </Text>
          </View>
        )}

        <View className="mb-5">
          {plan.featuresKeys.map((featureKey, idx) => (
            <View key={idx} className="flex-row items-center mb-3">
              <View className="w-5 h-5 rounded-full items-center justify-center mr-3 bg-white">
                <Ionicons name="checkmark" size={14} color={plan.color} />
              </View>
              <Text className="font-poppins text-gray-700 text-sm flex-1">
                {t(featureKey)}
              </Text>
            </View>
          ))}
        </View>

        {/* Only render button if not free plan */}
        {plan.id !== "1" && (
          <TouchableOpacity
            className="rounded-xl py-3.5 items-center"
            style={{
              backgroundColor: isActivePlan ? "#10B981" : plan.buttonBgColor,
              opacity: isActivePlan ? 0.8 : 1,
            }}
            activeOpacity={0.8}
            onPress={() => !isActivePlan && handlePlanNavigation(plan.id)}
            disabled={isActivePlan}
          >
            <Text className="font-poppinsSemiBold text-white text-base">
              {isActivePlan ? "Active Plan" : t(plan.buttonTextKey)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-[5%] pt-[8%]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(80) }}
      >
        <View className="mb-6">
          <Text className="font-poppinsBold text-gray-800 text-3xl mb-2 text-center">
            {t("driver.tabs.membershipPlans.header")}
          </Text>
          <Text className="font-poppins text-gray-600 text-base text-center">
            {t("driver.tabs.membershipPlans.subheader")}
          </Text>
        </View>

        <View>{membershipPlans.map(renderPlanCard)}</View>
      </ScrollView>
    </View>
  );
}
