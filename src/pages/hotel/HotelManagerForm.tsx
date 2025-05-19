
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/common/FileUpload';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/sonner';
import { Hotel, ArrowLeft } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  mobile: z.string().min(10, { message: 'Valid mobile number is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  hotelName: z.string().min(3, { message: 'Hotel name is required' }),
  businessLicense: z.string().min(3, { message: 'Business license is required' }),
  address: z.string().min(5, { message: 'Address is required' }),
  city: z.string().min(2, { message: 'City is required' }),
  locality: z.string().min(2, { message: 'Locality is required' }),
  landmark: z.string().optional(),
  pincode: z.string().min(5, { message: 'Valid pincode is required' }),
  totalRooms: z.string().min(1, { message: 'Total rooms is required' }),
  standardRooms: z.string().min(0, { message: 'Standard rooms count is required' }),
  standardRoomPrice: z.string().min(1, { message: 'Standard room price is required' }),
  luxuryRooms: z.string().min(0, { message: 'Luxury rooms count is required' }),
  luxuryRoomPrice: z.string().min(1, { message: 'Luxury room price is required' }),
  checkinTime: z.string().min(1, { message: 'Check-in time is required' }),
  checkoutTime: z.string().min(1, { message: 'Check-out time is required' }),
  bankName: z.string().min(2, { message: 'Bank name is required' }),
  accountNumber: z.string().min(5, { message: 'Account number is required' }),
  accountHolderName: z.string().min(2, { message: 'Account holder name is required' }),
  status: z.string(),
});

const HotelManagerForm: React.FC = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  // Sample data for edit mode
  const managerData = isEditMode ? {
    name: 'Vikram Singh',
    mobile: '+91 9876543210',
    email: 'vikram@luxehotels.com',
    hotelName: 'Luxe Grand Hotel',
    businessLicense: 'LIC12345678',
    address: '123 Marine Drive',
    city: 'Mumbai',
    locality: 'Nariman Point',
    landmark: 'Near Gateway of India',
    pincode: '400001',
    totalRooms: '150',
    standardRooms: '100',
    standardRoomPrice: '5000',
    luxuryRooms: '50',
    luxuryRoomPrice: '15000',
    checkinTime: '14:00',
    checkoutTime: '12:00',
    bankName: 'HDFC Bank',
    accountNumber: '12345678901234',
    accountHolderName: 'Luxe Grand Hotel Pvt Ltd',
    status: 'approved',
  } : undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: managerData || {
      name: '',
      mobile: '',
      email: '',
      hotelName: '',
      businessLicense: '',
      address: '',
      city: '',
      locality: '',
      landmark: '',
      pincode: '',
      totalRooms: '',
      standardRooms: '',
      standardRoomPrice: '',
      luxuryRooms: '',
      luxuryRoomPrice: '',
      checkinTime: '',
      checkoutTime: '',
      bankName: '',
      accountNumber: '',
      accountHolderName: '',
      status: 'pending',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success(
        isEditMode
          ? "Hotel manager updated successfully"
          : "Hotel manager added successfully"
      );
    }, 1000);
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
          title={isEditMode ? "Edit Hotel Manager" : "Add Hotel Manager"} 
          description={isEditMode ? "Update hotel manager details" : "Add a new hotel manager to the system"} 
          icon={<Hotel size={24} />}
        />
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="hotel">Hotel Details</TabsTrigger>
              <TabsTrigger value="rooms">Room Information</TabsTrigger>
              <TabsTrigger value="policy">Policies</TabsTrigger>
              <TabsTrigger value="bank">Bank Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Provide basic details of the hotel manager
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <FileUpload
                        id="profilePhoto"
                        label="Profile Photo"
                        accept="image/*,.pdf"
                        maxSize={5}
                        helpText="Upload a profile photo of the hotel manager (PNG, JPG, PDF up to 5MB)"
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter manager name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter mobile number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="submitted">Submitted</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                              <SelectItem value="blocked">Blocked</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="md:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FileUpload
                          id="idCardFront"
                          label="ID Card Front"
                          accept="image/*,.pdf"
                          maxSize={5}
                          helpText="Upload front side of ID card (PNG, JPG, PDF up to 5MB)"
                        />
                        
                        <FileUpload
                          id="idCardBack"
                          label="ID Card Back"
                          accept="image/*,.pdf"
                          maxSize={5}
                          helpText="Upload back side of ID card (PNG, JPG, PDF up to 5MB)"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="hotel">
              <Card>
                <CardHeader>
                  <CardTitle>Hotel Details</CardTitle>
                  <CardDescription>
                    Enter the details of the hotel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="hotelName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hotel Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter hotel name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="businessLicense"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business License</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter business license number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="md:col-span-2">
                      <FileUpload
                        id="hotelPhotos"
                        label="Hotel Photos"
                        accept="image/*"
                        maxSize={10}
                        helpText="Upload photos of the hotel (Multiple images, up to 10MB each)"
                        multiple
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter complete address" 
                              {...field}
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="locality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Locality</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter locality" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="landmark"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Landmark</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter landmark (optional)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pin Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter pin code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rooms">
              <Card>
                <CardHeader>
                  <CardTitle>Room Information</CardTitle>
                  <CardDescription>
                    Provide details about the hotel rooms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="totalRooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Rooms</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter total number of rooms" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="border p-4 rounded-md space-y-4">
                      <h3 className="font-medium">Standard Rooms</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="standardRooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Standard Rooms</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Enter number of standard rooms" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="standardRoomPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Standard Room Price (₹)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Enter price per night" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <FormLabel>Standard Room Photos</FormLabel>
                        <FileUpload
                          id="standardRoomPhotos"
                          label="Room Photos"
                          accept="image/*"
                          maxSize={10}
                          helpText="Upload photos of standard rooms (Multiple images, up to 10MB each)"
                          multiple
                        />
                      </div>
                    </div>
                    
                    <div className="border p-4 rounded-md space-y-4">
                      <h3 className="font-medium">Luxury Rooms</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="luxuryRooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Luxury Rooms</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Enter number of luxury rooms" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="luxuryRoomPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Luxury Room Price (₹)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Enter price per night" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <FormLabel>Luxury Room Photos</FormLabel>
                        <FileUpload
                          id="luxuryRoomPhotos"
                          label="Room Photos"
                          accept="image/*"
                          maxSize={10}
                          helpText="Upload photos of luxury rooms (Multiple images, up to 10MB each)"
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="policy">
              <Card>
                <CardHeader>
                  <CardTitle>Policies</CardTitle>
                  <CardDescription>
                    Provide details about check-in, check-out and hotel policies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="checkinTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-in Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="checkoutTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-out Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="md:col-span-2">
                      <FileUpload
                        id="policyDocuments"
                        label="Policy Documents"
                        accept=".pdf,.doc,.docx"
                        maxSize={5}
                        helpText="Upload hotel policy documents (PDF, DOC, DOCX up to 5MB)"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bank">
              <Card>
                <CardHeader>
                  <CardTitle>Bank Details</CardTitle>
                  <CardDescription>
                    Provide bank account details for payments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter bank name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="accountHolderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Holder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account holder name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="md:col-span-2">
                      <FileUpload
                        id="bankDetails"
                        label="Bank Account Details"
                        accept="image/*,.pdf"
                        maxSize={5}
                        helpText="Upload bank account details document (PNG, JPG, PDF up to 5MB)"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-3">
            <Link to="/hotel-management">
              <Button variant="outline" type="button">Cancel</Button>
            </Link>
            <Button type="submit">{isEditMode ? "Update" : "Submit"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HotelManagerForm;
