
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/common/PageHeader';
import { Car, Plus } from 'lucide-react';
import { TaxiDrivers } from './TaxiDrivers';
import { TaxiBookings } from './TaxiBookings';

const TaxiManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Taxi Management" 
        description="Manage taxi drivers and bookings" 
        actionLabel="Add Taxi Driver"
        actionLink="/taxi-management/add-driver"
        icon={<Car size={24} />}
      />
      
      <Tabs defaultValue="drivers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="drivers">Taxi Drivers</TabsTrigger>
          <TabsTrigger value="bookings">Taxi Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="drivers" className="space-y-4">
          <TaxiDrivers />
        </TabsContent>
        
        <TabsContent value="bookings" className="space-y-4">
          <TaxiBookings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxiManagement;
