import { useLanguage } from "@/src/localization/LangaugeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reason: string, description: string) => void;
}

export default function ReportModal({
  visible,
  onClose,
  onSubmit,
}: ReportModalProps) {
  const [selectedReason, setSelectedReason] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { t } = useLanguage();
  const handleSubmit = () => {
    if (selectedReason) {
      onSubmit(selectedReason, description);
      setSelectedReason("");
      setDescription("");
      onClose();
    }
  };
  const reportReasons = [
    t("passenger.tabs.home.describeTheIssue"),
    t("passenger.tabs.home.rude"),
    t("passenger.tabs.home.carCondition"),
    t("passenger.tabs.home.conduct"),
    t("passenger.tabs.home.cancelledMultipleTimes"),
    t("passenger.tabs.home.other"),
  ];
  const handleClose = () => {
    setSelectedReason("");
    setDescription("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        className="flex-1"
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="font-poppinsBold text-xl text-gray-900">
                {t("passenger.tabs.home.reportDriver")}
              </Text>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Reason Selection */}
              <Text className="font-poppinsMedium text-base text-gray-900 mb-3">
                {t("passenger.tabs.home.selectReason")}
              </Text>
              {reportReasons.map((reason) => (
                <TouchableOpacity
                  key={reason}
                  onPress={() => setSelectedReason(reason)}
                  className={`flex-row items-center p-4 mb-2 rounded-lg border ${
                    selectedReason === reason
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <View
                    className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                      selectedReason === reason
                        ? "border-orange-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedReason === reason && (
                      <View className="w-3 h-3 rounded-full bg-orange-500" />
                    )}
                  </View>
                  <Text
                    className={`font-poppins text-sm ${
                      selectedReason === reason
                        ? "text-orange-600"
                        : "text-gray-700"
                    }`}
                  >
                    {reason}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Additional Description - Only shown when "Other" is selected */}
              {selectedReason === "Other" && (
                <>
                  <Text className="font-poppinsMedium text-base text-gray-900 mt-4 mb-3">
                    {t("passenger.tabs.home.describeTheIssue")}{" "}
                    <Text className="text-red-500">*</Text>
                  </Text>
                  <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder={t("passenger.tabs.home.describeWhatHappend")}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    className="border border-gray-200 rounded-lg p-4 font-poppins text-sm text-gray-900 min-h-[100px]"
                  />
                </>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={
                  !selectedReason ||
                  (selectedReason === "Other" && !description.trim())
                }
                className={`mt-6 py-4 rounded-lg ${
                  selectedReason &&
                  (selectedReason !== "Other" || description.trim())
                    ? "bg-orange-500"
                    : "bg-gray-300"
                }`}
              >
                <Text className="font-poppinsMedium text-base text-white text-center">
                  {t("passenger.tabs.home.submitReport")}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
