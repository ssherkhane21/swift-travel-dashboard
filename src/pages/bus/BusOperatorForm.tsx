
import React from 'react';
import { useParams } from 'react-router-dom';
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
import { Bus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  mobile: z.string().min(10, { message: 'Valid mobile number is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  address: z.string().min(5, { message: 'Address is required' }),
  identityCard: z.string().min(1, { message: 'Identity card is required' }),
  businessLicense: z.string().min(1, { message: 'Business license is required' }),
  bankName: z.string().min(2, { message: 'Bank name is required' }),
  accountNumber: z.string().min(5, { message: 'Account number is required' }),
  accountHolderName: z.string().min(2, { message: 'Account holder name is required' }),
  status: z.string(),
});

const BusOperatorForm: React.FC = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  // Sample data for edit mode
  const operatorData = isEditMode ? {
    name: 'Global Tours',
    mobile: '+91 9876543210',
    email: 'info@globaltours.com',
    address: '123 Main Street, Bangalore, Karnataka, India',
    identityCard: 'ABCDE1234F',
    businessLicense: 'BUS12345678',
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    accountHolderName: 'Global Tours Pvt Ltd',
    status: 'approved',
  } : undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: operatorData || {
      name: '',
      mobile: '',
      email: '',
      address: '',
      identityCard: '',
      businessLicense: '',
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
          ? "Bus operator updated successfully"
          : "Bus operator added successfully"
      );
    }, 1000);
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
          title={isEditMode ? "Edit Bus Operator" : "Add Bus Operator"} 
          description={isEditMode ? "Update bus operator details" : "Add a new bus operator to the system"} 
          icon={<Bus size={24} />}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Bus Operator Information</CardTitle>
          <CardDescription>
            Please fill in all the required details of the bus operator.
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
                    helpText="Upload a profile photo of the bus operator (PNG, JPG, PDF up to 5MB)"
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter operator name" {...field} />
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
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-2">Documents</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="identityCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identity Card</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter identity card details" {...field} />
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
                        <Input placeholder="Enter business license details" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2">
                  <FileUpload
                    id="businessLicenseImage"
                    label="Business License Image"
                    accept="image/*,.pdf"
                    maxSize={5}
                    helpText="Upload business license document (PNG, JPG, PDF up to 5MB)"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <FileUpload
                    id="idCardFront"
                    label="ID Card Front"
                    accept="image/*,.pdf"
                    maxSize={5}
                    helpText="Upload front side of ID card (PNG, JPG, PDF up to 5MB)"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <FileUpload
                    id="idCardBack"
                    label="ID Card Back"
                    accept="image/*,.pdf"
                    maxSize={5}
                    helpText="Upload back side of ID card (PNG, JPG, PDF up to 5MB)"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-2">Bank Details</h3>
                </div>
                
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
              
              <div className="flex justify-end gap-3">
                <Link to="/bus-management">
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

export default BusOperatorForm;
