
import React from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface TaxiDriver {
  id: string;
  name: string;
  mobile: string;
  email: string;
  vehicleType: 'Car';
  vehicleRegNumber: string;
  experience: string;
  status: 'approved' | 'pending' | 'rejected';
}

// Sample data
const taxiDrivers: TaxiDriver[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    mobile: '+91 9876543210',
    email: 'rajesh@example.com',
    vehicleType: 'Car',
    vehicleRegNumber: 'MH-01-AB-1234',
    experience: '5 years',
    status: 'approved',
  },
  {
    id: '2',
    name: 'Amit Singh',
    mobile: '+91 8765432109',
    email: 'amit@example.com',
    vehicleType: 'Car',
    vehicleRegNumber: 'DL-02-CD-5678',
    experience: '3 years',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Suresh Sharma',
    mobile: '+91 7654321098',
    email: 'suresh@example.com',
    vehicleType: 'Car',
    vehicleRegNumber: 'KA-03-EF-9012',
    experience: '7 years',
    status: 'approved',
  },
  {
    id: '4',
    name: 'Pradeep Patel',
    mobile: '+91 6543210987',
    email: 'pradeep@example.com',
    vehicleType: 'Car',
    vehicleRegNumber: 'TN-04-GH-3456',
    experience: '2 years',
    status: 'rejected',
  },
  {
    id: '5',
    name: 'Vijay Verma',
    mobile: '+91 5432109876',
    email: 'vijay@example.com',
    vehicleType: 'Car',
    vehicleRegNumber: 'GJ-05-IJ-7890',
    experience: '4 years',
    status: 'approved',
  },
];

export const TaxiDrivers: React.FC = () => {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      cell: (driver: TaxiDriver) => <div className="font-medium">{driver.name}</div>,
      sortable: true,
    },
    {
      key: 'mobile',
      header: 'Mobile',
      cell: (driver: TaxiDriver) => driver.mobile,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      cell: (driver: TaxiDriver) => driver.email,
      sortable: true,
    },
    {
      key: 'vehicleRegNumber',
      header: 'Vehicle Reg. No.',
      cell: (driver: TaxiDriver) => driver.vehicleRegNumber,
      sortable: true,
    },
    {
      key: 'experience',
      header: 'Experience',
      cell: (driver: TaxiDriver) => driver.experience,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (driver: TaxiDriver) => <StatusBadge status={driver.status} />,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (driver: TaxiDriver) => (
        <Link to={`/taxi-management/drivers/${driver.id}`}>
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
      data={taxiDrivers} 
      searchPlaceholder="Search taxi drivers..." 
      allowCSVExport={true}
      allowPDFExport={true}
    />
  );
};
