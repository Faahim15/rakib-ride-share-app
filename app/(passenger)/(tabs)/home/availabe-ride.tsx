import AppImage from "@/src/components/image/AppImage";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Driver {
  id: string;
  name: string;
  rating: number;
  totalRides: number;
  arrivalTime: string;
  image: string;
  pricePerSeat: string;
  totalSeats: number;
  fullCarPrice: string;
  date: string;
  time: string;
  ladiesOnly: boolean;
  isAccepted?: boolean;
  departureLocation?: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  arrivalLocation?: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
}

type GenderPreference = "male" | "female" | "no-preference" | null;

export default function AvailableRidesScreen() {
  const params = useLocalSearchParams();
  const { t } = useLanguage();

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [acceptedDriverIds, setAcceptedDriverIds] = useState<Set<string>>(
    new Set(),
  );
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [luggage, setLuggage] = useState<{ [key: string]: string | null }>({});
  const [genderPreference, setGenderPreference] = useState<{
    [key: string]: GenderPreference;
  }>({});

  useEffect(() => {
    fetchAvailableRides();
  }, []);

  const fetchAvailableRides = () => {
    const mockDrivers: Driver[] = [
      {
        id: "1",
        name: "Alex Jackob",
        rating: 4.8,
        totalRides: 500,
        arrivalTime: "5 mins",
        image: "https://i.pravatar.cc/150?img=12",
        pricePerSeat: "5.50 JOD",
        totalSeats: 4,
        fullCarPrice: "22 JOD",
        date: "31 Dec, 2025",
        time: "2:30 PM",
        ladiesOnly: false,
        isAccepted: false,
        departureLocation: {
          address: "King Hussein Street",
          city: "Amman",
          latitude: 31.9454,
          longitude: 35.9284,
        },
        arrivalLocation: {
          address: "University Street",
          city: "Zarqa",
          latitude: 32.0557,
          longitude: 36.0872,
        },
      },
      {
        id: "2",
        name: "Helen Sujo",
        rating: 4.8,
        totalRides: 450,
        arrivalTime: "5 mins",
        image: "https://i.pravatar.cc/150?img=45",
        pricePerSeat: "4.75 JOD",
        totalSeats: 3,
        fullCarPrice: "15 JOD",
        date: "31 Dec, 2025",
        time: "2:45 PM",
        ladiesOnly: true,
        isAccepted: false,
        departureLocation: {
          address: "Al-Din Al-Husseini Street",
          city: "Amman",
          latitude: 31.9454,
          longitude: 35.9284,
        },
        arrivalLocation: {
          address: "Nablus Street",
          city: "Irbid",
          latitude: 32.2754,
          longitude: 35.7597,
        },
      },
      {
        id: "3",
        name: "Michael Chen",
        rating: 4.9,
        totalRides: 680,
        arrivalTime: "7 mins",
        image: "https://i.pravatar.cc/150?img=33",
        pricePerSeat: "6.25 JOD",
        totalSeats: 5,
        fullCarPrice: "30 JOD",
        date: "31 Dec, 2025",
        time: "3:00 PM",
        ladiesOnly: false,
        isAccepted: false,
        departureLocation: {
          address: "Al-Habla Street",
          city: "Amman",
          latitude: 31.9454,
          longitude: 35.9284,
        },
        arrivalLocation: {
          address: "King Abdullah Street",
          city: "Aqaba",
          latitude: 29.5327,
          longitude: 35.0034,
        },
      },
      {
        id: "4",
        name: "Sarah Williams",
        rating: 4.7,
        totalRides: 320,
        arrivalTime: "8 mins",
        image: "https://i.pravatar.cc/150?img=22",
        pricePerSeat: "5.00 JOD",
        totalSeats: 4,
        fullCarPrice: "20 JOD",
        date: "31 Dec, 2025",
        time: "3:15 PM",
        ladiesOnly: false,
        isAccepted: false,
        departureLocation: {
          address: "Jebel Amman Street",
          city: "Amman",
          latitude: 31.9454,
          longitude: 35.9284,
        },
        arrivalLocation: {
          address: "Independence Street",
          city: "Jerash",
          latitude: 32.2758,
          longitude: 35.7905,
        },
      },
    ];

    setDrivers(mockDrivers);
  };

  const openLocationInGoogleMaps = (
    latitude: number,
    longitude: number,
    address: string,
  ) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      Alert.alert(
        t("passenger.availableRides.error"),
        "Could not open Google Maps",
      ),
    );
  };

  const handleChat = (driverId: string, driverName: string) => {
    Alert.alert(
      t("passenger.availableRides.chat"),
      `${t("passenger.availableRides.openingChat")} ${driverName}`,
    );
  };

  const handleCall = (driverId: string, driverName: string) => {
    Alert.alert(
      t("passenger.availableRides.call"),
      `${t("passenger.availableRides.calling")} ${driverName}`,
    );
  };

  const handleBookNow = (driver: Driver) => {
    const quantity = quantities[driver.id] || 1;
    const totalPrice = parseFloat(driver.pricePerSeat) * quantity;
    const selectedLuggage = luggage[driver.id];
    const selectedGender = genderPreference[driver.id];

    const genderText = selectedGender
      ? `\n${t("passenger.availableRides.genderPreference")}: ${
          selectedGender === "no-preference"
            ? t("passenger.availableRides.any")
            : selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)
        }`
      : "";

    const luggageText = selectedLuggage
      ? `\n${t("shared.tripDetailScreen.luggageSize")}: ${selectedLuggage}`
      : "";

    Alert.alert(
      t("passenger.availableRides.confirmRide"),
      `${t("passenger.availableRides.bookSeats")} ${quantity} ${quantity === 1 ? t("passenger.availableRides.seat") : t("passenger.availableRides.seats")} ${t("passenger.availableRides.with")} ${driver.name}?${genderText}${luggageText}\n${t("passenger.availableRides.total")}: ${totalPrice.toFixed(2)} JOD`,
      [
        { text: t("passenger.tabs.trip.cancelRide"), style: "cancel" },
        {
          text: t("passenger.availableRides.bookNow"),
          onPress: () => {
            setAcceptedDriverIds(new Set([...acceptedDriverIds, driver.id]));
            Alert.alert(
              t("passenger.availableRides.success"),
              `${quantity} ${quantity === 1 ? t("passenger.availableRides.seat") : t("passenger.availableRides.seats")} ${t("passenger.availableRides.bookingSuccess")} ${driver.name}!`,
            );
          },
        },
      ],
    );
  };

  const renderDriverCard = ({ item: driver }: { item: Driver }) => {
    const isAccepted = acceptedDriverIds.has(driver.id);
    const quantity = quantities[driver.id] || 1;
    const selectedLuggage = luggage[driver.id] || null;
    const selectedGender = genderPreference[driver.id] || null;

    return (
      <View className="bg-white rounded-2xl border border-[#E8E8E8] p-4 mb-4">
        {/* Driver Info Section */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(passenger)/trip/driver-profile",
              params: { driverId: driver.id },
            })
          }
        >
          <View className="flex-row items-center mb-4">
            <AppImage
              source={driver.image}
              width={scale(56)}
              height={verticalScale(56)}
              borderRadius={scale(28)}
            />

            <View className="flex-1 ml-3">
              <Text className="text-base font-poppinsBold text-[#333] mb-1">
                {driver.name}
              </Text>
              <View className="flex-row items-center mb-1">
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text className="ml-1 text-sm font-poppinsSemiBold text-[#333]">
                  {driver.rating}{" "}
                  <Text className="text-[#999] font-poppins">
                    ({driver.totalRides})
                  </Text>
                </Text>
              </View>
              <Text className="text-xs font-poppins text-[#666]">
                {t("passenger.tabs.home.arrivingIn")} {driver.arrivalTime}
              </Text>
            </View>

            <View className="items-center">
              <Text className="text-lg font-poppinsBold text-[#00BFA6] mb-2">
                {driver.pricePerSeat}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(passenger)/trip/driver-profile",
                    params: { driverId: driver.id },
                  })
                }
                className="p-2"
              >
                <Ionicons name="chevron-forward" size={24} color="#00BFA6" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Location Section */}
        <View className="mb-4">
          {/* Departure Location */}
          {driver.departureLocation && (
            <View className="flex-row items-start mb-3">
              <View className="pt-1">
                <Ionicons name="location" size={20} color="#00BFA6" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-xs font-poppins text-[#666] mb-1">
                  Departure
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    openLocationInGoogleMaps(
                      driver.departureLocation!.latitude,
                      driver.departureLocation!.longitude,
                      driver.departureLocation!.address,
                    )
                  }
                >
                  <Text className="text-sm font-poppinsSemiBold text-[#00BFA6] underline">
                    {driver.departureLocation.address}
                  </Text>
                  <Text className="text-xs font-poppins text-[#666]">
                    {driver.departureLocation.city}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Arrival Location */}
          {driver.arrivalLocation && (
            <View className="flex-row items-start">
              <View className="pt-1">
                <Ionicons name="location" size={20} color="#FF6B6B" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-xs font-poppins text-[#666] mb-1">
                  Arrival
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    openLocationInGoogleMaps(
                      driver.arrivalLocation!.latitude,
                      driver.arrivalLocation!.longitude,
                      driver.arrivalLocation!.address,
                    )
                  }
                >
                  <Text className="text-sm font-poppinsSemiBold text-[#FF6B6B] underline">
                    {driver.arrivalLocation.address}
                  </Text>
                  <Text className="text-xs font-poppins text-[#666]">
                    {driver.arrivalLocation.city}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Divider */}
        <View className="h-px bg-[#E8E8E8] mb-4" />

        {/* Price Details Section */}
        <View className="bg-[#F8F9FA] rounded-xl p-3 mb-4">
          <View className="flex-row justify-between mb-3">
            <View className="flex-1">
              <Text className="text-xs font-poppins text-[#666] mb-1">
                {t("driver.tabs.completedScreen.pricePerSeat")}
              </Text>
              <Text className="text-sm font-poppinsBold text-[#333]">
                {driver.pricePerSeat}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs font-poppins text-[#666] mb-1">
                {t("driver.tabs.myTrip.rideCard.seats")}
              </Text>
              <Text className="text-sm font-poppinsBold text-[#333]">
                {driver.totalSeats}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs font-poppins text-[#666] mb-1">
                {t("driver.rideDetail.fullCarPrice")}
              </Text>
              <Text className="text-sm font-poppinsBold text-[#333]">
                {driver.fullCarPrice}
              </Text>
            </View>
          </View>
          <View className="h-px bg-[#E8E8E8] mb-3" />
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-xs font-poppins text-[#666] mb-1">
                {t("passenger.tabs.trip.tripDate")}
              </Text>
              <Text className="text-sm font-poppinsBold text-[#333]">
                {driver.date}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs font-poppins text-[#666] mb-1">
                {t("passenger.tabs.trip.tripTime")}
              </Text>
              <Text className="text-sm font-poppinsBold text-[#333]">
                {driver.time}
              </Text>
            </View>
            {driver.ladiesOnly && (
              <View className="flex-1 items-center justify-center bg-white rounded-lg border border-[#FFB6C1]">
                <View className="flex-row items-center">
                  <Ionicons name="female" size={14} color="#FF69B4" />
                  <Text className="text-xs font-poppinsSemiBold text-[#FF69B4] ml-1">
                    {t(
                      "passenger.tabs.profileScreenText.ridePreferenceScreenText.ladiesOnlyPreference",
                    )}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Quantity Selector */}
        {!isAccepted && (
          <View className="bg-[#F8F9FA] rounded-xl p-3 mb-4">
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text className="text-xs font-poppins text-[#666] mb-1">
                  {t("driver.tabs.myTrip.numberOfSeat")}
                </Text>
                <Text className="text-xs font-poppins text-[#999]">
                  {driver.totalSeats - quantity}{" "}
                  {t("passenger.availableRides.seatsAvailable")}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-[#00BFA6] px-3 py-2 rounded-lg"
                onPress={() => {
                  setQuantities({
                    ...quantities,
                    [driver.id]: driver.totalSeats,
                  });
                }}
              >
                <Text className="text-xs font-poppinsBold text-white">
                  {t("passenger.availableRides.bookFullCar")}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                className="w-10 h-10 rounded-lg bg-[#E8E8E8] items-center justify-center"
                onPress={() => {
                  const newQty = Math.max(1, (quantities[driver.id] || 1) - 1);
                  setQuantities({ ...quantities, [driver.id]: newQty });
                }}
              >
                <Ionicons name="remove" size={20} color="#333" />
              </TouchableOpacity>
              <Text className="text-lg font-poppinsBold text-[#333] mx-4">
                {quantity}
              </Text>
              <TouchableOpacity
                className="w-10 h-10 rounded-lg bg-[#00BFA6] items-center justify-center"
                onPress={() => {
                  const newQty = Math.min(
                    driver.totalSeats,
                    (quantities[driver.id] || 1) + 1,
                  );
                  setQuantities({ ...quantities, [driver.id]: newQty });
                }}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Luggage Selector */}
        {!isAccepted && (
          <View className="bg-[#F8F9FA] rounded-xl p-3 mb-4">
            <Text className="text-xs font-poppins text-[#666] mb-2">
              {t("shared.tripDetailScreen.luggageSize")}
            </Text>
            <View className="flex-row justify-between gap-2">
              {["S", "M", "L"].map((size) => (
                <TouchableOpacity
                  key={size}
                  className={`flex-1 py-2.5 rounded-lg items-center justify-center border-2 ${
                    selectedLuggage === size
                      ? "bg-[#00BFA6] border-[#00BFA6]"
                      : "bg-white border-[#E8E8E8]"
                  }`}
                  onPress={() => {
                    setLuggage({
                      ...luggage,
                      [driver.id]: selectedLuggage === size ? null : size,
                    });
                  }}
                >
                  <Text
                    className={`font-poppinsBold text-sm ${
                      selectedLuggage === size ? "text-white" : "text-[#333]"
                    }`}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Gender Preference Selector */}
        {!isAccepted && !driver.ladiesOnly && (
          <View className="bg-[#F8F9FA] rounded-xl p-3 mb-4">
            <Text className="text-xs font-poppins text-[#666] mb-2">
              {t("shared.tripDetailScreen.genderPreference")}
            </Text>
            <View className="flex-row justify-between gap-2">
              <TouchableOpacity
                className={`flex-1 py-2.5 rounded-lg items-center justify-center border-2 flex-row ${
                  selectedGender === "male"
                    ? "bg-[#00BFA6] border-[#00BFA6]"
                    : "bg-white border-[#E8E8E8]"
                }`}
                onPress={() => {
                  setGenderPreference({
                    ...genderPreference,
                    [driver.id]: selectedGender === "male" ? null : "male",
                  });
                }}
              >
                <Ionicons
                  name="male"
                  size={16}
                  color={selectedGender === "male" ? "white" : "#333"}
                />
                <Text
                  className={`font-poppinsSemiBold text-xs ml-1 ${
                    selectedGender === "male" ? "text-white" : "text-[#333]"
                  }`}
                >
                  Male
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 py-2.5 rounded-lg items-center justify-center border-2 flex-row ${
                  selectedGender === "female"
                    ? "bg-[#00BFA6] border-[#00BFA6]"
                    : "bg-white border-[#E8E8E8]"
                }`}
                onPress={() => {
                  setGenderPreference({
                    ...genderPreference,
                    [driver.id]: selectedGender === "female" ? null : "female",
                  });
                }}
              >
                <Ionicons
                  name="female"
                  size={16}
                  color={selectedGender === "female" ? "white" : "#333"}
                />
                <Text
                  className={`font-poppinsSemiBold text-xs ml-1 ${
                    selectedGender === "female" ? "text-white" : "text-[#333]"
                  }`}
                >
                  Female
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 py-2.5 rounded-lg items-center justify-center border-2 ${
                  selectedGender === "no-preference"
                    ? "bg-[#00BFA6] border-[#00BFA6]"
                    : "bg-white border-[#E8E8E8]"
                }`}
                onPress={() => {
                  setGenderPreference({
                    ...genderPreference,
                    [driver.id]:
                      selectedGender === "no-preference"
                        ? null
                        : "no-preference",
                  });
                }}
              >
                <Text
                  className={`font-poppinsSemiBold text-xs ${
                    selectedGender === "no-preference"
                      ? "text-white"
                      : "text-[#333]"
                  }`}
                >
                  Any
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-3 rounded-xl gap-2 ${
              isAccepted ? "bg-[#6C757D]" : "bg-[#D3D3D3]"
            }`}
            onPress={() => {
              if (isAccepted) handleChat(driver.id, driver.name);
            }}
            disabled={!isAccepted}
          >
            <Ionicons name="chatbubble-outline" size={18} color="white" />
            <Text className="text-white font-poppinsSemiBold text-sm">
              {t("passenger.availableRides.chat")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-3 rounded-xl gap-2 ${
              isAccepted ? "bg-[#6C757D]" : "bg-[#D3D3D3]"
            }`}
            onPress={() => {
              if (isAccepted) handleCall(driver.id, driver.name);
            }}
            disabled={!isAccepted}
          >
            <Ionicons name="call-outline" size={18} color="white" />
            <Text className="text-white font-poppinsSemiBold text-sm">
              {t("passenger.availableRides.call")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 items-center justify-center py-3 rounded-xl ${
              isAccepted ? "bg-[#999]" : "bg-[#00BFA6]"
            }`}
            onPress={() => !isAccepted && handleBookNow(driver)}
            disabled={isAccepted}
            activeOpacity={0.7}
          >
            <Text className="text-white font-poppinsBold text-sm">
              {isAccepted
                ? t("passenger.availableRides.booked")
                : t("passenger.availableRides.bookNow")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderListEmpty = () => (
    <View className="flex-1 items-center justify-center py-10">
      <Ionicons name="car-outline" size={48} color="#999" />
      <Text className="text-base font-poppins text-[#666] mt-3 mb-6">
        {t("passenger.availableRides.noRidesAvailable")}
      </Text>
      <TouchableOpacity
        className="bg-[#00BFA6] px-6 py-3 rounded-xl"
        onPress={() =>
          router.push({
            pathname: "/(passenger)/(tabs)/trip",
          })
        }
      >
        <Text className="text-white font-poppinsBold text-sm">
          {t("passenger.availableRides.backToTripRequest")}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Publish a Ride Button */}
      <TouchableOpacity
        className="bg-[#00BFA6] mx-[6%] mt-4 mb-4 py-3 px-4 rounded-lg items-center justify-center"
        onPress={() => router.push("/(passenger)/(tabs)/home/trip-summary")}
      >
        <Text className="text-white font-poppinsBold text-base">
          {t("driver.tabs.homeScreenText.publishARide")}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={drivers}
        renderItem={renderDriverCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderListEmpty}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={drivers.length > 0}
      />
    </View>
  );
}
