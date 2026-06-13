export type Amenity = 'WiFi' | 'AC' | 'Charging' | 'Restroom'

export interface BusTrip {
  id: string
  company: string
  iconColor: string
  initials: string
  depTime: string
  depCity: string
  arrTime: string
  arrCity: string
  duration: string
  stops: string
  amenities: Amenity[]
  seatsLeft: number
  price: number
  tag?: 'Fastest' | 'Best Value' | 'Almost Full'
}

export const cities = [
  'Kigali (Nyabugogo)',
  'Huye',
  'Musanze',
  'Rubavu (Gisenyi)',
  'Rusizi',
  'Nyagatare',
  'Muhanga',
  'Karongi',
]

export const busCompanies = [
  { name: 'Volcano Express', count: 3 },
  { name: 'Ritco Express', count: 2 },
  { name: 'Horizon Express', count: 1 },
  { name: 'Kigali Coach', count: 1 },
  { name: 'Stella Express', count: 1 },
]

export const busTrips: BusTrip[] = [
  {
    id: 'VE-0800',
    company: 'Volcano Express',
    iconColor: 'bg-ink-900',
    initials: 'VE',
    depTime: '08:00 AM',
    depCity: 'Kigali',
    arrTime: '11:30 AM',
    arrCity: 'Huye',
    duration: '3h 30m',
    stops: 'Direct · No stops',
    amenities: ['WiFi', 'AC', 'Charging'],
    seatsLeft: 12,
    price: 3500,
    tag: 'Fastest',
  },
  {
    id: 'RE-0900',
    company: 'Ritco Express',
    iconColor: 'bg-ink-700',
    initials: 'RE',
    depTime: '09:00 AM',
    depCity: 'Kigali',
    arrTime: '01:00 PM',
    arrCity: 'Huye',
    duration: '4h 00m',
    stops: '1 stop · Muhanga',
    amenities: ['WiFi', 'AC'],
    seatsLeft: 24,
    price: 2800,
    tag: 'Best Value',
  },
  {
    id: 'VE-1030',
    company: 'Volcano Express',
    iconColor: 'bg-ink-900',
    initials: 'VE',
    depTime: '10:30 AM',
    depCity: 'Kigali',
    arrTime: '02:00 PM',
    arrCity: 'Huye',
    duration: '3h 30m',
    stops: 'Direct · No stops',
    amenities: ['WiFi', 'AC', 'Charging'],
    seatsLeft: 7,
    price: 3500,
  },
  {
    id: 'HE-1200',
    company: 'Horizon Express',
    iconColor: 'bg-flame-600',
    initials: 'HE',
    depTime: '12:00 PM',
    depCity: 'Kigali',
    arrTime: '04:30 PM',
    arrCity: 'Huye',
    duration: '4h 30m',
    stops: '2 stops',
    amenities: ['WiFi', 'AC'],
    seatsLeft: 18,
    price: 3000,
  },
  {
    id: 'RE-1400',
    company: 'Ritco Express',
    iconColor: 'bg-ink-700',
    initials: 'RE',
    depTime: '02:00 PM',
    depCity: 'Kigali',
    arrTime: '06:00 PM',
    arrCity: 'Huye',
    duration: '4h 00m',
    stops: '1 stop · Muhanga',
    amenities: ['WiFi', 'AC', 'Charging'],
    seatsLeft: 31,
    price: 2800,
  },
  {
    id: 'SE-1600',
    company: 'Stella Express',
    iconColor: 'bg-ink-800',
    initials: 'SE',
    depTime: '04:00 PM',
    depCity: 'Kigali',
    arrTime: '07:45 PM',
    arrCity: 'Huye',
    duration: '3h 45m',
    stops: 'Direct · No stops',
    amenities: ['WiFi', 'AC'],
    seatsLeft: 3,
    price: 4200,
    tag: 'Almost Full',
  },
]

export interface Destination {
  city: string
  province: string
  blurb: string
  image: string
}

export const destinations: Destination[] = [
  {
    city: 'Musanze',
    province: 'Northern Province',
    blurb: 'Explore the home of mountain gorillas and stunning volcanic landscapes.',
    image:
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=70',
  },
  {
    city: 'Huye',
    province: 'Southern Province',
    blurb: 'Discover the cultural heartland and academic center of Rwanda.',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=70',
  },
  {
    city: 'Rubavu (Gisenyi)',
    province: 'Western Province',
    blurb: 'Relax by the shores of Lake Kivu and enjoy the resort town vibe.',
    image:
      'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=800&q=70',
  },
]

