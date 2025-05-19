
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import BusManagement from "./pages/bus/BusManagement";
import BusOperatorForm from "./pages/bus/BusOperatorForm";
import BusBookingDetails from "./pages/bus/BusBookingDetails";
import HotelManagement from "./pages/hotel/HotelManagement";
import HotelManagerForm from "./pages/hotel/HotelManagerForm";
import HotelBookingDetails from "./pages/hotel/HotelBookingDetails";
import TaxiManagement from "./pages/taxi/TaxiManagement";
import TaxiDriverForm from "./pages/taxi/TaxiDriverForm";
import TaxiBookingDetails from "./pages/taxi/TaxiBookingDetails";
import BikeManagement from "./pages/bike/BikeManagement";
import BikeRiderForm from "./pages/bike/BikeRiderForm";
import BikeBookingDetails from "./pages/bike/BikeBookingDetails";
import CustomerManagement from "./pages/customer/CustomerManagement";
import CustomerDetails from "./pages/customer/CustomerDetails";
import UserManagement from "./pages/user/UserManagement";
import UserForm from "./pages/user/UserForm";
import CommissionManagement from "./pages/commission/CommissionManagement";
import CouponManagement from "./pages/coupon/CouponManagement";
import CouponForm from "./pages/coupon/CouponForm";
import WalletManagement from "./pages/wallet/WalletManagement";
import NotificationManagement from "./pages/notification/NotificationManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          
          {/* Bus Management Routes */}
          <Route path="/bus-management" element={<AppLayout><BusManagement /></AppLayout>} />
          <Route path="/bus-management/add-operator" element={<AppLayout><BusOperatorForm /></AppLayout>} />
          <Route path="/bus-management/operators/:id" element={<AppLayout><BusOperatorForm /></AppLayout>} />
          <Route path="/bus-management/bookings/:id" element={<AppLayout><BusBookingDetails /></AppLayout>} />
          <Route path="/bus-management/buses/:operatorId" element={<AppLayout><BusBookingDetails /></AppLayout>} />
          
          {/* Hotel Management Routes */}
          <Route path="/hotel-management" element={<AppLayout><HotelManagement /></AppLayout>} />
          <Route path="/hotel-management/add-manager" element={<AppLayout><HotelManagerForm /></AppLayout>} />
          <Route path="/hotel-management/managers/:id" element={<AppLayout><HotelManagerForm /></AppLayout>} />
          <Route path="/hotel-management/bookings/:id" element={<AppLayout><HotelBookingDetails /></AppLayout>} />
          
          {/* Taxi Management Routes */}
          <Route path="/taxi-management" element={<AppLayout><TaxiManagement /></AppLayout>} />
          <Route path="/taxi-management/add-driver" element={<AppLayout><TaxiDriverForm /></AppLayout>} />
          <Route path="/taxi-management/drivers/:id" element={<AppLayout><TaxiDriverForm /></AppLayout>} />
          <Route path="/taxi-management/bookings/:id" element={<AppLayout><TaxiBookingDetails /></AppLayout>} />
          
          {/* Bike Management Routes */}
          <Route path="/bike-management" element={<AppLayout><BikeManagement /></AppLayout>} />
          <Route path="/bike-management/add-rider" element={<AppLayout><BikeRiderForm /></AppLayout>} />
          <Route path="/bike-management/riders/:id" element={<AppLayout><BikeRiderForm /></AppLayout>} />
          <Route path="/bike-management/bookings/:id" element={<AppLayout><BikeBookingDetails /></AppLayout>} />
          
          {/* Customer Management Routes */}
          <Route path="/customer-management" element={<AppLayout><CustomerManagement /></AppLayout>} />
          <Route path="/customer-management/customers/:id" element={<AppLayout><CustomerDetails /></AppLayout>} />
          
          {/* User Management Routes */}
          <Route path="/user-management" element={<AppLayout><UserManagement /></AppLayout>} />
          <Route path="/user-management/add-user" element={<AppLayout><UserForm /></AppLayout>} />
          <Route path="/user-management/users/:id" element={<AppLayout><UserForm /></AppLayout>} />
          
          {/* Commission Management Route */}
          <Route path="/commission-management" element={<AppLayout><CommissionManagement /></AppLayout>} />
          
          {/* Coupon Management Routes */}
          <Route path="/coupons" element={<AppLayout><CouponManagement /></AppLayout>} />
          <Route path="/coupons/add" element={<AppLayout><CouponForm /></AppLayout>} />
          <Route path="/coupons/:id" element={<AppLayout><CouponForm /></AppLayout>} />
          
          {/* Wallet Management Route */}
          <Route path="/wallet" element={<AppLayout><WalletManagement /></AppLayout>} />
          
          {/* Notification Management Route */}
          <Route path="/notifications" element={<AppLayout><NotificationManagement /></AppLayout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
