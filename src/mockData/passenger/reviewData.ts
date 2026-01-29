// Mock data for reviews
const reviewsData = [
  {
    id: "1",
    name: "Savannah Nguyen",
    rating: 5.0,
    totalRatings: 235,
    time: "2 hrs ago",
    comment:
      "Excellent service! The driver was very professional and arrived on time. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "2",
    name: "Robert Fox",
    rating: 4.5,
    totalRatings: 189,
    time: "5 hrs ago",
    comment:
      "Great experience overall. The vehicle was clean and comfortable. Driver was friendly and knew the best routes.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    name: "Emily Johnson",
    rating: 5.0,
    totalRatings: 312,
    time: "1 day ago",
    comment:
      "Amazing service! Very punctual and the ride was smooth. Will definitely use again for my future trips.",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: "4",
    name: "Michael Chen",
    rating: 4.0,
    totalRatings: 156,
    time: "2 days ago",
    comment:
      "Good service, though there was a slight delay in pickup. Driver was apologetic and made up for it with great conversation.",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: "5",
    name: "Sarah Williams",
    rating: 5.0,
    totalRatings: 428,
    time: "3 days ago",
    comment:
      "Outstanding! The driver went above and beyond to ensure my comfort. Very professional and courteous throughout the journey.",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: "6",
    name: "James Anderson",
    rating: 4.5,
    totalRatings: 267,
    time: "1 week ago",
    comment:
      "Reliable and affordable service. The booking process was easy and the driver was experienced. Would recommend to friends.",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];

export interface Vehicle {
  id: string;
  image: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
  },
];

export default reviewsData;
