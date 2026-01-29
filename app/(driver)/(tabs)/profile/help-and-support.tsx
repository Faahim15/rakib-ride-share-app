import { useLanguage } from "@/src/localization/LangaugeContext";
import faqs from "@/src/mockData/passenger/faqData";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HelpSupportScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { t } = useLanguage();
  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* FAQs Section */}
        <View className="px-[6%] mt-4">
          <Text className="font-poppinsSemiBold text-lg mb-[3%]">
            {t(
              "passenger.tabs.profileScreenText.helpAndSupportScreenText.frequentlyAskedQuestion",
            )}
          </Text>

          {/* FAQ Items */}
          <View className="bg-gray-50 rounded-2xl overflow-hidden">
            {faqs.map((faq, index) => (
              <View key={faq.id}>
                <TouchableOpacity
                  onPress={() => toggleFAQ(faq.id)}
                  className="px-4 py-4 flex-row items-center justify-between"
                  activeOpacity={0.7}
                >
                  <Text className="font-poppinsSemiBold text-sm flex-1 mr-2 text-gray-800">
                    {faq.question}
                  </Text>
                  <Ionicons
                    name={expandedId === faq.id ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>

                {/* Expanded Answer */}
                {expandedId === faq.id && (
                  <View className="px-4 pb-4 pt-0">
                    <Text className="font-poppins text-sm text-gray-800 leading-6">
                      {faq.answer}
                    </Text>
                  </View>
                )}

                {/* Divider */}
                {index < faqs.length - 1 && (
                  <View className="h-[1px] bg-gray-200 mx-4" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Need More Help Section */}
        <View className="px-[6%] pt-[4%] mt-[6%] mb-[6%]">
          <Text className="font-poppinsSemiBold text-lg mb-4">
            {t(
              "passenger.tabs.profileScreenText.helpAndSupportScreenText.needMoreHelp",
            )}
          </Text>

          {/* Mail Us Card */}
          <TouchableOpacity
            className="bg-gray-50 rounded-2xl p-[4%] flex-row items-center"
            activeOpacity={0.7}
          >
            <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-4">
              <Ionicons name="headset-outline" size={24} color="#000" />
            </View>
            <View className="flex-1">
              <Text className="font-poppinsSemiBold text-base mb-1">
                {t(
                  "passenger.tabs.profileScreenText.helpAndSupportScreenText.contactSupport",
                )}
              </Text>
              <Text className="font-poppins text-xs text-gray-600 mb-1">
                support@alygo.com
              </Text>
              <Text className="font-poppins text-xs text-gray-500">
                Available 24/7 • Response within 2 hours
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
