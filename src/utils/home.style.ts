import { Platform, StyleSheet } from "react-native";
import { scale, verticalScale } from "./scaling";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  notificationIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  notificationText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "System" : "Poppins_500Medium",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  publishButton: {
    backgroundColor: "#00ABB0",
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(32),
    borderRadius: scale(8),
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    // fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "Poppins_600SemiBold",
  },
});
