
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/common/PageHeader';
import { Bike } from 'lucide-react';
import { BikeRiders } from './BikeRiders';
import { BikeBookings } from './BikeBookings';

const BikeManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Bike Management" 
        description="Manage bike riders and bookings" 
        actionLabel="Add Bike Rider"
        actionLink="/bike-management/add-rider"
        icon={<Bike size={24} />}
      />
      
      <Tabs defaultValue="riders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="riders">Bike Riders</TabsTrigger>
          <TabsTrigger value="bookings">Bike Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="riders" className="space-y-4">
          <BikeRiders />
        </TabsContent>
        
        <TabsContent value="bookings" className="space-y-4">
          <BikeBookings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BikeManagement;
