
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { BookingChart } from '@/components/dashboard/BookingChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { Home, Hotel, Bus, Car, Bike, Users, CreditCard } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        description="Welcome to SwiftTravel Admin Dashboard" 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Bookings" 
          value="12,456" 
          icon={<CreditCard size={18} />} 
          trend="up"
          trendValue="12.5%"
          description="vs. last month"
        />
        
        <StatCard 
          title="Hotel Bookings" 
          value="5,280" 
          icon={<Hotel size={18} />} 
          trend="up"
          trendValue="8.2%"
          description="vs. last month"
        />
        
        <StatCard 
          title="Bus Bookings" 
          value="3,790" 
          icon={<Bus size={18} />} 
          trend="up"
          trendValue="15.3%"
          description="vs. last month"
        />
        
        <StatCard 
          title="Active Users" 
          value="28.4K" 
          icon={<Users size={18} />} 
          trend="up"
          trendValue="3.2%"
          description="vs. last month"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingChart />
        <RevenueChart />
      </div>
    </div>
  );
};

export default Dashboard;
