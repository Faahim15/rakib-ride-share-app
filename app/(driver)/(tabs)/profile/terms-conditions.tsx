import React from "react";
import { ScrollView, Text, View } from "react-native";

// Terms & Conditions Screen
export default function TermsConditionsScreen() {
  const sections = [
    {
      title: "Introduction",
      content:
        'Welcome to Alygo — a platform designed to connect passengers and drivers in a safe, reliable ride-sharing experience. By accessing or using the Alygo mobile application and related services ("Service"), you agree to be bound by these Terms & Conditions. Please read them carefully.',
    },
    {
      title: "User Eligibility",
      content:
        "To use Alygo, you must be at least 18 years old (or the legal age in your jurisdiction) and all information you provide is accurate, complete, and truthful. You are responsible for maintaining the confidentiality of your account credentials and for any activity that occurs under your account.",
    },
    {
      title: "Passenger Responsibilities",
      content:
        "Drivers must complete all required onboarding processes, including vehicle inspections, background checks, and license verification. Documentation: Passengers must verify their information via phone number, email, or approved ID. Reporting: Report any registration or identity concerns immediately.",
    },
    {
      title: "Driver Responsibilities",
      content:
        "Drivers are independent contractors and must maintain valid licenses, insurance, and vehicle registration. All drivers must complete background checks and vehicle inspections before accepting rides. Drivers must comply with all local traffic laws and provide safe, professional service to passengers.",
    },
    {
      title: "Payment Terms",
      content:
        "All fares are calculated based on distance, time, and demand. Payment is processed through the app using your selected payment method. Cancellation fees may apply based on timing. Refunds are handled on a case-by-case basis through our support team.",
    },
    {
      title: "Prohibited Conduct",
      content:
        "Users must not engage in harassment, discrimination, or illegal activities. Fraudulent behavior, unauthorized use of accounts, or violations of these terms may result in account suspension or termination. We reserve the right to refuse service to anyone who violates our policies.",
    },
    {
      title: "Limitation of Liability",
      content:
        "Alygo acts as a platform connecting drivers and passengers. We are not responsible for the actions of drivers or passengers. Your use of the service is at your own risk. We do not guarantee the availability, quality, or safety of transportation services.",
    },
    {
      title: "Changes to Terms",
      content:
        "We reserve the right to modify these Terms & Conditions at any time. We will notify users of significant changes through the app or via email. Continued use of the service after changes constitutes acceptance of the new terms.",
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
