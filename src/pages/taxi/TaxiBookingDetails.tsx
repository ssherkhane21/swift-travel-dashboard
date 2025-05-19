
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Car, User, Phone, Mail, MapPin, Calendar, CreditCard, Clock } from 'lucide-react';

interface TaxiBookingDetail {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  driverName: string;
  driverPhone: string;
  from: string;
  fromAddress: string;
  to: string;
  toAddress: string;
  rideDate: string;
  bookingTime: string;
  pickupTime: string;
  dropTime?: string;
  vehicleType: string;
  vehicleRegNumber: string;
  distance: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'in-progress';
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  bookingDate: string;
}

const TaxiBookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real application, this would be fetched from an API
  const booking: TaxiBookingDetail = {
    id: id || "TX001",
    customerName: "Arjun Sharma",
    customerPhone: "+91 9876543210",
    customerEmail: "arjun@example.com",
    driverName: "Rajesh Kumar",
    driverPhone: "+91 9876543210",
    from: "Airport Terminal 2",
    fromAddress: "Chhatrapati Shivaji International Airport, Mumbai",
    to: "Bandra",
    toAddress: "Linking Road, Bandra West, Mumbai",
    rideDate: "2023-10-15",
    bookingTime: "10:30 AM",
    pickupTime: "12:45 PM",
    dropTime: "01:30 PM",
    vehicleType: "Sedan",
    vehicleRegNumber: "MH-01-AB-1234",
    distance: "22 km",
    amount: 550,
    status: "completed",
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    bookingDate: "2023-10-14"
  };

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/taxi-management">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <PageHeader 
          title="Taxi Booking Details" 
          description={`Booking ID: ${booking.id}`} 
          icon={<Car size={24} />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Booking Status</p>
                {getStatusBadge(booking.status)}
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Booking Date & Time</p>
                <p className="font-medium">{booking.bookingDate}, {booking.bookingTime}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">{booking.paymentMethod}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                {getPaymentStatusBadge(booking.paymentStatus)}
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium">₹{booking.amount}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="font-medium">{booking.distance}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{booking.customerName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{booking.customerPhone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{booking.customerEmail}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Journey Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Ride Date</p>
                <p className="font-medium">{booking.rideDate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Pickup Time</p>
                <p className="font-medium">{booking.pickupTime}</p>
              </div>
            </div>
            
            {booking.dropTime && (
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Drop Time</p>
                  <p className="font-medium">{booking.dropTime}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-medium">{booking.from}</p>
                <p className="text-xs text-muted-foreground mt-1">{booking.fromAddress}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-medium">{booking.to}</p>
                <p className="text-xs text-muted-foreground mt-1">{booking.toAddress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Driver & Vehicle Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Driver Name</p>
                <p className="font-medium">{booking.driverName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Driver Phone</p>
                <p className="font-medium">{booking.driverPhone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Car size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Vehicle Type</p>
                <p className="font-medium">{booking.vehicleType}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Car size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Vehicle Registration</p>
                <p className="font-medium">{booking.vehicleRegNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel Booking</Button>
        <Button>Print Receipt</Button>
      </div>
    </div>
  );
};

export default TaxiBookingDetails;
