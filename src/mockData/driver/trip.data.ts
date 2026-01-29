// @/src/mockData/driver/trip.data.ts
export interface Ride {
  id: string;
  pickupAddress: string;
  dropoffAddress: string;
  scheduledTime: string;
  scheduledDate: string;
  distance: string;
  seats: number;
  price?: string | number; // Add this line
  status: "upcoming" | "ongoing" | "request" | "completed" | "cancelled";
  driverName: string;
  driverProfilePicture: string;
}

// Example usage with Jordanian Dinar price
const mockRides: Ride[] = [
  {
    id: "UP001",
    pickupAddress: "Airport Terminal 1",
    dropoffAddress: "Hotel Downtown",
    scheduledTime: "08:30 AM",
    scheduledDate: "28/10/2024",
    distance: "6.7 miles",
    seats: 2,
    price: "8.50", // Jordanian Dinar
    status: "upcoming",
    driverName: "John Mitchell",
    driverProfilePicture: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "UP002",
    pickupAddress: "Central Station",
    dropoffAddress: "Shopping Mall",
    scheduledTime: "02:15 PM",
    scheduledDate: "29/10/2024",
    distance: "4.3 miles",
    seats: 1,
    price: "5.75",
    status: "upcoming",
    driverName: "Sarah Johnson",
    driverProfilePicture: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: "UP003",
    pickupAddress: "City Hospital",
    dropoffAddress: "Residential Area",
    scheduledTime: "05:45 PM",
    scheduledDate: "30/10/2024",
    distance: "8.2 miles",
    seats: 3,
    price: "11.25",
    status: "upcoming",
    driverName: "Ahmed Hassan",
    driverProfilePicture: "https://i.pravatar.cc/150?img=3",
  },
];
export default mockRides;
