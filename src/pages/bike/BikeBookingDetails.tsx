
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bike, User, Phone, Mail, MapPin, Calendar, CreditCard, Clock } from 'lucide-react';

interface BikeBookingDetail {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  riderName: string;
  riderPhone: string;
  from: string;
  fromAddress: string;
  to: string;
  toAddress: string;
  rideDate: string;
  bookingTime: string;
  pickupTime: string;
  dropTime?: string;
  bikeType: string;
  bikeRegNumber: string;
  distance: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'in-progress';
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  bookingDate: string;
}

const BikeBookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real application, this would be fetched from an API
  const booking: BikeBookingDetail = {
    id: id || "BK001",
    customerName: "Ankit Gupta",
    customerPhone: "+91 9876543210",
    customerEmail: "ankit@example.com",
    riderName: "Rohit Sharma",
    riderPhone: "+91 9876543210",
    from: "Andheri East",
    fromAddress: "Andheri East Metro Station, Mumbai",
    to: "Bandra West",
    toAddress: "Linking Road, Bandra West, Mumbai",
    rideDate: "2023-10-15",
    bookingTime: "10:15 AM",
    pickupTime: "10:30 AM",
    dropTime: "11:00 AM",
    bikeType: "Standard",
    bikeRegNumber: "MH-01-AB-5678",
    distance: "8 km",
    amount: 150,
    status: "completed",
    paymentMethod: "UPI",
    paymentStatus: "paid",
    bookingDate: "2023-10-15"
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
        <Link to="/bike-management">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <PageHeader 
          title="Bike Booking Details" 
          description={`Booking ID: ${booking.id}`} 
          icon={<Bike size={24} />}
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
            <CardTitle>Rider & Vehicle Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Rider Name</p>
                <p className="font-medium">{booking.riderName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Rider Phone</p>
                <p className="font-medium">{booking.riderPhone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Bike size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Bike Type</p>
                <p className="font-medium">{booking.bikeType}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Bike size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Bike Registration</p>
                <p className="font-medium">{booking.bikeRegNumber}</p>
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

export default BikeBookingDetails;
