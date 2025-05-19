
import React from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface BusOperator {
  id: string;
  name: string;
  mobile: string;
  email: string;
  status: 'approved' | 'pending' | 'submitted' | 'rejected' | 'blocked';
  busCount: number;
}

// Sample data
const busOperators: BusOperator[] = [
  {
    id: '1',
    name: 'Global Tours',
    mobile: '+91 9876543210',
    email: 'info@globaltours.com',
    status: 'approved',
    busCount: 12,
  },
  {
    id: '2',
    name: 'City Express',
    mobile: '+91 8765432109',
    email: 'booking@cityexpress.com',
    status: 'pending',
    busCount: 8,
  },
  {
    id: '3',
    name: 'Royal Travels',
    mobile: '+91 7654321098',
    email: 'contact@royaltravels.com',
    status: 'submitted',
    busCount: 15,
  },
  {
    id: '4',
    name: 'Highway Express',
    mobile: '+91 6543210987',
    email: 'info@highwayexpress.com',
    status: 'rejected',
    busCount: 0,
  },
  {
    id: '5',
    name: 'Mountain Movers',
    mobile: '+91 5432109876',
    email: 'bookings@mountainmovers.com',
    status: 'approved',
    busCount: 7,
  },
  {
    id: '6',
    name: 'Deluxe Travels',
    mobile: '+91 9876543211',
    email: 'deluxe@travels.com',
    status: 'blocked',
    busCount: 5,
  },
];

export const BusOperators: React.FC = () => {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      cell: (operator: BusOperator) => <div className="font-medium">{operator.name}</div>,
      sortable: true,
    },
    {
      key: 'mobile',
      header: 'Mobile',
      cell: (operator: BusOperator) => operator.mobile,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      cell: (operator: BusOperator) => operator.email,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (operator: BusOperator) => <StatusBadge status={operator.status} />,
      sortable: true,
    },
    {
      key: 'busCount',
      header: 'Buses',
      cell: (operator: BusOperator) => (
        <Link to={`/bus-management/buses/${operator.id}`} className="text-primary hover:underline">
          {operator.busCount}
        </Link>
      ),
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (operator: BusOperator) => (
        <Link to={`/bus-management/operators/${operator.id}`}>
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
      data={busOperators} 
      searchPlaceholder="Search bus operators..." 
      allowCSVExport={true}
      allowPDFExport={true}
    />
  );
};
