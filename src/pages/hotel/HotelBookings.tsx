
import React from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface HotelBooking {
  id: string;
  hotelId: string;
  hotelName: string;
  customerName: string;
  phone: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  guests: number;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

// Sample data
const hotelBookings: HotelBooking[] = [
  {
    id: 'HB001',
    hotelId: 'HTL001',
    hotelName: 'Luxe Grand Hotel',
    customerName: 'Amit Shah',
    phone: '+91 9876543210',
    email: 'amit@example.com',
    checkInDate: '2023-10-15',
    checkOutDate: '2023-10-18',
    roomType: 'Deluxe Room',
    guests: 2,
    amount: 15000,
    status: 'confirmed',
  },
  {
    id: 'HB002',
    hotelId: 'HTL002',
    hotelName: 'Sunrise Resort & Spa',
    customerName: 'Priya Verma',
    phone: '+91 8765432109',
    email: 'priya@example.com',
    checkInDate: '2023-10-20',
    checkOutDate: '2023-10-25',
    roomType: 'Luxury Suite',
    guests: 3,
    amount: 35000,
    status: 'pending',
  },
  {
    id: 'HB003',
    hotelId: 'HTL003',
    hotelName: 'City Stay Hotel',
    customerName: 'Rahul Kumar',
    phone: '+91 7654321098',
    email: 'rahul@example.com',
    checkInDate: '2023-11-01',
    checkOutDate: '2023-11-03',
    roomType: 'Standard Room',
    guests: 1,
    amount: 8500,
    status: 'cancelled',
  },
  {
    id: 'HB004',
    hotelId: 'HTL004',
    hotelName: 'Royal Palace Hotel',
    customerName: 'Neha Singh',
    phone: '+91 6543210987',
    email: 'neha@example.com',
    checkInDate: '2023-11-10',
    checkOutDate: '2023-11-15',
    roomType: 'Presidential Suite',
    guests: 2,
    amount: 75000,
    status: 'confirmed',
  },
  {
    id: 'HB005',
    hotelId: 'HTL005',
    hotelName: 'Green Valley Resort',
    customerName: 'Vikrant Khanna',
    phone: '+91 5432109876',
    email: 'vikrant@example.com',
    checkInDate: '2023-10-05',
    checkOutDate: '2023-10-10',
    roomType: 'Mountain View Room',
    guests: 4,
    amount: 45000,
    status: 'completed',
  },
];

export const HotelBookings: React.FC = () => {
  const columns = [
    {
      key: 'hotelId',
      header: 'Hotel ID',
      cell: (booking: HotelBooking) => booking.hotelId,
      sortable: true,
    },
    {
      key: 'hotelName',
      header: 'Hotel Name',
      cell: (booking: HotelBooking) => booking.hotelName,
      sortable: true,
    },
    {
      key: 'customerName',
      header: 'Customer',
      cell: (booking: HotelBooking) => (
        <div className="font-medium">{booking.customerName}</div>
      ),
      sortable: true,
    },
    {
      key: 'phone',
      header: 'Phone',
      cell: (booking: HotelBooking) => booking.phone,
      sortable: true,
    },
    {
      key: 'checkInDate',
      header: 'Check-in Date',
      cell: (booking: HotelBooking) => booking.checkInDate,
      sortable: true,
    },
    {
      key: 'checkOutDate',
      header: 'Check-out Date',
      cell: (booking: HotelBooking) => booking.checkOutDate,
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      cell: (booking: HotelBooking) => (
        <div className="font-medium">₹{booking.amount}</div>
      ),
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (booking: HotelBooking) => {
        const statusStyles: Record<string, string> = {
          confirmed: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          cancelled: 'bg-red-100 text-red-800',
          completed: 'bg-blue-100 text-blue-800',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[booking.status]}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (booking: HotelBooking) => (
        <Link to={`/hotel-management/bookings/${booking.id}`}>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <Eye size={16} />
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <DataTable 
      columns={columns} 
      data={hotelBookings} 
      searchPlaceholder="Search hotel bookings..." 
      allowCSVExport={true}
      allowPDFExport={true}
    />
  );
};