export interface Trip {
  id: string
  route: string
  date: string
  company: string
  seat: string
  status: 'Upcoming' | 'Completed' | 'Cancelled'
  price: number
}

export const trips: Trip[] = [
  {
    id: 'TR-8841',
    route: 'Kigali → Huye',
    date: 'Tue, 15 Jul 2025 · 08:00 AM',
    company: 'Volcano Express',
    seat: 'A2',
    status: 'Upcoming',
    price: 3500,
  },
  {
    id: 'TR-8720',
    route: 'Kigali → Musanze',
    date: 'Sat, 28 Jun 2025 · 10:30 AM',
    company: 'Ritco Express',
    seat: 'C4',
    status: 'Completed',
    price: 2800,
  },
  {
    id: 'TR-8612',
    route: 'Rubavu → Kigali',
    date: 'Mon, 09 Jun 2025 · 02:00 PM',
    company: 'Horizon Express',
    seat: 'B1',
    status: 'Completed',
    price: 4200,
  },
  {
    id: 'TR-8559',
    route: 'Kigali → Rusizi',
    date: 'Fri, 30 May 2025 · 07:00 AM',
    company: 'Stella Express',
    seat: 'D3',
    status: 'Cancelled',
    price: 5200,
  },
]

export interface Parcel {
  id: string
  trackingCode: string
  from: string
  to: string
  status: 'In Transit' | 'Delivered' | 'Pending Pickup'
  date: string
  weight: string
  fee: number
}

export const parcels: Parcel[] = [
  {
    id: 'PCL-3391',
    trackingCode: 'TR-9K2L-88X',
    from: 'Kigali',
    to: 'Huye',
    status: 'In Transit',
    date: '28 May 2025',
    weight: '5 kg',
    fee: 2500,
  },
  {
    id: 'PCL-3360',
    trackingCode: 'TR-7P1A-42M',
    from: 'Kigali',
    to: 'Rubavu',
    status: 'Delivered',
    date: '21 May 2025',
    weight: '2 kg',
    fee: 1800,
  },
  {
    id: 'PCL-3322',
    trackingCode: 'TR-5T9C-19B',
    from: 'Musanze',
    to: 'Kigali',
    status: 'Pending Pickup',
    date: '18 May 2025',
    weight: '8 kg',
    fee: 3200,
  },
]

export interface NotificationItem {
  id: string
  title: string
  body: string
  time: string
  type: 'trip' | 'parcel' | 'payment' | 'promo'
  unread: boolean
}

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Your trip is confirmed',
    body: 'Booking TR-8841 · Kigali → Huye on 15 Jul at 08:00 AM. Seat A2.',
    time: '2 min ago',
    type: 'trip',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Parcel out for delivery',
    body: 'Parcel TR-9K2L-88X is now in transit to Huye Main Station.',
    time: '1 hour ago',
    type: 'parcel',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Payment received',
    body: 'We received RWF 7,100 for booking TR-8841 via MTN Mobile Money.',
    time: '1 hour ago',
    type: 'payment',
    unread: false,
  },
  {
    id: 'n4',
    title: '20% off your next trip',
    body: 'Use code TAPA20 before 30 Jul to save on any inter-city route.',
    time: 'Yesterday',
    type: 'promo',
    unread: false,
  },
]

export interface PaymentMethod {
  id: string
  kind: 'momo' | 'card'
  label: string
  detail: string
  primary: boolean
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'pm1',
    kind: 'momo',
    label: 'MTN Mobile Money',
    detail: '+250 788 •••• 456',
    primary: true,
  },
  {
    id: 'pm2',
    kind: 'card',
    label: 'Visa ending 4242',
    detail: 'Expires 08/27',
    primary: false,
  },
]

export const parcelTimeline = [
  { label: 'Parcel registered', place: 'Kigali — Nyabugogo Terminal', time: '28 May, 09:12 AM', done: true },
  { label: 'Picked up by carrier', place: 'Volcano Express', time: '28 May, 10:40 AM', done: true },
  { label: 'In transit', place: 'En route to Huye', time: '28 May, 11:05 AM', done: true },
  { label: 'Arrived at destination', place: 'Huye — Main Station', time: 'Est. 28 May, 03:30 PM', done: false },
  { label: 'Delivered', place: 'Awaiting receiver', time: 'Pending', done: false },
]
