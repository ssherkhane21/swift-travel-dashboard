
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/common/PageHeader';
import { Hotel, Plus } from 'lucide-react';
import { HotelManagers } from './HotelManagers';
import { HotelBookings } from './HotelBookings';

const HotelManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Hotel Management" 
        description="Manage hotel managers and bookings" 
        actionLabel="Add Hotel Manager"
        actionLink="/hotel-management/add-manager"
        icon={<Hotel size={24} />}
      />
      
      <Tabs defaultValue="managers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="managers">Hotel Managers</TabsTrigger>
          <TabsTrigger value="bookings">Hotel Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="managers" className="space-y-4">
          <HotelManagers />
        </TabsContent>
        
        <TabsContent value="bookings" className="space-y-4">
          <HotelBookings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HotelManagement;
