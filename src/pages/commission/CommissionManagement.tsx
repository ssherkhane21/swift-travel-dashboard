
import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  FormDescription,
} from '@/components/ui/form';
import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, Percent } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Form validation schema
const formSchema = z.object({
  serviceType: z.string(),
  commissionType: z.string(),
  commissionValue: z.number().min(0),
  startDate: z.date(),
  endDate: z.date().optional(),
  isActive: z.boolean(),
});

interface Commission {
  id: string;
  serviceType: string;
  commissionType: string;
  commissionValue: number;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
}

// Sample data
const initialCommissions: Commission[] = [
  {
    id: '1',
    serviceType: 'Bus Booking',
    commissionType: 'Percentage',
    commissionValue: 5,
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    isActive: true,
  },
  {
    id: '2',
    serviceType: 'Hotel Booking',
    commissionType: 'Fixed',
    commissionValue: 100,
    startDate: '2023-10-05',
    endDate: null,
    isActive: true,
  },
  {
    id: '3',
    serviceType: 'Taxi Booking',
    commissionType: 'Percentage',
    commissionValue: 10,
    startDate: '2023-11-01',
    endDate: '2024-01-31',
    isActive: false,
  },
  {
    id: '4',
    serviceType: 'Bike Booking',
    commissionType: 'Fixed',
    commissionValue: 50,
    startDate: '2023-10-15',
    endDate: '2023-11-30',
    isActive: true,
  },
];

