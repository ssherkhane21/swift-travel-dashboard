
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/common/DataTable';
import { ArrowLeft, User, Phone, Mail, Calendar, Bus, Hotel, Car, Bike } from 'lucide-react';

interface CustomerDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  totalBookings: number;
  totalSpent: number;
  lastActive: string;
}

interface CustomerBooking {
  id: string;
  type: 'bus' | 'hotel' | 'taxi' | 'bike';
  date: string;
  source?: string;
  destination?: string;
  hotelName?: string;
  amount: number;
  status: 'confirmed' | 'completed' | 'cancelled' | 'pending';
}

const CustomerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real application, this would be fetched from an API
  const customer: CustomerDetail = {
    id: id || "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    joinedDate: "2022-05-15",
    totalBookings: 12,
    totalSpent: 35450,
    lastActive: "2023-10-16"
  };

  // Sample bookings data
  const bookings: CustomerBooking[] = [
    {
      id: "BUS001",
      type: "bus",
      date: "2023-10-10",
      source: "Mumbai",
      destination: "Pune",
      amount: 650,
      status: "completed"
    },
    {
      id: "HTL001",
      type: "hotel",
      date: "2023-09-15",
      hotelName: "Luxe Grand Hotel",
      amount: 12500,
      status: "completed"
    },
    {
      id: "TX001",
      type: "taxi",
      date: "2023-08-22",
      source: "Airport",
      destination: "City Center",
      amount: 750,
      status: "completed"
    },
    {
      id: "BK001",
      type: "bike",
      date: "2023-07-05",
      source: "Andheri",
      destination: "Bandra",
      amount: 150,
      status: "completed"
    },
    {
      id: "BUS002",
      type: "bus",
      date: "2023-10-25",
      source: "Mumbai",
      destination: "Nagpur",
      amount: 1200,
      status: "confirmed"
    }
  ];

  const getBookingTypeIcon = (type: string) => {
    switch (type) {
      case 'bus':
        return <Bus size={16} className="text-blue-500" />;
      case 'hotel':
        return <Hotel size={16} className="text-green-500" />;
      case 'taxi':
        return <Car size={16} className="text-yellow-500" />;
      case 'bike':
        return <Bike size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const bookingColumns = [
    {
      key: 'id',
      header: 'Booking ID',
      cell: (booking: CustomerBooking) => booking.id,
      sortable: true,
    },
    {
      key: 'type',
      header: 'Type',
      cell: (booking: CustomerBooking) => (
        <div className="flex items-center gap-1">
          {getBookingTypeIcon(booking.type)}
          <span className="capitalize">{booking.type}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'date',
      header: 'Date',
      cell: (booking: CustomerBooking) => booking.date,
      sortable: true,
    },
    {
      key: 'details',
      header: 'Details',
      cell: (booking: CustomerBooking) => {
        if (booking.type === 'hotel') {
          return booking.hotelName;
        } else {
          return `${booking.source} to ${booking.destination}`;
        }
      },
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      cell: (booking: CustomerBooking) => <div className="font-medium">₹{booking.amount}</div>,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (booking: CustomerBooking) => {
        const statusStyles: Record<string, string> = {
          confirmed: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          cancelled: 'bg-red-100 text-red-800',
          completed: 'bg-blue-100 text-blue-800',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[booking.status]}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (booking: CustomerBooking) => {
        const getLink = () => {
          switch (booking.type) {
            case 'bus':
              return `/bus-management/bookings/${booking.id}`;
            case 'hotel':
              return `/hotel-management/bookings/${booking.id}`;
            case 'taxi':
              return `/taxi-management/bookings/${booking.id}`;
            case 'bike':
              return `/bike-management/bookings/${booking.id}`;
            default:
              return '#';
          }
        };
        
        return (
          <Link to={getLink()}>
            <Button size="sm" variant="outline">View Booking</Button>
          </Link>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/customer-management">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <PageHeader 
          title="Customer Details" 
          description={`Customer ID: ${customer.id}`} 
          icon={<User size={24} />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{customer.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{customer.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{customer.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Joined Date</p>
                <p className="font-medium">{customer.joinedDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="text-2xl font-bold">{customer.totalBookings}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">₹{customer.totalSpent}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Last Active</p>
              <p className="font-medium">{customer.lastActive}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Frequently Booked Service</p>
                <div className="flex items-center gap-1 mt-1">
                  <Bus size={18} className="text-blue-500" />
                  <span className="font-medium">Bus (5 bookings)</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Favorite Destination</p>
                <p className="font-medium">Pune (3 times)</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Favorite Hotel</p>
                <p className="font-medium">Luxe Grand Hotel (2 stays)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="bus">Bus</TabsTrigger>
              <TabsTrigger value="hotel">Hotel</TabsTrigger>
              <TabsTrigger value="taxi">Taxi</TabsTrigger>
              <TabsTrigger value="bike">Bike</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <DataTable 
                columns={bookingColumns} 
                data={bookings} 
                searchPlaceholder="Search bookings..." 
                allowCSVExport={true}
                allowPDFExport={true}
              />
            </TabsContent>
            
            <TabsContent value="bus">
              <DataTable 
                columns={bookingColumns} 
                data={bookings.filter(booking => booking.type === 'bus')} 
                searchPlaceholder="Search bus bookings..." 
                allowCSVExport={true}
                allowPDFExport={true}
              />
            </TabsContent>
            
            <TabsContent value="hotel">
              <DataTable 
                columns={bookingColumns} 
                data={bookings.filter(booking => booking.type === 'hotel')} 
                searchPlaceholder="Search hotel bookings..." 
                allowCSVExport={true}
                allowPDFExport={true}
              />
            </TabsContent>
            
            <TabsContent value="taxi">
              <DataTable 
                columns={bookingColumns} 
                data={bookings.filter(booking => booking.type === 'taxi')} 
                searchPlaceholder="Search taxi bookings..." 
                allowCSVExport={true}
                allowPDFExport={true}
              />
            </TabsContent>
            
            <TabsContent value="bike">
              <DataTable 
                columns={bookingColumns} 
                data={bookings.filter(booking => booking.type === 'bike')} 
                searchPlaceholder="Search bike bookings..." 
                allowCSVExport={true}
                allowPDFExport={true}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetails;
