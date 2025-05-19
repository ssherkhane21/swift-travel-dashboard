
import React from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface HotelManager {
  id: string;
  name: string;
  mobile: string;
  email: string;
  hotelName: string;
  location: string;
  status: 'approved' | 'pending' | 'submitted' | 'rejected' | 'blocked';
}

// Sample data
const hotelManagers: HotelManager[] = [
  {
    id: '1',
    name: 'Vikram Singh',
    mobile: '+91 9876543210',
    email: 'vikram@luxehotels.com',
    hotelName: 'Luxe Grand Hotel',
    location: 'Mumbai',
    status: 'approved',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    mobile: '+91 8765432109',
    email: 'priya@sunriseresort.com',
    hotelName: 'Sunrise Resort & Spa',
    location: 'Goa',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    mobile: '+91 7654321098',
    email: 'rajesh@citystay.com',
    hotelName: 'City Stay Hotel',
    location: 'Delhi',
    status: 'submitted',
  },
  {
    id: '4',
    name: 'Meena Desai',
    mobile: '+91 6543210987',
    email: 'meena@royalpalace.com',
    hotelName: 'Royal Palace Hotel',
    location: 'Jaipur',
    status: 'rejected',
  },
  {
    id: '5',
    name: 'Anand Patel',
    mobile: '+91 5432109876',
    email: 'anand@greenvalley.com',
    hotelName: 'Green Valley Resort',
    location: 'Shimla',
    status: 'approved',
  },
  {
    id: '6',
    name: 'Sunita Reddy',
    mobile: '+91 4321098765',
    email: 'sunita@beachview.com',
    hotelName: 'Beach View Resort',
    location: 'Chennai',
    status: 'blocked',
  },
];

export const HotelManagers: React.FC = () => {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      cell: (manager: HotelManager) => <div className="font-medium">{manager.name}</div>,
      sortable: true,
    },
    {
      key: 'mobile',
      header: 'Mobile',
      cell: (manager: HotelManager) => manager.mobile,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      cell: (manager: HotelManager) => manager.email,
      sortable: true,
    },
    {
      key: 'hotelName',
      header: 'Hotel Name',
      cell: (manager: HotelManager) => manager.hotelName,
      sortable: true,
    },
    {
      key: 'location',
      header: 'Location',
      cell: (manager: HotelManager) => manager.location,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (manager: HotelManager) => <StatusBadge status={manager.status} />,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (manager: HotelManager) => (
        <Link to={`/hotel-management/managers/${manager.id}`}>
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
      data={hotelManagers} 
      searchPlaceholder="Search hotel managers..." 
      allowCSVExport={true}
      allowPDFExport={true}
    />
  );
};
