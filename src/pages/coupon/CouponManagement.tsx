
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Tag, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Coupon {
  id: string;
  name: string;
  code: string;
  serviceType: string;
  discountType: string;
  discountValue: number;
  startDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'upcoming';
}

// Sample data
const coupons: Coupon[] = [
  {
    id: '1',
    name: 'Welcome Discount',
    code: 'WELCOME20',
    serviceType: 'All Services',
    discountType: 'Percentage',
    discountValue: 20,
    startDate: '2023-10-01',
    expiryDate: '2023-12-31',
    status: 'active',
  },
  {
    id: '2',
    name: 'Hotel Special',
    code: 'HOTEL100',
    serviceType: 'Hotel Booking',
    discountType: 'Fixed',
    discountValue: 100,
    startDate: '2023-10-15',
    expiryDate: '2023-11-15',
    status: 'active',
  },
  {
    id: '3',
    name: 'Weekend Rides',
    code: 'WEEKEND15',
    serviceType: 'Taxi Booking',
    discountType: 'Percentage',
    discountValue: 15,
    startDate: '2023-11-01',
    expiryDate: '2023-11-30',
    status: 'upcoming',
  },
  {
    id: '4',
    name: 'Summer Discount',
    code: 'SUMMER25',
    serviceType: 'All Services',
    discountType: 'Percentage',
    discountValue: 25,
    startDate: '2023-04-01',
    expiryDate: '2023-06-30',
    status: 'expired',
  },
];

const CouponManagement: React.FC = () => {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      cell: (coupon: Coupon) => <div className="font-medium">{coupon.name}</div>,
      sortable: true,
    },
    {
      key: 'code',
      header: 'Code',
      cell: (coupon: Coupon) => (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100">
          {coupon.code}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'serviceType',
      header: 'Service Type',
      cell: (coupon: Coupon) => coupon.serviceType,
      sortable: true,
    },
    {
      key: 'discountValue',
      header: 'Discount',
      cell: (coupon: Coupon) => (
        coupon.discountType === 'Percentage' 
          ? `${coupon.discountValue}%` 
          : `₹${coupon.discountValue}`
      ),
      sortable: true,
    },
    {
      key: 'duration',
      header: 'Duration',
      cell: (coupon: Coupon) => `${coupon.startDate} to ${coupon.expiryDate}`,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (coupon: Coupon) => {
        const statusClasses = {
          active: 'bg-green-100 text-green-800',
          expired: 'bg-red-100 text-red-800',
          upcoming: 'bg-blue-100 text-blue-800',
        };
        return (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[coupon.status]}`}>
            {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (coupon: Coupon) => (
        <Link to={`/coupons/${coupon.id}`}>
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
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Coupon Management" 
          description="Create and manage discount coupons" 
          icon={<Tag size={24} />}
        />
        <Link to="/coupons/add">
          <Button className="flex items-center gap-1">
            <Plus size={16} />
            Add Coupon
          </Button>
        </Link>
      </div>
      
      <DataTable 
        columns={columns} 
        data={coupons} 
        searchPlaceholder="Search coupons..." 
        allowCSVExport={true}
        allowPDFExport={true}
      />
    </div>
  );
};

export default CouponManagement;