const CommissionManagement: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>(initialCommissions);
  const [editingCommission, setEditingCommission] = useState<Commission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: '',
      commissionType: 'percentage',
      commissionValue: 0,
      isActive: true,
    },
  });

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!isDialogOpen) {
      setEditingCommission(null);
      form.reset({
        serviceType: '',
        commissionType: 'percentage',
        commissionValue: 0,
        isActive: true,
      });
    }
  }, [isDialogOpen, form]);

  // Set form values when editing
  React.useEffect(() => {
    if (editingCommission) {
      form.reset({
        serviceType: editingCommission.serviceType.toLowerCase().replace(' ', '_'),
        commissionType: editingCommission.commissionType.toLowerCase(),
        commissionValue: editingCommission.commissionValue,
        startDate: new Date(editingCommission.startDate),
        endDate: editingCommission.endDate ? new Date(editingCommission.endDate) : undefined,
        isActive: editingCommission.isActive,
      });
    }
  }, [editingCommission, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingCommission) {
      // Update existing commission
      setCommissions(prevCommissions => 
        prevCommissions.map(commission => 
          commission.id === editingCommission.id
            ? {
                ...commission,
                serviceType: values.serviceType === 'bus_booking' ? 'Bus Booking' :
                             values.serviceType === 'hotel_booking' ? 'Hotel Booking' :
                             values.serviceType === 'taxi_booking' ? 'Taxi Booking' : 'Bike Booking',
                commissionType: values.commissionType === 'percentage' ? 'Percentage' : 'Fixed',
                commissionValue: values.commissionValue,
                startDate: values.startDate.toISOString().split('T')[0],
                endDate: values.endDate ? values.endDate.toISOString().split('T')[0] : null,
                isActive: values.isActive,
              }
            : commission
        )
      );
      toast.success("Commission rule updated successfully");
    } else {
      // Add new commission
      const newCommission: Commission = {
        id: (commissions.length + 1).toString(),
        serviceType: values.serviceType === 'bus_booking' ? 'Bus Booking' :
                     values.serviceType === 'hotel_booking' ? 'Hotel Booking' :
                     values.serviceType === 'taxi_booking' ? 'Taxi Booking' : 'Bike Booking',
        commissionType: values.commissionType === 'percentage' ? 'Percentage' : 'Fixed',
        commissionValue: values.commissionValue,
        startDate: values.startDate.toISOString().split('T')[0],
        endDate: values.endDate ? values.endDate.toISOString().split('T')[0] : null,
        isActive: values.isActive,
      };
      
      setCommissions(prevCommissions => [...prevCommissions, newCommission]);
      toast.success("Commission rule added successfully");
    }
    
    setIsDialogOpen(false);
  };

  const handleEdit = (commission: Commission) => {
    setEditingCommission(commission);
    setIsDialogOpen(true);
  };

  const handleToggleStatus = (commission: Commission) => {
    setCommissions(prevCommissions =>
      prevCommissions.map(item =>
        item.id === commission.id
          ? { ...item, isActive: !item.isActive }
          : item
      )
    );
    
    toast.success(`Commission rule ${commission.isActive ? 'deactivated' : 'activated'} successfully`);
  };

  const columns = [
    {
      key: 'serviceType',
      header: 'Service Type',
      cell: (commission: Commission) => commission.serviceType,
      sortable: true,
    },
    {
      key: 'commissionType',
      header: 'Commission Type',
      cell: (commission: Commission) => commission.commissionType,
      sortable: true,
    },
    {
      key: 'commissionValue',
      header: 'Commission Value',
      cell: (commission: Commission) => (
        commission.commissionType === 'Percentage' 
          ? `${commission.commissionValue}%` 
          : `₹${commission.commissionValue}`
      ),
      sortable: true,
    },
    {
      key: 'startDate',
      header: 'Start Date',
      cell: (commission: Commission) => commission.startDate,
      sortable: true,
    },
    {
      key: 'endDate',
      header: 'End Date',
      cell: (commission: Commission) => commission.endDate || 'Ongoing',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (commission: Commission) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          commission.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {commission.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (commission: Commission) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => handleEdit(commission)}>Edit</Button>
          <Button 
            size="sm" 
            variant="outline" 
            className={commission.isActive ? 'text-red-600' : 'text-green-600'}
            onClick={() => handleToggleStatus(commission)}
          >
            {commission.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Commission Management" 
        description="Manage commission rules for different services" 
        icon={<Percent size={24} />}
      />
      
      <Tabs defaultValue="commission-rules" className="space-y-6">
        <TabsList>
          <TabsTrigger value="commission-rules">Commission Rules</TabsTrigger>
          <TabsTrigger value="add-commission">Add New Commission</TabsTrigger>
        </TabsList>
        
        <TabsContent value="commission-rules" className="space-y-4">
          <DataTable 
            columns={columns} 
            data={commissions} 
            searchPlaceholder="Search commission rules..." 
            allowCSVExport={true}
            allowPDFExport={true}
          />
        </TabsContent>
        
        <TabsContent value="add-commission">
          <Card>
            <CardHeader>
              <CardTitle>Add Commission Rule</CardTitle>
              <CardDescription>
                Create a new commission rule for your services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select service type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="bus_booking">Bus Booking</SelectItem>
                              <SelectItem value="hotel_booking">Hotel Booking</SelectItem>
                              <SelectItem value="taxi_booking">Taxi Booking</SelectItem>
                              <SelectItem value="bike_booking">Bike Booking</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="commissionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commission Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select commission type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="percentage">Percentage (%)</SelectItem>
                              <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="commissionValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commission Value</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              step={form.watch('commissionType') === 'percentage' ? '0.01' : '1'}
                              placeholder={form.watch('commissionType') === 'percentage' ? 'Enter percentage' : 'Enter amount'} 
                              {...field} 
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date (Optional)</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>No end date (ongoing)</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Active Status
                            </FormLabel>
                            <FormDescription>
                              Enable or disable this commission rule
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit">{editingCommission ? "Update" : "Create"} Commission Rule</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Edit Commission Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Commission Rule</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Same form fields as above */}
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bus_booking">Bus Booking</SelectItem>
                          <SelectItem value="hotel_booking">Hotel Booking</SelectItem>
                          <SelectItem value="taxi_booking">Taxi Booking</SelectItem>
                          <SelectItem value="bike_booking">Bike Booking</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="commissionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commission Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select commission type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="commissionValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commission Value</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          step={form.watch('commissionType') === 'percentage' ? '0.01' : '1'}
                          placeholder={form.watch('commissionType') === 'percentage' ? 'Enter percentage' : 'Enter amount'} 
                          {...field} 
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>No end date (ongoing)</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Active Status
                        </FormLabel>
                        <FormDescription>
                          Enable or disable this commission rule
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit">Update Commission Rule</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommissionManagement;
