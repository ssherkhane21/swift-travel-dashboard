
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/common/PageHeader';
import { Bus, Plus } from 'lucide-react';
import { BusOperators } from './BusOperators';
import { BusBookings } from './BusBookings';

const BusManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Bus Management" 
        description="Manage bus operators and bookings" 
        actionLabel="Add Bus Operator"
        actionLink="/bus-management/add-operator"
        icon={<Bus size={24} />}
      />
      
      <Tabs defaultValue="operators" className="space-y-4">
        <TabsList>
          <TabsTrigger value="operators">Bus Operators</TabsTrigger>
          <TabsTrigger value="bookings">Bus Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="operators" className="space-y-4">
          <BusOperators />
        </TabsContent>
        
        <TabsContent value="bookings" className="space-y-4">
          <BusBookings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusManagement;
