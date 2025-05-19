
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DataTable } from '@/components/common/DataTable';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Bell, Calendar as CalendarIcon, Eye } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  recipientType: string;
  recipients: number;
  status: 'sent' | 'scheduled' | 'failed';
  createdAt: string;
  scheduledFor: string | null;
}

// Sample data
const notifications: Notification[] = [
  {
    id: '1',
    title: 'Weekend Discount',
    message: 'Enjoy 20% off on all taxi bookings this weekend!',
    recipientType: 'All Customers',
    recipients: 5420,
    status: 'sent',
    createdAt: '2023-10-12 09:30 AM',
    scheduledFor: null,
  },
  {
    id: '2',
    title: 'New Feature Announcement',
    message: 'Now you can book hotels directly from our app!',
    recipientType: 'All Users',
    recipients: 8750,
    status: 'sent',
    createdAt: '2023-10-10 02:15 PM',
    scheduledFor: null,
  },
  {
    id: '3',
    title: 'Driver Onboarding',
    message: 'Complete your profile to start accepting ride requests',
    recipientType: 'New Drivers',
    recipients: 120,
    status: 'sent',
    createdAt: '2023-10-08 11:45 AM',
    scheduledFor: null,
  },
  {
    id: '4',
    title: 'Diwali Special Offer',
    message: 'Special discounts on all services during Diwali!',
    recipientType: 'All Users',
    recipients: 9000,
    status: 'scheduled',
    createdAt: '2023-10-15 10:00 AM',
    scheduledFor: '2023-10-20 08:00 AM',
  },
];

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  recipientType: z.string(),
  scheduleType: z.string(),
  scheduledDate: z.date().optional(),
  sendEmail: z.boolean(),
  sendPush: z.boolean(),
  sendSMS: z.boolean(),
});

const NotificationManagement: React.FC = () => {
  const columns = [
    {
      key: 'title',
      header: 'Title',
      cell: (notification: Notification) => <div className="font-medium">{notification.title}</div>,
      sortable: true,
    },
    {
      key: 'message',
      header: 'Message',
      cell: (notification: Notification) => (
        <div className="max-w-xs truncate">{notification.message}</div>
      ),
      sortable: true,
    },
    {
      key: 'recipientType',
      header: 'Recipients',
      cell: (notification: Notification) => notification.recipientType,
      sortable: true,
    },
    {
      key: 'recipients',
      header: 'Count',
      cell: (notification: Notification) => notification.recipients.toLocaleString(),
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (notification: Notification) => {
        const statusClasses = {
          sent: 'bg-green-100 text-green-800',
          scheduled: 'bg-blue-100 text-blue-800',
          failed: 'bg-red-100 text-red-800',
        };
        return (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[notification.status]}`}>
            {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: 'dateInfo',
      header: 'Date',
      cell: (notification: Notification) => (
        <div>
          {notification.status === 'scheduled' ? (
            <>
              <div className="text-xs text-muted-foreground">Created: {notification.createdAt}</div>
              <div>Scheduled: {notification.scheduledFor}</div>
            </>
          ) : (
            notification.createdAt
          )}
        </div>
      ),
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (notification: Notification) => (
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Eye size={16} />
          View Details
        </Button>
      ),
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      message: '',
      recipientType: '',
      scheduleType: 'immediate',
      sendEmail: true,
      sendPush: true,
      sendSMS: false,
    },
  });

  const watchScheduleType = form.watch('scheduleType');
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success(
        values.scheduleType === 'immediate'
          ? "Notification sent successfully!"
          : "Notification scheduled successfully!"
      );
      form.reset();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Notifications & Alerts" 
        description="Send alerts and notifications to users" 
        icon={<Bell size={24} />}
      />
      
      <Tabs defaultValue="send-notification" className="space-y-6">
        <TabsList>
          <TabsTrigger value="send-notification">Send Notification</TabsTrigger>
          <TabsTrigger value="notification-history">Notification History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="send-notification">
          <Card>
            <CardHeader>
              <CardTitle>New Notification</CardTitle>
              <CardDescription>
                Create and send notifications to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notification Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter notification title" {...field} />
                          </FormControl>
                          <FormDescription>
                            A clear and concise title for the notification
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="recipientType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipients</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select recipient group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="all_users">All Users</SelectItem>
                              <SelectItem value="all_customers">All Customers</SelectItem>
                              <SelectItem value="all_drivers">All Drivers</SelectItem>
                              <SelectItem value="all_hotel_managers">All Hotel Managers</SelectItem>
                              <SelectItem value="all_bus_operators">All Bus Operators</SelectItem>
                              <SelectItem value="new_users">New Users (Last 7 days)</SelectItem>
                              <SelectItem value="inactive_users">Inactive Users (30+ days)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Who will receive this notification
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notification Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter the notification message" 
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              The main content of your notification
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="scheduleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Send Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="When to send" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="immediate">Send Immediately</SelectItem>
                              <SelectItem value="scheduled">Schedule for Later</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {watchScheduleType === 'scheduled' && (
                      <FormField
                        control={form.control}
                        name="scheduledDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Schedule Date</FormLabel>
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
                                      format(field.value, "PPP HH:mm")
                                    ) : (
                                      <span>Pick a date and time</span>
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
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              When the notification will be sent
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <div className="md:col-span-2">
                      <FormLabel>Delivery Channels</FormLabel>
                      <div className="flex items-center space-x-4 mt-2">
                        <FormField
                          control={form.control}
                          name="sendPush"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Push Notification</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="sendEmail"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Email</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="sendSMS"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <FormLabel className="font-normal">SMS</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      {watchScheduleType === 'immediate' ? 'Send Notification' : 'Schedule Notification'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notification-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Filter notification history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Recipient Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Recipients</SelectItem>
                    <SelectItem value="customers">Customers</SelectItem>
                    <SelectItem value="drivers">Drivers</SelectItem>
                    <SelectItem value="managers">Managers</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input type="date" placeholder="Date From" />
                
                <Button>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
          
          <DataTable 
            columns={columns} 
            data={notifications} 
            searchPlaceholder="Search notifications..." 
            allowCSVExport={true}
            allowPDFExport={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationManagement;
