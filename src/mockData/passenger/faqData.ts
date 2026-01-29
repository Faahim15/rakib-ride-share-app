interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    question: "How do I book a ride on Alygo?",
    answer:
      "Booking a ride is simple. Open the app and enter your pickup location and destination. Select your preferred ride type from the available options, review the estimated fare and arrival time, then tap 'Confirm' to request your ride. You'll be matched with a nearby driver and can track their arrival in real-time.",
  },
  {
    id: "2",
    question: "Can I choose a specific driver?",
    answer:
      "Currently, drivers are automatically assigned based on proximity and availability to ensure the fastest pickup time. However, you can view driver ratings and vehicle details before confirming your ride. If you've had a great experience with a driver, you can add them to your favorites for future trips.",
  },
  {
    id: "3",
    question: "What payment methods are accepted?",
    answer:
      "We accept multiple payment methods for your convenience: credit and debit cards (Visa, Mastercard, American Express), digital wallets (Apple Pay, Google Pay), and in-app wallet balance. You can add or manage payment methods in the 'Payment' section of your profile settings. All transactions are secured with bank-level encryption.",
  },
  {
    id: "4",
    question: "Is there an emergency option during rides?",
    answer:
      "Yes, your safety is our top priority. During any ride, you can access the emergency button in the app to immediately contact emergency services. The app will automatically share your real-time location and ride details. You can also share your trip status with trusted contacts who can monitor your journey in real-time.",
  },
  {
    id: "5",
    question: "How do I view my past trips and receipts?",
    answer:
      "Access your ride history by tapping the menu icon and selecting 'Trip History'. Here you'll find all your past rides with detailed information including date, time, route, fare breakdown, and driver details. You can download or email receipts directly from the app for expense reporting or record-keeping purposes.",
  },
  {
    id: "6",
    question: "How do I cancel a ride?",
    answer:
      "You can cancel a ride at any time before the driver arrives by tapping the 'Cancel Ride' button on the ride tracking screen. Please note that cancellation fees may apply if you cancel after a driver has been assigned and is en route to your pickup location. The fee structure is clearly displayed before you confirm cancellation.",
  },
  {
    id: "7",
    question: "What should I do if I left something in the vehicle?",
    answer:
      "If you've left an item in your ride, go to 'Trip History', select the relevant trip, and tap 'I lost an item'. You'll be able to contact your driver directly through the app. Please provide detailed information about the lost item. Our support team is also available to assist you in recovering your belongings.",
  },
  {
    id: "8",
    question: "How are fares calculated?",
    answer:
      "Fares are calculated based on several factors: base fare, distance traveled, time duration, and current demand in your area. You'll always see an estimated fare before confirming your ride. During high-demand periods, surge pricing may apply, and you'll be notified before booking. Tolls and additional stops may incur extra charges.",
  },
];

export default faqs;
