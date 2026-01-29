// About Us Screen
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function AboutUsScreen() {
  const sections = [
    {
      title: "About Rakib Rider Share",
      content:
        "Rakib Rider Share is a modern ride-sharing platform designed to connect drivers and passengers for safe, affordable, and convenient travel. We're committed to making transportation accessible for everyone while building a trusted community of riders.",
    },
    {
      title: "Our Mission",
      content:
        "To revolutionize the way people travel by providing a reliable, cost-effective ride-sharing solution that brings communities together and reduces transportation costs for everyone.",
    },
    {
      title: "What We Offer",
      content:
        "Real-time ride matching, flexible booking options, secure payment processing, verified drivers and passengers, transparent pricing, in-app communication, trip tracking and history, and 24/7 customer support.",
    },
    {
      title: "For Passengers",
      content:
        "Find affordable rides to your destination, share costs with other passengers, book seats in advance or on-demand, track your driver in real-time, rate your experience, and enjoy safe, comfortable journeys.",
    },
    {
      title: "For Drivers",
      content:
        "Earn extra income by sharing your ride, set your own schedule and routes, connect with verified passengers, manage bookings easily, receive payments securely, and build your reputation through ratings.",
    },
    {
      title: "Safety First",
      content:
        "Your safety is our priority. We verify all users, provide real-time GPS tracking, enable in-app communication, maintain trip records, and offer 24/7 support for emergencies.",
    },
    {
      title: "Join Our Community",
      content:
        "Whether you're a driver looking to share your commute or a passenger seeking affordable travel, Rakib Rider Share is here to make your journey better. Join thousands of users who trust us for their daily rides.",
    },
    {
      title: "Contact Us",
      content:
        "Have questions or feedback? We'd love to hear from you. Reach out to our support team anytime through the app or email us at support@rabiridershare.com",
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
