import React from "react";
import { Animated, Dimensions, Easing, View } from "react-native";

const { height } = Dimensions.get("window");

// Simple skeleton element component
const SkeletonElement = ({ width, height, style }: any) => {
  const fadeAnim = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: "#E1E9EE",
          opacity: fadeAnim,
          borderRadius: 4,
          width,
          height,
        },
        style,
      ]}
    />
  );
};

export default function PassengerRequestSkeleton() {
  return (
    <View
      style={{
        flex: 1,
        minHeight: height,
        paddingHorizontal: "6%",
        paddingTop: "4%",
      }}
    >
      {/* Profile */}
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        <SkeletonElement width={96} height={96} style={{ borderRadius: 48 }} />
        <SkeletonElement width={120} height={18} style={{ marginTop: 12 }} />
        <SkeletonElement
          width={140}
          height={14}
          style={{ marginTop: 8, borderRadius: 20 }}
        />
      </View>

      {/* Trip Info */}
      <View style={{ padding: 16, borderRadius: 16, marginBottom: 20 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <SkeletonElement width={140} height={12} />
            <SkeletonElement width={80} height={12} />
          </View>
        ))}
      </View>

      {/* Amenities */}
      <SkeletonElement width={200} height={14} style={{ marginBottom: 16 }} />

      {/* Stops */}
      {Array.from({ length: 2 }).map((_, i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <SkeletonElement
            width={24}
            height={24}
            style={{ borderRadius: 12, marginRight: 12 }}
          />
          <SkeletonElement width={100} height={12} />
        </View>
      ))}

      {/* Button */}
      <SkeletonElement
        height={52}
        style={{ borderRadius: 12, marginTop: 24 }}
      />
    </View>
  );
}
