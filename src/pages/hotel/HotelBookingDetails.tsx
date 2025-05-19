
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Hotel, User, Phone, Mail, MapPin, Calendar, CreditCard, Clock } from 'lucide-react';

interface HotelBookingDetail {
  id: string;
  hotelId: string;
  hotelName: string;
  customerName: string;
  phone: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  roomCount: number;
  guestCount: number;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  paymentMethod: string;
  bookingDate: string;
  specialRequests?: string;
  checkInTime: string;
  checkOutTime: string;
}

const HotelBookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real application, this would be fetched from an API
  const booking: HotelBookingDetail = {
    id: id || "HB001",
    hotelId: "HTL001",
    hotelName: "Luxe Grand Hotel",
    customerName: "Amit Shah",
    phone: "+91 9876543210",
    email: "amit@example.com",
    checkInDate: "2023-10-15",
    checkOutDate: "2023-10-18",
    roomType: "Deluxe Room",
    roomCount: 1,
    guestCount: 2,
    amount: 15000,
    status: "confirmed",
    paymentMethod: "Credit Card",
    bookingDate: "2023-10-01",
    specialRequests: "Early check-in requested. High floor room preferred.",
    checkInTime: "12:00 PM",
    checkOutTime: "11:00 AM"
  };

  // Calculate number of nights
  const checkInDate = new Date(booking.checkInDate);
  const checkOutDate = new Date(booking.checkOutDate);
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
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
        <Link to="/hotel-management">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <PageHeader 
          title="Hotel Booking Details" 
          description={`Booking ID: ${booking.id}`} 
          icon={<Hotel size={24} />}
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
            <CardTitle>Stay Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Hotel Name</p>
                <p className="font-medium">{booking.hotelName}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Room Type</p>
                <p className="font-medium">{booking.roomType}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Number of Rooms</p>
                <p className="font-medium">{booking.roomCount}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Number of Guests</p>
                <p className="font-medium">{booking.guestCount}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Check-in Date</p>
                  <p className="font-medium">{booking.checkInDate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Check-out Date</p>
                  <p className="font-medium">{booking.checkOutDate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Check-in Time</p>
                  <p className="font-medium">{booking.checkInTime}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Check-out Time</p>
                  <p className="font-medium">{booking.checkOutTime}</p>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{nights} {nights === 1 ? 'Night' : 'Nights'}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Per Night Cost</p>
                <p className="font-medium">₹{(booking.amount / nights).toFixed(2)}</p>
              </div>
            </div>
            
            {booking.specialRequests && (
              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-muted-foreground mb-1">Special Requests</p>
                <p>{booking.specialRequests}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel Booking</Button>
        <Button>Print Reservation</Button>
      </div>
    </div>
  );
};

export default HotelBookingDetails;
