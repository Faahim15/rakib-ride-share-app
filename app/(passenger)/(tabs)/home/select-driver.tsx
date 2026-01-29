import AppImage from "@/src/components/image/AppImage";
import { useLanguage } from "@/src/localization/LangaugeContext";
import { scale, verticalScale } from "@/src/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const { width, height } = Dimensions.get("window");

interface Driver {
  id: string;
  name: string;
  rating: number;
  totalRides: number;
  arrivalTime: string;
  image: string;
  latitude: number;
  longitude: number;
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

export default function SelectDriverScreen() {
  const params = useLocalSearchParams();
  const { t } = useLanguage();
  const pickupLat = Number.parseFloat(params.pickupLat as string) || 37.78825;
  const pickupLng = Number.parseFloat(params.pickupLng as string) || -122.4324;
  const pickupLocation = params.pickupLocation as string;
  const dropoffLocation = params.dropoffLocation as string;

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [acceptedDriverIds, setAcceptedDriverIds] = useState<Set<string>>(
    new Set(),
  );
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [luggage, setLuggage] = useState<{ [key: string]: string | null }>({});
  const [genderPreference, setGenderPreference] = useState<{
    [key: string]: "male" | "female" | "no-preference" | null;
  }>({});

  useEffect(() => {
    fetchNearbyDrivers();
  }, []);

  const fetchNearbyDrivers = () => {
    const mockDrivers: Driver[] = [
      {
        id: "1",
        name: "Alex Jackob",
        rating: 4.8,
        totalRides: 500,
        arrivalTime: "5 mins",
        image: "https://i.pravatar.cc/150?img=12",
        latitude: pickupLat + 0.002,
        longitude: pickupLng + 0.002,
        pricePerSeat: "5.50 JOD",
        totalSeats: 4,
        fullCarPrice: "22 JOD",
        date: "31 Dec, 2025",
        time: "2:30 PM",
        ladiesOnly: false,
        isAccepted: false,
        departureLocation: {
          address: "Rainbow Street",
          city: "Amman",
          latitude: pickupLat,
          longitude: pickupLng,
        },
        arrivalLocation: {
          address: "Wakalat Street",
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
        latitude: pickupLat - 0.003,
        longitude: pickupLng + 0.001,
        pricePerSeat: "4.75 JOD",
        totalSeats: 3,
        fullCarPrice: "15 JOD",
        date: "31 Dec, 2025",
        time: "2:45 PM",
        ladiesOnly: true,
        isAccepted: false,
        departureLocation: {
          address: "Jabal Amman",
          city: "Amman",
          latitude: pickupLat,
          longitude: pickupLng,
        },
        arrivalLocation: {
          address: "Mansour Street",
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
        latitude: pickupLat + 0.004,
        longitude: pickupLng - 0.002,
        pricePerSeat: "6.25 JOD",
        totalSeats: 5,
        fullCarPrice: "30 JOD",
        date: "31 Dec, 2025",
        time: "3:00 PM",
        ladiesOnly: false,
        isAccepted: false,
        departureLocation: {
          address: "University Street",
          city: "Amman",
          latitude: pickupLat,
          longitude: pickupLng,
        },
        arrivalLocation: {
          address: "King Talal Street",
          city: "Aqaba",
          latitude: 29.5327,
          longitude: 35.0034,
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
      t("passenger.tabs.home.chat"),
      `${t("passenger.tabs.home.chat")} ${driverName}`,
    );
  };

  const handleCall = (driverId: string, driverName: string) => {
    Alert.alert(
      t("passenger.tabs.trip.selectDriver.premiumFeature"),
      t("passenger.tabs.trip.selectDriver.callFeatureMessage"),
      [
        { text: t("passenger.tabs.trip.cancelRide"), style: "cancel" },
        {
          text: t("passenger.tabs.trip.selectDriver.upgradeNow"),
          onPress: () => {
            router.push("/(driver)/settings/change-membership");
          },
        },
      ],
    );
  };

  const handleBookNow = (driver: Driver) => {
    const quantity = quantities[driver.id] || 1;
    const totalPrice = parseFloat(driver.pricePerSeat) * quantity;
    const selectedLuggage = luggage[driver.id];

    const luggageText = selectedLuggage
      ? ` with ${selectedLuggage} luggage`
      : " with no luggage";

    Alert.alert(
      t("passenger.tabs.trip.selectDriver.confirmRide"),
      `${t("passenger.tabs.trip.selectDriver.bookSeats")} ${quantity} ${quantity === 1 ? t("passenger.tabs.trip.selectDriver.seat") : t("passenger.tabs.trip.selectDriver.seats")} ${t("passenger.tabs.trip.selectDriver.with")} ${driver.name}?${luggageText}\n${t("passenger.tabs.trip.selectDriver.total")}: ${totalPrice.toFixed(2)} JOD`,
      [
        { text: t("passenger.tabs.trip.cancelRide"), style: "cancel" },
        {
          text: t("tabs.map.bookNow"),
          onPress: () => {
            setAcceptedDriverIds(new Set([...acceptedDriverIds, driver.id]));
            Alert.alert(
              t("passenger.tabs.trip.selectDriver.success"),
              `${t("passenger.tabs.trip.selectDriver.bookedSuccess")} ${quantity} ${quantity === 1 ? t("passenger.tabs.trip.selectDriver.seat") : t("passenger.tabs.trip.selectDriver.seats")} ${t("passenger.tabs.trip.selectDriver.with")} ${driver.name}!`,
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
      <View className="bg-white rounded-2xl border border-[#E8E8E8] p-[4%] mb-[4%]">
        {/* Driver Info Section */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(passenger)/trip/driver-profile",
              params: { driverId: driver.id },
            })
          }
        >
          <View className="flex-row items-center mb-[4%]">
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
              {t("passenger.tabs.home.chat")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-3 rounded-xl gap-2 ${
              isAccepted ? "bg-[#6C757D]" : "bg-[#D3D3D3] "
            }`}
            onPress={() => {
              if (isAccepted) handleCall(driver.id, driver.name);
            }}
            disabled={!isAccepted}
          >
            <Ionicons name="call-outline" size={18} color="white" />
            <Text className="text-white font-poppinsSemiBold text-sm">
              {t("passenger.tabs.home.call")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 items-center justify-center py-3 rounded-xl ${
              isAccepted ? "bg-[#999]" : "bg-[#00BFA6]"
            }`}
            onPress={() => !isAccepted && handleBookNow(driver)}
            disabled={isAccepted}
          >
            <Text className="text-white font-poppinsBold text-sm">
              {isAccepted
                ? t("passenger.tabs.trip.selectDriver.bookedSuccess")
                : t("tabs.map.bookNow")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderListHeader = () => (
    <Text className="text-lg font-poppinsBold text-[#333] px-5 mb-5">
      {t("passenger.tabs.home.driverRequestList")}
    </Text>
  );

  const renderListEmpty = () => (
    <View className="flex-1 items-center justify-center py-10">
      <Ionicons name="car-outline" size={48} color="#999" />
      <Text className="text-base font-poppins text-[#666] mt-3 mb-6">
        {t("passenger.tabs.home.noDriverAvailable")}
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
          {t("driver.tabs.homeScreenText.publishARide")}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-[#F5F5F5]">
      {/* Header with Map */}
      <View style={{ height: height * 0.3 }} className="relative">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: pickupLat,
            longitude: pickupLng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation
        >
          {/* Pickup Location Marker */}
          <Marker
            coordinate={{ latitude: pickupLat, longitude: pickupLng }}
            title={t("passenger.tabs.trip.pickUp")}
            pinColor="#00BFA6"
          />

          {/* Driver Markers */}
          {drivers.map((driver) => (
            <Marker
              key={driver.id}
              coordinate={{
                latitude: driver.latitude,
                longitude: driver.longitude,
              }}
              title={driver.name}
            >
              <View className="w-10 h-10 rounded-full bg-[#00BFA6] border-4 border-white justify-center items-center">
                <Ionicons name="car" size={24} color="white" />
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Location Info Overlay */}
        <View className="absolute bottom-[10%] left-5 right-5">
          <View className="flex-row items-center bg-white px-3 py-2 rounded-full shadow-sm elevation-3 w-[70%]">
            <Ionicons name="location" size={16} color="#00BFA6" />
            <Text
              className="ml-1.5 text-sm font-poppinsSemiBold text-[#333]"
              numberOfLines={1}
            >
              {pickupLocation || "1369 Height St"}
            </Text>
          </View>
        </View>
      </View>

      {/* Driver List with FlatList */}
      <View className="flex-1 bg-white rounded-t-3xl pt-5 shadow-lg elevation-5">
        <FlatList
          data={drivers}
          renderItem={renderDriverCard}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderListEmpty}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 20,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={drivers.length > 0}
        />
      </View>
    </View>
  );
}
