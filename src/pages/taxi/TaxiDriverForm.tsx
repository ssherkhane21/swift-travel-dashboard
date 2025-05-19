
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/sonner';
import { Car, ArrowLeft } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  mobile: z.string().min(10, { message: 'Valid mobile number is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  age: z.string().min(1, { message: 'Age is required' }),
  address: z.string().min(5, { message: 'Address is required' }),
  experience: z.string().min(1, { message: 'Experience is required' }),
  vehicleType: z.string().min(1, { message: 'Vehicle type is required' }),
  vehicleRegistration: z.string().min(5, { message: 'Vehicle registration is required' }),
  vehicleInsurance: z.string().min(1, { message: 'Vehicle insurance details are required' }),
  status: z.string(),
});

const TaxiDriverForm: React.FC = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  // Sample data for edit mode
  const driverData = isEditMode ? {
    name: 'Rajesh Kumar',
    mobile: '+91 9876543210',
    email: 'rajesh@example.com',
    age: '35',
    address: '123 Andheri East, Mumbai, Maharashtra',
    experience: '5',
    vehicleType: 'sedan',
    vehicleRegistration: 'MH-01-AB-1234',
    vehicleInsurance: 'INS123456789',
    status: 'approved',
  } : undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: driverData || {
      name: '',
      mobile: '',
      email: '',
      age: '',
      address: '',
      experience: '',
      vehicleType: 'sedan',
      vehicleRegistration: '',
      vehicleInsurance: '',
      status: 'pending',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success(
        isEditMode
          ? "Taxi driver updated successfully"
          : "Taxi driver added successfully"
      );
    }, 1000);
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
          title={isEditMode ? "Edit Taxi Driver" : "Add Taxi Driver"} 
          description={isEditMode ? "Update taxi driver details" : "Add a new taxi driver to the system"} 
          icon={<Car size={24} />}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Driver Information</CardTitle>
          <CardDescription>
            Please fill in all the required details of the taxi driver
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <FileUpload
                    id="profilePhoto"
                    label="Profile Photo"
                    accept="image/*,.pdf"
                    maxSize={5}
                    helpText="Upload a profile photo of the taxi driver (PNG, JPG, PDF up to 5MB)"
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter driver name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter age" {...field} />
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
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
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
                </div>
                
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driving Experience (years)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter years of experience" {...field} />
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
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-2">Documents</h3>
                </div>
                
                <div className="grid md:col-span-2 grid-cols-1 md:grid-cols-2 gap-6">
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
                  
                  <FileUpload
                    id="drivingLicense"
                    label="Driving License"
                    accept="image/*,.pdf"
                    maxSize={5}
                    helpText="Upload driving license (PNG, JPG, PDF up to 5MB)"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="vehicleRegistration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Registration Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter vehicle registration number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="vehicleInsurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Insurance Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter vehicle insurance number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FileUpload
                    id="vehicleRegistrationCertificate"
                    label="Vehicle Registration Certificate"
                    accept="image/*,.pdf"
                    maxSize={5}
                    helpText="Upload vehicle RC (PNG, JPG, PDF up to 5MB)"
                  />
                  
                  <FileUpload
                    id="vehicleInsuranceDocument"
                    label="Vehicle Insurance Document"
                    accept="image/*,.pdf"
                    maxSize={5}
                    helpText="Upload vehicle insurance (PNG, JPG, PDF up to 5MB)"
                  />
                  
                  <FileUpload
                    id="vehiclePhotos"
                    label="Vehicle Photos"
                    accept="image/*"
                    maxSize={5}
                    helpText="Upload vehicle photos (PNG, JPG up to 5MB)"
                    multiple
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Link to="/taxi-management">
                  <Button variant="outline" type="button">Cancel</Button>
                </Link>
                <Button type="submit">{isEditMode ? "Update" : "Submit"}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxiDriverForm;
