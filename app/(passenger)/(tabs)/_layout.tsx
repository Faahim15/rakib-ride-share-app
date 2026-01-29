import {
  chatIcon,
  homeIcon,
  profileIcon,
  tripIcon,
} from "@/assets/svg/tabs-svg";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import { SvgXml } from "react-native-svg";

export default function TabsLayout() {
  const { t } = useLanguage();

  return (
    <>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#FFFFFF80",
          tabBarStyle: {
            backgroundColor: "#053F53",
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarLabelStyle: {
            fontSize: scale(11),
            // color: "#fff",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: t("passenger.tabs.titles.home"),
            href: "/home",
            // ✅ FORCE reset to home/index.tsx
            tabBarIcon: ({ color }) => (
              <SvgXml
                xml={homeIcon.replace(/fill="white"/g, `fill="${color}"`)}
                height={verticalScale(24)}
                width={scale(24)}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="trip"
          options={{
            title: t("passenger.tabs.titles.myTrip"),
            headerShown: true,
            headerTitle: t("passenger.tabs.titles.myTrip"),
            headerTitleAlign: "center",
            headerTitleStyle: {
              // color: "#101828",
              fontSize: 16,
              fontFamily: "Poppins_600SemiBold",
            },
            tabBarIcon: ({ color, focused }) => (
              <SvgXml
                xml={tripIcon.replace(/fill="white"/g, `fill="${color}"`)}
                height={verticalScale(24)}
                width={scale(24)}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: t("passenger.tabs.titles.chats"),
            headerShown: true,
            headerTitle: t("passenger.tabs.titles.messages"),
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#101828",
              fontSize: 16,
              fontFamily: "Poppins_600SemiBold",
            },
            tabBarIcon: ({ color, focused }) => (
              <SvgXml
                xml={chatIcon.replace(/fill="white"/g, `fill="${color}"`)}
                height={verticalScale(24)}
                width={scale(24)}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t("passenger.tabs.titles.profile"),
            headerShown: false,
            headerTitle: t("passenger.tabs.titles.profile"),
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#101828",
              fontSize: 16,
              fontFamily: "Poppins_600SemiBold",
            },
            tabBarIcon: ({ color, focused }) => (
              <SvgXml
                xml={profileIcon.replace(/fill="white"/g, `fill="${color}"`)}
                height={verticalScale(24)}
                width={scale(24)}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
