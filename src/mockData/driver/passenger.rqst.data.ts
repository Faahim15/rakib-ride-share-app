export interface PassengerRequest {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  pickup: string;
  destination: string;
  seats: number;
  distance: number;
  hasMultiDayItineraryRequest?: boolean; // Add this field
}

const passengerData: PassengerRequest[] = [
  {
    id: "1",
    name: "Nikita",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5.0,
    pickup: "2118 Thornridge - 55 park Ave",
    destination: "55 park Ave - Amman",
    seats: 2,
    distance: 120,
    hasMultiDayItineraryRequest: true,
  },
  {
    id: "2",
    name: "Henry",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5.0,
    pickup: "2118 Thornridge - Petra",
    destination: "55 park Ave - Amman",
    seats: 2,
    distance: 120,
    hasMultiDayItineraryRequest: false,
  },
  {
    id: "3",
    name: "Riana",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5.0,
    pickup: "2118 Thornridge - 55 park Ave",
    destination: "55 park Ave - Amman",
    seats: 2,
    distance: 120,
    hasMultiDayItineraryRequest: true,
  },
];

export default passengerData;
