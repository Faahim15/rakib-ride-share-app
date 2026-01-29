export interface RideSharedItem {
  id: string;
  driverName: string;
  passengerName: string;
  date: string;
  pickupLocation: string;
  dropoffLocation: string;
  fare: number;
  rating?: number;
  review?: string;
}

export interface RideCancelledItem {
  id: string;
  driverName?: string;
  passengerName?: string;
  date: string;
  pickupLocation: string;
  dropoffLocation: string;
  reason: string;
  comment?: string;
}
