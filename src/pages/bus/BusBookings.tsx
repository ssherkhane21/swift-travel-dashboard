
import React from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface BusBooking {
  id: string;
  busRegNumber: string;
  customerName: string;
  phone: string;
  email: string;
  from: string;
  to: string;
  journeyDate: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

// Sample data
const busBookings: BusBooking[] = [
  {
    id: 'BK001',
    busRegNumber: 'KA-01-AB-1234',
    customerName: 'Raj Kumar',
    phone: '+91 9876543210',
    email: 'raj@example.com',
    from: 'Bangalore',
    to: 'Mysore',
    journeyDate: '2023-10-15',
    amount: 650,
    status: 'confirmed',
  },
  {
    id: 'BK002',
    busRegNumber: 'KA-02-CD-5678',
    customerName: 'Priya Sharma',
    phone: '+91 8765432109',
    email: 'priya@example.com',
    from: 'Mumbai',
    to: 'Pune',
    journeyDate: '2023-10-18',
    amount: 750,
    status: 'pending',
  },
  {
    id: 'BK003',
    busRegNumber: 'MH-01-EF-9012',
    customerName: 'Amit Singh',
    phone: '+91 7654321098',
    email: 'amit@example.com',
    from: 'Delhi',
    to: 'Jaipur',
    journeyDate: '2023-10-20',
    amount: 950,
    status: 'cancelled',
  },
  {
    id: 'BK004',
    busRegNumber: 'DL-01-GH-3456',
    customerName: 'Neha Gupta',
    phone: '+91 6543210987',
    email: 'neha@example.com',
    from: 'Chennai',
    to: 'Hyderabad',
    journeyDate: '2023-10-25',
    amount: 1050,
    status: 'confirmed',
  },
  {
    id: 'BK005',
    busRegNumber: 'TN-01-IJ-7890',
    customerName: 'Karthik R',
    phone: '+91 5432109876',
    email: 'karthik@example.com',
    from: 'Kolkata',
    to: 'Bhubaneswar',
    journeyDate: '2023-10-30',
    amount: 1200,
    status: 'completed',
  },
];

export const BusBookings: React.FC = () => {
  const columns = [
    {
      key: 'busRegNumber',
      header: 'Bus Reg. No.',
      cell: (booking: BusBooking) => booking.busRegNumber,
      sortable: true,
    },
    {
      key: 'customerName',
      header: 'Customer',
      cell: (booking: BusBooking) => (
        <div className="font-medium">{booking.customerName}</div>
      ),
      sortable: true,
    },
    {
      key: 'phone',
      header: 'Phone',
      cell: (booking: BusBooking) => booking.phone,
      sortable: true,
    },
    {
      key: 'from',
      header: 'From',
      cell: (booking: BusBooking) => booking.from,
      sortable: true,
    },
    {
      key: 'to',
      header: 'To',
      cell: (booking: BusBooking) => booking.to,
      sortable: true,
    },
    {
      key: 'journeyDate',
      header: 'Journey Date',
      cell: (booking: BusBooking) => booking.journeyDate,
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      cell: (booking: BusBooking) => (
        <div className="font-medium">₹{booking.amount}</div>
      ),
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (booking: BusBooking) => {
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
      cell: (booking: BusBooking) => (
        <Link to={`/bus-management/bookings/${booking.id}`}>
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
      data={busBookings} 
      searchPlaceholder="Search bus bookings..." 
      allowCSVExport={true}
      allowPDFExport={true}
    />
  );
};
