
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  totalBookings: number;
}

// Sample data
const customers: Customer[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    mobile: '+91 9876543210',
    email: 'rahul@example.com',
    totalBookings: 12,
  },
  {
    id: '2',
    name: 'Priya Patel',
    mobile: '+91 8765432109',
    email: 'priya@example.com',
    totalBookings: 8,
  },
  {
    id: '3',
    name: 'Amit Kumar',
    mobile: '+91 7654321098',
    email: 'amit@example.com',
    totalBookings: 15,
  },
  {
    id: '4',
    name: 'Neha Singh',
    mobile: '+91 6543210987',
    email: 'neha@example.com',
    totalBookings: 5,
  },
  {
    id: '5',
    name: 'Deepak Verma',
    mobile: '+91 5432109876',
    email: 'deepak@example.com',
    totalBookings: 20,
  },
];

const CustomerManagement: React.FC = () => {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      cell: (customer: Customer) => <div className="font-medium">{customer.name}</div>,
      sortable: true,
    },
    {
      key: 'mobile',
      header: 'Mobile',
      cell: (customer: Customer) => customer.mobile,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      cell: (customer: Customer) => customer.email,
      sortable: true,
    },
    {
      key: 'totalBookings',
      header: 'Total Bookings',
      cell: (customer: Customer) => (
        <Link to={`/customer-management/customers/${customer.id}/bookings`} className="text-primary hover:underline">
          {customer.totalBookings}
        </Link>
      ),
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (customer: Customer) => (
        <Link to={`/customer-management/customers/${customer.id}`}>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <Eye size={16} />
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Customer Management" 
        description="Manage customer profiles and their booking history" 
        icon={<Users size={24} />}
      />
      
      <DataTable 
        columns={columns} 
        data={customers} 
        searchPlaceholder="Search customers..." 
        allowCSVExport={true}
        allowPDFExport={true}
      />
    </div>
  );
};

export default CustomerManagement;
