// Privacy Policy Screen
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function PrivacyPolicyScreen() {
  const sections = [
    {
      title: "Privacy Policy",
      content:
        "Your privacy is extremely important to us. This Privacy Policy explains how Alygo collects, uses, shares, and protects your personal data when you use our mobile application and services.",
    },
    {
      title: "Information We Collect",
      content:
        "When you use Alygo, we may collect the following categories of data:",
    },
    {
      title: "Personal Information",
      content:
        "Full Name, profile photo, phone number, email address, date of birth, government-issued ID, payment details, driver license (for drivers), vehicle details, driver's license, insurance information, and vehicle inspection data.",
    },
    {
      title: "Location Data",
      content:
        "Real-time GPS location, pickup and drop-off locations, route history, fare amounts, distance traveled, trip duration, driver and passenger ratings, and more.",
    },
    {
      title: "Device and Usage Data",
      content:
        "Device type, operating system, app version, IP address, crash logs, and performance data. Usage: Information within the app such as ride history, search queries, preferences, and interactions with the app.",
    },
    {
      title: "Payment Information",
      content:
        "Credit or debit card details (stored securely via third-party payment processors), transaction history, billing addresses, and payment method preferences.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use your information to provide and improve our services, process payments, ensure safety and security, communicate with you about your rides and account, personalize your experience, and comply with legal obligations.",
    },
    {
      title: "Data Sharing",
      content:
        "We may share your data with drivers (location and contact info during rides), payment processors, service providers who help us operate the platform, and law enforcement when required by law. We never sell your personal information to third parties.",
    },
    {
      title: "Data Security",
      content:
        "We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no system is completely secure, and we cannot guarantee absolute security.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal data. You can update your information in the app settings or contact our support team. You may also opt out of promotional communications at any time.",
    },
    {
      title: "Data Retention",
      content:
        "We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account and associated data by contacting support.",
    },
    {
      title: "Changes to Privacy Policy",
      content:
        "We may update this Privacy Policy periodically. We will notify you of significant changes through the app or email. Your continued use of our services after changes constitutes acceptance of the updated policy.",
    },
  ];

  return (
    <View className="flex-1 pt-[2%] bg-white">
      {/* Content */}
      <ScrollView
        className="flex-1 bg-white px-[6%]"
        showsVerticalScrollIndicator={false}
      >
        <View className="pb-8">
          {sections.map((section, index) => (
            <View key={index} className="mb-6">
              <Text className="font-poppinsSemiBold text-base mb-2">
                {section.title}
              </Text>
              <Text className="font-poppins text-sm text-gray-600 leading-6">
                {section.content}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
