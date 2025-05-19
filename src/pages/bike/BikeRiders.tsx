
import React from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface BikeRider {
  id: string;
  name: string;
  mobile: string;
  email: string;
  vehicleType: 'Bike';
  vehicleRegNumber: string;
  experience: string;
  status: 'approved' | 'pending' | 'rejected';
}

// Sample data
const bikeRiders: BikeRider[] = [
  {
    id: '1',
    name: 'Rohit Sharma',
    mobile: '+91 9876543210',
    email: 'rohit@example.com',
    vehicleType: 'Bike',
    vehicleRegNumber: 'MH-01-AB-5678',
    experience: '3 years',
    status: 'approved',
  },
  {
    id: '2',
    name: 'Vikas Patel',
    mobile: '+91 8765432109',
    email: 'vikas@example.com',
    vehicleType: 'Bike',
    vehicleRegNumber: 'DL-02-CD-8765',
    experience: '2 years',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Mahesh Kumar',
    mobile: '+91 7654321098',
    email: 'mahesh@example.com',
    vehicleType: 'Bike',
    vehicleRegNumber: 'KA-03-EF-4321',
    experience: '4 years',
    status: 'approved',
  },
  {
    id: '4',
    name: 'Nilesh Jain',
    mobile: '+91 6543210987',
    email: 'nilesh@example.com',
    vehicleType: 'Bike',
    vehicleRegNumber: 'TN-04-GH-7654',
    experience: '1 year',
    status: 'rejected',
  },
  {
    id: '5',
    name: 'Rakesh Singh',
    mobile: '+91 5432109876',
    email: 'rakesh@example.com',
    vehicleType: 'Bike',
    vehicleRegNumber: 'GJ-05-IJ-5432',
    experience: '5 years',
    status: 'approved',
  },
];

export const BikeRiders: React.FC = () => {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      cell: (rider: BikeRider) => <div className="font-medium">{rider.name}</div>,
      sortable: true,
    },
    {
      key: 'mobile',
      header: 'Mobile',
      cell: (rider: BikeRider) => rider.mobile,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      cell: (rider: BikeRider) => rider.email,
      sortable: true,
    },
    {
      key: 'vehicleRegNumber',
      header: 'Vehicle Reg. No.',
      cell: (rider: BikeRider) => rider.vehicleRegNumber,
      sortable: true,
    },
    {
      key: 'experience',
      header: 'Experience',
      cell: (rider: BikeRider) => rider.experience,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (rider: BikeRider) => <StatusBadge status={rider.status} />,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (rider: BikeRider) => (
        <Link to={`/bike-management/riders/${rider.id}`}>
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
      data={bikeRiders} 
      searchPlaceholder="Search bike riders..." 
      allowCSVExport={true}
      allowPDFExport={true}
    />
  );
};
