import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

interface OtpFieldProps {
  onOtpChange?: (otp: string[]) => void;
}

export default function OtpField({ onOtpChange }: OtpFieldProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Send OTP to parent
    onOtpChange?.(newOtp);

    // Move to next input if text is entered
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputFocus = (index: number) => {
    // Select text when input is focused
    inputRefs.current[index]?.setNativeProps({
      selection: { start: 0, end: otp[index].length },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-white"
    >
      <View className="justify-center mt-2 items-center">
        <View className="flex-row  justify-between w-[90%] mb-6">
          {otp.map((digit, index) => (
            <View key={index} className="w-[14%] aspect-square">
              <TextInput
                ref={(ref: TextInput | null) => {
                  inputRefs.current[index] = ref;
                }}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => handleInputFocus(index)}
                keyboardType="number-pad"
                maxLength={1}
                className="border-b-2 border-brandColor text-center text-2xl font-poppinsSemiBold text-brandColor "
                style={{ textAlignVertical: "center" }}
              />
            </View>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
