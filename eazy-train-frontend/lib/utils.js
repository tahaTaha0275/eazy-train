// Train data structure
export const trainData = [
  {
    id: 1,
    station: "Riyadh Railway Station, SAR",
    runsOn: "Everyday",
    departureTime: "11:25 pm",
    arrivalTime: "11:25 pm",
    origin: "Riyadh, Saudi Arabia",
    destination: "Dammam, Saudi Arabia",
    duration: "4 hours",
    standardPrice: "120",
    businessPrice: "210",
  },
  {
    id: 2,
    station: "Riyadh Railway Station, SAR",
    runsOn: "Everyday",
    departureTime: "7:25 pm",
    arrivalTime: "2:25 pm",
    origin: "Riyadh, Saudi Arabia",
    destination: "Dammam, Saudi Arabia",
    duration: "4 hours",
    standardPrice: "105",
    businessPrice: "210",
  },
  {
    id: 3,
    station: "Riyadh Railway Station, SAR",
    runsOn: "Everyday",
    departureTime: "12:25 pm",
    arrivalTime: "5:25 am",
    origin: "Riyadh, Saudi Arabia",
    destination: "Dammam, Saudi Arabia",
    duration: "5 hours",
    standardPrice: "120",
    businessPrice: "210",
  },
]

// Additional train data that could be used for filtering or search
export const allTrains = [
  ...trainData,
  {
    id: 4,
    station: "Riyadh Railway Station, SAR",
    runsOn: "Weekdays",
    departureTime: "9:00 am",
    arrivalTime: "1:00 pm",
    origin: "Riyadh, Saudi Arabia",
    destination: "Dammam, Saudi Arabia",
    duration: "4 hours",
    standardPrice: "110",
    businessPrice: "200",
  },
  {
    id: 5,
    station: "Dammam Railway Station, SAR",
    runsOn: "Everyday",
    departureTime: "10:30 am",
    arrivalTime: "2:30 pm",
    origin: "Dammam, Saudi Arabia",
    destination: "Riyadh, Saudi Arabia",
    duration: "4 hours",
    standardPrice: "120",
    businessPrice: "210",
  },
  {
    id: 6,
    station: "Dammam Railway Station, SAR",
    runsOn: "Weekends",
    departureTime: "8:15 am",
    arrivalTime: "12:15 pm",
    origin: "Dammam, Saudi Arabia",
    destination: "Riyadh, Saudi Arabia",
    duration: "4 hours",
    standardPrice: "125",
    businessPrice: "220",
  },
]

// Cities data for search functionality
export const cities = [
  { id: 1, name: "Riyadh", country: "Saudi Arabia" },
  { id: 2, name: "Dammam", country: "Saudi Arabia" },
  { id: 3, name: "Jeddah", country: "Saudi Arabia" },
  { id: 4, name: "Mecca", country: "Saudi Arabia" },
  { id: 5, name: "Medina", country: "Saudi Arabia" },
]

// Schedule data
export const scheduleData = {
  weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  weekend: ["Saturday", "Sunday"],
}

// Train types and their features
export const trainTypes = {
  standard: {
    features: [
      "Standard seating",
      "Onboard refreshments available for purchase",
      "Free Wi-Fi",
      "Power outlets at seats",
    ],
    cancellationPolicy: "Refundable up to 24 hours before departure with 10% fee",
  },
  business: {
    features: [
      "Premium seating with extra legroom",
      "Complimentary meals and beverages",
      "Free Wi-Fi",
      "Power outlets at seats",
      "Priority boarding",
      "Access to business lounge at stations",
    ],
    cancellationPolicy: "Refundable up to 12 hours before departure with 5% fee",
  },
}

