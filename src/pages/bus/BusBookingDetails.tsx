
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bus, User, Phone, Mail, MapPin, Calendar, CreditCard } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

interface BusBookingDetail {
  id: string;
  busRegNumber: string;
  customerName: string;
  phone: string;
  email: string;
  from: string;
  to: string;
  journeyDate: string;
  returnDate?: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  paymentMethod: string;
  bookingDate: string;
  busType: string;
  seatNumbers: string[];
  departureTime: string;
  arrivalTime: string;
  operatorName: string;
}

const BusBookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real application, this would be fetched from an API
  const booking: BusBookingDetail = {
    id: id || "BK001",
    busRegNumber: "KA-01-AB-1234",
    customerName: "Raj Kumar",
    phone: "+91 9876543210",
    email: "raj@example.com",
    from: "Bangalore",
    to: "Mysore",
    journeyDate: "2023-10-15",
    amount: 650,
    status: "confirmed",
    paymentMethod: "Credit Card",
    bookingDate: "2023-10-05",
    busType: "AC Sleeper",
    seatNumbers: ["12A", "12B"],
    departureTime: "10:30 PM",
    arrivalTime: "6:00 AM",
    operatorName: "Global Tours"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/bus-management">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <PageHeader 
          title="Bus Booking Details" 
          description={`Booking ID: ${booking.id}`} 
          icon={<Bus size={24} />}
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
                <StatusBadge status={booking.status as any} className="mt-1" />
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Booking Date</p>
                <p className="font-medium">{booking.bookingDate}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">{booking.paymentMethod}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Amount Paid</p>
                <p className="font-medium">₹{booking.amount}</p>
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
                <p className="font-medium">{booking.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{booking.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Journey Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Bus Registration</p>
                <p className="font-medium">{booking.busRegNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Bus Type</p>
                <p className="font-medium">{booking.busType}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Operator</p>
                <p className="font-medium">{booking.operatorName}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Seat Numbers</p>
                <div className="flex gap-1 flex-wrap mt-1">
                  {booking.seatNumbers.map((seat) => (
                    <Badge key={seat} variant="outline">{seat}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{booking.from}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="font-medium">{booking.to}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Journey Date</p>
                  <p className="font-medium">{booking.journeyDate}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Journey Time</p>
                <p className="font-medium">{booking.departureTime} - {booking.arrivalTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel Booking</Button>
        <Button>Print Ticket</Button>
      </div>
    </div>
  );
};

export default BusBookingDetails;
