
import React from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface TaxiBooking {
  id: string;
  customerName: string;
  driverName: string;
  from: string;
  to: string;
  rideDate: string;
  vehicleType: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

// Sample data
const taxiBookings: TaxiBooking[] = [
  {
    id: 'TX001',
    customerName: 'Arjun Sharma',
    driverName: 'Rajesh Kumar',
    from: 'Airport Terminal 2',
    to: 'Bandra',
    rideDate: '2023-10-15',
    vehicleType: 'Sedan',
    amount: 550,
    status: 'confirmed',
  },
  {
    id: 'TX002',
    customerName: 'Neha Gupta',
    driverName: 'Amit Singh',
    from: 'Andheri East',
    to: 'BKC',
    rideDate: '2023-10-16',
    vehicleType: 'SUV',
    amount: 750,
    status: 'completed',
  },
  {
    id: 'TX003',
    customerName: 'Rahul Mehta',
    driverName: 'Suresh Sharma',
    from: 'CST Station',
    to: 'Powai',
    rideDate: '2023-10-17',
    vehicleType: 'Hatchback',
    amount: 450,
    status: 'cancelled',
  },
  {
    id: 'TX004',
    customerName: 'Priya Patel',
    driverName: 'Vijay Verma',
    from: 'Lower Parel',
    to: 'Juhu Beach',
    rideDate: '2023-10-18',
    vehicleType: 'Sedan',
    amount: 650,
    status: 'pending',
  },
  {
    id: 'TX005',
    customerName: 'Karan Malhotra',
    driverName: 'Pradeep Patel',
    from: 'Dadar',
    to: 'Nariman Point',
    rideDate: '2023-10-19',
    vehicleType: 'Premium Sedan',
    amount: 950,
    status: 'confirmed',
  },
];

export const TaxiBookings: React.FC = () => {
  const columns = [
    {
      key: 'id',
      header: 'ID',
      cell: (booking: TaxiBooking) => booking.id,
      sortable: true,
    },
    {
      key: 'customerName',
      header: 'Customer',
      cell: (booking: TaxiBooking) => (
        <div className="font-medium">{booking.customerName}</div>
      ),
      sortable: true,
    },
    {
      key: 'driverName',
      header: 'Driver',
      cell: (booking: TaxiBooking) => booking.driverName,
      sortable: true,
    },
    {
      key: 'from',
      header: 'From',
      cell: (booking: TaxiBooking) => booking.from,
      sortable: true,
    },
    {
      key: 'to',
      header: 'To',
      cell: (booking: TaxiBooking) => booking.to,
      sortable: true,
    },
    {
      key: 'rideDate',
      header: 'Ride Date',
      cell: (booking: TaxiBooking) => booking.rideDate,
      sortable: true,
    },
    {
      key: 'vehicleType',
      header: 'Vehicle Type',
      cell: (booking: TaxiBooking) => booking.vehicleType,
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      cell: (booking: TaxiBooking) => (
        <div className="font-medium">₹{booking.amount}</div>
      ),
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (booking: TaxiBooking) => {
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
      cell: (booking: TaxiBooking) => (
        <Link to={`/taxi-management/bookings/${booking.id}`}>
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
      data={taxiBookings} 
      searchPlaceholder="Search taxi bookings..." 
      allowCSVExport={true}
      allowPDFExport={true}
    />
  );
};
