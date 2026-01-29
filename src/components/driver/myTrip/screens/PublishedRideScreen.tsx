import ACToggleField from "@/src/components/driver/myRides/AcToggleField";
import DateFieldComponent from "@/src/components/driver/myRides/DateField";
import EditInputField from "@/src/components/driver/myRides/EditInputField";
import LocationFieldComponent from "@/src/components/driver/myRides/LocationField";
import LocationPickerModal from "@/src/components/driver/myRides/LocationPickerModal";
import RideCard from "@/src/components/driver/myRides/RideCard";
import TimeFieldComponent from "@/src/components/driver/myRides/TimeField";
import { useLanguage } from "@/src/localization/LangaugeContext";
import publishedRidesData, {
  LocationCoords,
  Ride,
} from "@/src/mockData/driver/myRides.data";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PublishedRideScreen() {
  const [rides, setRides] = useState<Ride[]>(publishedRidesData);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRide, setEditingRide] = useState<Ride | null>(null);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [editingLocationType, setEditingLocationType] = useState<
    "pickup" | "dropoff" | null
  >(null);

  const [editForm, setEditForm] = useState<Partial<Ride>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const { t } = useLanguage();
  // Filter pending rides only
  const pendingRides = useMemo(
    () => rides.filter((ride) => ride.status === "pending"),
    [rides]
  );

  const handleEdit = useCallback((ride: Ride) => {
    setEditingRide(ride);
    setEditForm({ ...ride });
    setModalVisible(true);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (!editingRide || !editForm) return;

    setRides((prevRides) =>
      prevRides.map((r) =>
        r.id === editingRide.id ? { ...r, ...editForm } : r
      )
    );
    setModalVisible(false);
    setEditingRide(null);
    Alert.alert(
      t("driver.tabs.myTrip.publishedRides.updateSuccess"),
      t("driver.tabs.myTrip.publishedRides.updateSuccessMessage")
    );
  }, [editingRide, editForm, t]);

  const handleStatusChange = useCallback(
    (rideId: string, newStatus: Ride["status"]) => {
      setRides((prevRides) =>
        prevRides.map((r) =>
          r.id === rideId ? { ...r, status: newStatus } : r
        )
      );
    },
    []
  );

  const handleDeleteRide = useCallback(
    (rideId: string) => {
      Alert.alert(
        t("driver.tabs.myTrip.publishedRides.deleteConfirmTitle"),
        t("driver.tabs.myTrip.publishedRides.deleteConfirmMessage"),
        [
          {
            text: t("driver.tabs.myTrip.publishedRides.deleteConfirmNo"),
            style: "cancel",
          },
          {
            text: t("driver.tabs.myTrip.publishedRides.deleteConfirmYes"),
            onPress: () => {
              setRides((prevRides) =>
                prevRides.map((r) =>
                  r.id === rideId ? { ...r, status: "cancelled" } : r
                )
              );
            },
          },
        ]
      );
    },
    [t]
  );

  const openLocationPicker = useCallback((type: "pickup" | "dropoff") => {
    setEditingLocationType(type);
    setLocationModalVisible(true);
  }, []);

  const handleLocationSelect = useCallback(
    (location: string, coords: LocationCoords) => {
      if (editingLocationType === "pickup") {
        setEditForm((prev) => ({
          ...prev,
          pickupLocation: location,
          pickupMarker: coords,
        }));
      } else if (editingLocationType === "dropoff") {
        setEditForm((prev) => ({
          ...prev,
          dropoffLocation: location,
          dropoffMarker: coords,
        }));
      }
      setLocationModalVisible(false);
      setEditingLocationType(null);
    },
    [editingLocationType]
  );

  return (
    <View className="flex-1 bg-white">
      {/* Rides List */}
      <FlatList
        data={pendingRides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RideCard
            ride={item}
            onEdit={handleEdit}
            onDelete={handleDeleteRide}
            onStatusChange={handleStatusChange}
          />
        )}
        // contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-12">
            <Ionicons name="car-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-600 font-poppinsSemiBold text-base mt-4">
              {t("driver.tabs.myTrip.publishedRides.noActiveRides")}
            </Text>
            <Text className="text-gray-500 font-poppins text-sm mt-2 text-center">
              {t(
                "driver.tabs.myTrip.publishedRides.completedAndCancelledMessage"
              )}
            </Text>
          </View>
        }
      />

      {/* Edit Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          className="flex-1 bg-black/50"
        >
          <View className="flex-1" />
          <View className="bg-white rounded-t-3xl p-6 max-h-4/5">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-gray-900 font-poppinsBold text-xl">
                {t("driver.tabs.myTrip.publishedRides.editRideModal")}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={[
                {
                  key: "pickup",
                  label: t("driver.tabs.myTrip.publishedRides.pickupLabel"),
                  type: "location",
                },
                {
                  key: "dropoff",
                  label: t("driver.tabs.myTrip.publishedRides.dropoffLabel"),
                  type: "location",
                },
                {
                  key: "date",
                  label: t("driver.tabs.myTrip.publishedRides.dateLabel"),
                  type: "date",
                },
                {
                  key: "time",
                  label: t("driver.tabs.myTrip.publishedRides.timeLabel"),
                  type: "time",
                },
                {
                  key: "seats",
                  label: t("driver.tabs.myTrip.publishedRides.seatsLabel"),
                  type: "input",
                },
                {
                  key: "pricePerSeat",
                  label: t(
                    "driver.tabs.myTrip.publishedRides.pricePerSeatLabel"
                  ),
                  type: "input",
                },
                {
                  key: "fullCarPrice",
                  label: t(
                    "driver.tabs.myTrip.publishedRides.fullCarPriceLabel"
                  ),
                  type: "input",
                },
                {
                  key: "ac",
                  label: t("driver.tabs.myTrip.publishedRides.acLabel"),
                  type: "toggle",
                },
              ]}
              keyExtractor={(item) => item.key}
              scrollEnabled
              renderItem={({ item }) => {
                if (item.type === "location") {
                  const locationKey =
                    item.key === "pickup"
                      ? "pickupLocation"
                      : "dropoffLocation";
                  return (
                    <LocationFieldComponent
                      label={item.label}
                      value={
                        editForm[locationKey as keyof typeof editForm] as string
                      }
                      onPress={() =>
                        openLocationPicker(item.key as "pickup" | "dropoff")
                      }
                    />
                  );
                } else if (item.type === "date") {
                  return (
                    <DateFieldComponent
                      label={item.label}
                      value={editForm.date as string}
                      onPress={() => setShowDatePicker(true)}
                    />
                  );
                } else if (item.type === "time") {
                  return (
                    <TimeFieldComponent
                      label={item.label}
                      value={editForm.time as string}
                      onPress={() => setShowTimePicker(true)}
                    />
                  );
                } else if (item.type === "input") {
                  const fieldMap: Record<string, keyof Ride> = {
                    seats: "numberOfSeats",
                    pricePerSeat: "pricePerSeat",
                    fullCarPrice: "fullCarPrice",
                  };
                  const field = fieldMap[item.key];
                  const keyboardType =
                    item.key === "seats" ? "number-pad" : "decimal-pad";
                  return (
                    <EditInputField
                      label={item.label}
                      value={editForm[field] as string}
                      onChangeText={(text) =>
                        setEditForm({ ...editForm, [field]: text })
                      }
                      keyboardType={keyboardType}
                    />
                  );
                } else if (item.type === "toggle") {
                  return (
                    <ACToggleField
                      acEnabled={editForm.acEnabled || false}
                      onToggle={(value) =>
                        setEditForm({ ...editForm, acEnabled: value })
                      }
                    />
                  );
                }
                return null;
              }}
              scrollEventThrottle={16}
            />

            {/* Save Button */}
            <View className="flex-row gap-2 mt-6">
              <TouchableOpacity
                onPress={handleSaveEdit}
                className="flex-1 bg-brandColor rounded-lg py-3"
              >
                <Text className="text-white font-poppinsBold text-base text-center">
                  {t("driver.tabs.myTrip.publishedRides.saveChanges")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="flex-1 bg-gray-200 rounded-lg py-3"
              >
                <Text className="text-gray-700 font-poppinsBold text-base text-center">
                  {t("driver.tabs.myTrip.publishedRides.cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={new Date()}
          onChange={(event, date) => {
            if (date) {
              setSelectedDate(date);
              const dateString = date.toISOString().split("T")[0];
              setEditForm({ ...editForm, date: dateString });
            }
            setShowDatePicker(false);
          }}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => {
            if (date) {
              setSelectedTime(date);
              const timeString = date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
              setEditForm({ ...editForm, time: timeString });
            }
            setShowTimePicker(false);
          }}
        />
      )}

      {/* Location Picker Modal */}
      <Modal
        visible={locationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View className="flex-1 bg-white">
          <LocationPickerModal
            onClose={() => setLocationModalVisible(false)}
            onSelectLocation={handleLocationSelect}
            locationType={editingLocationType}
          />
        </View>
      </Modal>
    </View>
  );
}
