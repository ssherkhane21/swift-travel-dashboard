
import React, { useState } from 'react';
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
          delta={{ value: 12.5, isPositive: true }}
        />
        
        <StatCard 
          title="Hotel Bookings" 
          value="5,280" 
          icon={<Hotel size={18} />} 
          delta={{ value: 8.2, isPositive: true }}
        />
        
        <StatCard 
          title="Bus Bookings" 
          value="3,790" 
          icon={<Bus size={18} />} 
          delta={{ value: 15.3, isPositive: true }}
        />
        
        <StatCard 
          title="Active Users" 
          value="28.4K" 
          icon={<Users size={18} />} 
          delta={{ value: 3.2, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingChart />
        <RevenueChart />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Add more dashboard components here */}
      </div>
    </div>
  );
};

export default Dashboard;
