// Types
export interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

export interface CarImage {
  id: string;
  url: string;
}

export interface SavedDriver {
  id: string;
  name: string;
  rating: number;
  totalRatings: number;
  profileImage?: string;
  location: string;
  language: string;
  bio?: string;
  pricePerKm: number; // Price in JOD (Jordanian Dinar)
  estimatedMins: number; // Estimated arrival time in minutes
  ridesShared: number;
  ridesCancelled: number;
  carImages: CarImage[];
  amenities: {
    ac: boolean;
    usbPorts: boolean;
    wifi: boolean;
  };
  reviews: Review[];
  totalTrips?: number;
  phoneNumber?: string;
  carModel?: string;
  carPlate?: string;
}

// Fake Data
export const savedDriversData: SavedDriver[] = [
  {
    id: "1",
    name: "Alex Jackob",
    rating: 5.0,
    totalRatings: 235,
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    location: "North city",
    language: "English",
    bio: "I like peaceful trips and always drive safely. Happy to help with luggage.",
    pricePerKm: 0.75,
    estimatedMins: 5,
    ridesShared: 310,
    ridesCancelled: 5,
    carImages: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400",
      },
    ],
    amenities: {
      ac: true,
      usbPorts: true,
      wifi: true,
    },
    reviews: [
      {
        id: "1",
        userName: "Savannah Nguyen",
        userImage: "https://randomuser.me/api/portraits/women/10.jpg",
        rating: 5.0,
        comment:
          "Excellent service! The driver was very professional and arrived on time. Highly recommend!",
        timeAgo: "2 hrs ago",
      },
      {
        id: "2",
        userName: "John Smith",
        userImage: "https://randomuser.me/api/portraits/men/15.jpg",
        rating: 5.0,
        comment: "Great ride! Very clean car and knows the city well.",
        timeAgo: "1 day ago",
      },
    ],
    totalTrips: 45,
    phoneNumber: "+962 79 123 4567",
    carModel: "Toyota Camry",
    carPlate: "ABC 1234",
  },
  {
    id: "2",
    name: "Helen Suja",
    rating: 4.5,
    totalRatings: 189,
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    location: "Downtown",
    language: "English, Arabic",
    bio: "Friendly driver with 5 years of experience. Safe and comfortable rides guaranteed.",
    pricePerKm: 0.65,
    estimatedMins: 8,
    ridesShared: 275,
    ridesCancelled: 8,
    carImages: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400",
      },
    ],
    amenities: {
      ac: true,
      usbPorts: true,
      wifi: false,
    },
    reviews: [
      {
        id: "1",
        userName: "Michael Brown",
        userImage: "https://randomuser.me/api/portraits/men/20.jpg",
        rating: 4.5,
        comment: "Good driver, very punctual and polite.",
        timeAgo: "3 hrs ago",
      },
    ],
    totalTrips: 38,
    phoneNumber: "+962 78 234 5678",
    carModel: "Honda Accord",
    carPlate: "XYZ 5678",
  },
  {
    id: "3",
    name: "Nick Jonas",
    rating: 4.8,
    totalRatings: 312,
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    location: "West district",
    language: "English",
    bio: "Professional driver offering comfortable rides with great conversation.",
    pricePerKm: 0.7,
    estimatedMins: 6,
    ridesShared: 428,
    ridesCancelled: 3,
    carImages: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400",
      },
    ],
    amenities: {
      ac: true,
      usbPorts: true,
      wifi: true,
    },
    reviews: [
      {
        id: "1",
        userName: "Emily Davis",
        userImage: "https://randomuser.me/api/portraits/women/25.jpg",
        rating: 5.0,
        comment: "Amazing experience! Very clean car and smooth ride.",
        timeAgo: "5 hrs ago",
      },
      {
        id: "2",
        userName: "David Wilson",
        userImage: "https://randomuser.me/api/portraits/men/30.jpg",
        rating: 4.5,
        comment: "Professional service, would definitely book again.",
        timeAgo: "1 day ago",
      },
    ],
    totalTrips: 52,
    phoneNumber: "+962 77 345 6789",
    carModel: "Hyundai Elantra",
    carPlate: "DEF 9012",
  },
  {
    id: "4",
    name: "Sarah Miller",
    rating: 4.9,
    totalRatings: 401,
    profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
    location: "East side",
    language: "English, French",
    bio: "Experienced driver focused on safety and customer satisfaction.",
    pricePerKm: 0.8,
    estimatedMins: 4,
    ridesShared: 520,
    ridesCancelled: 2,
    carImages: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
      },
    ],
    amenities: {
      ac: true,
      usbPorts: true,
      wifi: true,
    },
    reviews: [
      {
        id: "1",
        userName: "James Anderson",
        userImage: "https://randomuser.me/api/portraits/men/35.jpg",
        rating: 5.0,
        comment: "Outstanding service! Sarah is a fantastic driver.",
        timeAgo: "4 hrs ago",
      },
    ],
    totalTrips: 67,
    phoneNumber: "+962 79 456 7890",
    carModel: "Nissan Altima",
    carPlate: "GHI 3456",
  },
  {
    id: "5",
    name: "Michael Chen",
    rating: 4.7,
    totalRatings: 267,
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
    location: "Central area",
    language: "English, Chinese",
    bio: "Reliable and friendly driver with excellent local knowledge.",
    pricePerKm: 0.68,
    estimatedMins: 7,
    ridesShared: 345,
    ridesCancelled: 6,
    carImages: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
      },
    ],
    amenities: {
      ac: true,
      usbPorts: false,
      wifi: true,
    },
    reviews: [
      {
        id: "1",
        userName: "Lisa Martinez",
        userImage: "https://randomuser.me/api/portraits/women/40.jpg",
        rating: 4.5,
        comment: "Great driver, knows all the shortcuts!",
        timeAgo: "6 hrs ago",
      },
    ],
    totalTrips: 41,
    phoneNumber: "+962 78 567 8901",
    carModel: "Mazda 6",
    carPlate: "JKL 7890",
  },
  {
    id: "6",
    name: "Emma Wilson",
    rating: 5.0,
    totalRatings: 478,
    profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
    location: "North district",
    language: "English",
    bio: "Premium service driver dedicated to excellence and comfort.",
    pricePerKm: 0.85,
    estimatedMins: 3,
    ridesShared: 612,
    ridesCancelled: 1,
    carImages: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400",
      },
    ],
    amenities: {
      ac: true,
      usbPorts: true,
      wifi: true,
    },
    reviews: [
      {
        id: "1",
        userName: "Robert Taylor",
        userImage: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 5.0,
        comment: "Best driver I've ever had! Luxurious experience.",
        timeAgo: "2 hrs ago",
      },
      {
        id: "2",
        userName: "Jessica Lee",
        userImage: "https://randomuser.me/api/portraits/women/50.jpg",
        rating: 5.0,
        comment: "Emma is wonderful! Very professional and courteous.",
        timeAgo: "1 day ago",
      },
    ],
    totalTrips: 89,
    phoneNumber: "+962 77 678 9012",
    carModel: "Ford Fusion",
    carPlate: "MNO 2345",
  },
  {
    id: "7",
    name: "David Rodriguez",
    rating: 4.6,
    totalRatings: 156,
    profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
    location: "South area",
    language: "English, Spanish",
    bio: "Affordable and reliable rides for everyone. Your comfort is my priority.",
    pricePerKm: 0.6,
    estimatedMins: 10,
    ridesShared: 198,
    ridesCancelled: 12,
    carImages: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400",
      },
    ],
    amenities: {
      ac: false,
      usbPorts: true,
      wifi: false,
    },
    reviews: [
      {
        id: "1",
        userName: "Maria Garcia",
        userImage: "https://randomuser.me/api/portraits/women/55.jpg",
        rating: 4.5,
        comment: "Good value for money. Friendly driver.",
        timeAgo: "8 hrs ago",
      },
    ],
    totalTrips: 34,
    phoneNumber: "+962 79 789 0123",
    carModel: "Chevrolet Malibu",
    carPlate: "PQR 6789",
  },
  {
    id: "8",
    name: "Olivia Brown",
    rating: 4.8,
    totalRatings: 324,
    profileImage: "https://randomuser.me/api/portraits/women/8.jpg",
    location: "City center",
    language: "English, German",
    bio: "Smooth rides with a smile. Making your journey pleasant every time.",
    pricePerKm: 0.72,
    estimatedMins: 6,
    ridesShared: 389,
    ridesCancelled: 4,
    carImages: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=400",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400",
      },
    ],
    amenities: {
      ac: true,
      usbPorts: true,
      wifi: true,
    },
    reviews: [
      {
        id: "1",
        userName: "Daniel White",
        userImage: "https://randomuser.me/api/portraits/men/60.jpg",
        rating: 5.0,
        comment: "Olivia is fantastic! Very punctual and friendly.",
        timeAgo: "3 hrs ago",
      },
      {
        id: "2",
        userName: "Sophie Turner",
        userImage: "https://randomuser.me/api/portraits/women/65.jpg",
        rating: 4.5,
        comment: "Pleasant ride, would recommend!",
        timeAgo: "2 days ago",
      },
    ],
    totalTrips: 56,
    phoneNumber: "+962 78 890 1234",
    carModel: "Volkswagen Jetta",
    carPlate: "STU 0123",
  },
];

// Helper function to get a driver by ID
export const getDriverById = (id: string): SavedDriver | undefined => {
  return savedDriversData.find((driver) => driver.id === id);
};

// Helper function to get drivers by minimum rating
export const getDriversByRating = (minRating: number): SavedDriver[] => {
  return savedDriversData.filter((driver) => driver.rating >= minRating);
};

// Helper function to get top rated drivers
export const getTopRatedDrivers = (limit: number = 5): SavedDriver[] => {
  return savedDriversData.sort((a, b) => b.rating - a.rating).slice(0, limit);
};

// Helper function to format price in JOD
export const formatPrice = (price: number): string => {
  return `${price.toFixed(2)} JOD`;
};

// Helper function to format estimated time
export const formatEstimatedTime = (mins: number): string => {
  return `${mins} min${mins !== 1 ? "s" : ""}`;
};
