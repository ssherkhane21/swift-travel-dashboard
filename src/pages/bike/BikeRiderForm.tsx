
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
import { Bike, ArrowLeft } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  mobile: z.string().min(10, { message: 'Valid mobile number is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  age: z.string().min(1, { message: 'Age is required' }),
  address: z.string().min(5, { message: 'Address is required' }),
  experience: z.string().min(1, { message: 'Experience is required' }),
  bikeType: z.string().min(1, { message: 'Bike type is required' }),
  bikeRegistration: z.string().min(5, { message: 'Bike registration is required' }),
  bikeInsurance: z.string().min(1, { message: 'Bike insurance details are required' }),
  status: z.string(),
});

const BikeRiderForm: React.FC = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  // Sample data for edit mode
  const riderData = isEditMode ? {
    name: 'Rohit Sharma',
    mobile: '+91 9876543210',
    email: 'rohit@example.com',
    age: '28',
    address: '123 Powai, Mumbai, Maharashtra',
    experience: '3',
    bikeType: 'standard',
    bikeRegistration: 'MH-01-AB-5678',
    bikeInsurance: 'INS987654321',
    status: 'approved',
  } : undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: riderData || {
      name: '',
      mobile: '',
      email: '',
      age: '',
      address: '',
      experience: '',
      bikeType: 'standard',
      bikeRegistration: '',
      bikeInsurance: '',
      status: 'pending',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success(
        isEditMode
          ? "Bike rider updated successfully"
          : "Bike rider added successfully"
      );
    }, 1000);
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
          title={isEditMode ? "Edit Bike Rider" : "Add Bike Rider"} 
          description={isEditMode ? "Update bike rider details" : "Add a new bike rider to the system"} 
          icon={<Bike size={24} />}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Rider Information</CardTitle>
          <CardDescription>
            Please fill in all the required details of the bike rider
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
                    helpText="Upload a profile photo of the bike rider (PNG, JPG, PDF up to 5MB)"
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter rider name" {...field} />
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
                      <FormLabel>Riding Experience (years)</FormLabel>
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
                  name="bikeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bike Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bike type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bikeRegistration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bike Registration Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter bike registration number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bikeInsurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bike Insurance Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter bike insurance number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FileUpload
                    id="bikeRegistrationCertificate"
                    label="Bike Registration Certificate"
                    accept="image/*,.pdf"
                    maxSize={5}
                    helpText="Upload bike RC (PNG, JPG, PDF up to 5MB)"
                  />
                  
                  <FileUpload
                    id="bikeInsuranceDocument"
                    label="Bike Insurance Document"
                    accept="image/*,.pdf"
                    maxSize={5}
                    helpText="Upload bike insurance (PNG, JPG, PDF up to 5MB)"
                  />
                  
                  <FileUpload
                    id="bikePhotos"
                    label="Bike Photos"
                    accept="image/*"
                    maxSize={5}
                    helpText="Upload bike photos (PNG, JPG up to 5MB)"
                    multiple
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Link to="/bike-management">
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

export default BikeRiderForm;
