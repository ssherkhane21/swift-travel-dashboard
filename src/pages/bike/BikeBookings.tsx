
import React from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface BikeBooking {
  id: string;
  customerName: string;
  riderName: string;
  from: string;
  to: string;
  rideDate: string;
  vehicleType: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

// Sample data
const bikeBookings: BikeBooking[] = [
  {
    id: 'BK001',
    customerName: 'Ankit Gupta',
    riderName: 'Rohit Sharma',
    from: 'Andheri East',
    to: 'Bandra West',
    rideDate: '2023-10-15',
    vehicleType: 'Standard',
    amount: 150,
    status: 'confirmed',
  },
  {
    id: 'BK002',
    customerName: 'Nisha Verma',
    riderName: 'Vikas Patel',
    from: 'Powai',
    to: 'Kurla',
    rideDate: '2023-10-16',
    vehicleType: 'Premium',
    amount: 220,
    status: 'completed',
  },
  {
    id: 'BK003',
    customerName: 'Sanjay Kumar',
    riderName: 'Mahesh Kumar',
    from: 'Dadar',
    to: 'Worli',
    rideDate: '2023-10-17',
    vehicleType: 'Standard',
    amount: 180,
    status: 'cancelled',
  },
  {
    id: 'BK004',
    customerName: 'Preeti Singh',
    riderName: 'Rakesh Singh',
    from: 'CST',
    to: 'Churchgate',
    rideDate: '2023-10-18',
    vehicleType: 'Standard',
    amount: 120,
    status: 'pending',
  },
  {
    id: 'BK005',
    customerName: 'Deepak Shah',
    riderName: 'Nilesh Jain',
    from: 'Juhu',
    to: 'Santacruz',
    rideDate: '2023-10-19',
    vehicleType: 'Premium',
    amount: 200,
    status: 'confirmed',
  },
];

export const BikeBookings: React.FC = () => {
  const columns = [
    {
      key: 'id',
      header: 'ID',
      cell: (booking: BikeBooking) => booking.id,
      sortable: true,
    },
    {
      key: 'customerName',
      header: 'Customer',
      cell: (booking: BikeBooking) => (
        <div className="font-medium">{booking.customerName}</div>
      ),
      sortable: true,
    },
    {
      key: 'riderName',
      header: 'Rider',
      cell: (booking: BikeBooking) => booking.riderName,
      sortable: true,
    },
    {
      key: 'from',
      header: 'From',
      cell: (booking: BikeBooking) => booking.from,
      sortable: true,
    },
    {
      key: 'to',
      header: 'To',
      cell: (booking: BikeBooking) => booking.to,
      sortable: true,
    },
    {
      key: 'rideDate',
      header: 'Ride Date',
      cell: (booking: BikeBooking) => booking.rideDate,
      sortable: true,
    },
    {
      key: 'vehicleType',
      header: 'Vehicle Type',
      cell: (booking: BikeBooking) => booking.vehicleType,
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      cell: (booking: BikeBooking) => (
        <div className="font-medium">₹{booking.amount}</div>
      ),
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (booking: BikeBooking) => {
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
      cell: (booking: BikeBooking) => (
        <Link to={`/bike-management/bookings/${booking.id}`}>
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
      data={bikeBookings} 
      searchPlaceholder="Search bike bookings..." 
      allowCSVExport={true}
      allowPDFExport={true}
    />
  );
};
