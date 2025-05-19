
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { DataTable } from '@/components/common/DataTable';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wallet, ArrowDown, ArrowUp, Eye } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userType: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
}

interface WalletRule {
  id: string;
  userType: string;
  withdrawalLimit: number;
  minWithdrawal: number;
  maxWithdrawal: number;
  isActive: boolean;
}

// Sample data
const transactions: Transaction[] = [
  {
    id: '1',
    userId: 'USR001',
    userName: 'Rahul Sharma',
    userType: 'customer',
    amount: 1000,
    type: 'credit',
    description: 'Wallet recharge',
    status: 'success',
    timestamp: '2023-10-15 10:30 AM',
  },
  {
    id: '2',
    userId: 'USR002',
    userName: 'Priya Patel',
    userType: 'customer',
    amount: 500,
    type: 'debit',
    description: 'Booking payment',
    status: 'success',
    timestamp: '2023-10-14 02:45 PM',
  },
  {
    id: '3',
    userId: 'DRV001',
    userName: 'Amit Kumar',
    userType: 'driver',
    amount: 750,
    type: 'credit',
    description: 'Ride payment',
    status: 'success',
    timestamp: '2023-10-14 05:15 PM',
  },
  {
    id: '4',
    userId: 'DRV001',
    userName: 'Amit Kumar',
    userType: 'driver',
    amount: 500,
    type: 'debit',
    description: 'Withdrawal request',
    status: 'pending',
    timestamp: '2023-10-15 11:20 AM',
  },
  {
    id: '5',
    userId: 'MGR001',
    userName: 'Neha Singh',
    userType: 'hotel_manager',
    amount: 2000,
    type: 'credit',
    description: 'Hotel booking payment',
    status: 'success',
    timestamp: '2023-10-13 09:15 AM',
  },
  {
    id: '6',
    userId: 'MGR001',
    userName: 'Neha Singh',
    userType: 'hotel_manager',
    amount: 1500,
    type: 'debit',
    description: 'Withdrawal request',
    status: 'failed',
    timestamp: '2023-10-15 03:45 PM',
  },
];

const walletRules: WalletRule[] = [
  {
    id: '1',
    userType: 'Driver',
    withdrawalLimit: 5000,
    minWithdrawal: 500,
    maxWithdrawal: 10000,
    isActive: true,
  },
  {
    id: '2',
    userType: 'Bus Operator',
    withdrawalLimit: 10000,
    minWithdrawal: 1000,
    maxWithdrawal: 50000,
    isActive: true,
  },
  {
    id: '3',
    userType: 'Hotel Manager',
    withdrawalLimit: 15000,
    minWithdrawal: 2000,
    maxWithdrawal: 100000,
    isActive: true,
  },
  {
    id: '4',
    userType: 'Bike Rider',
    withdrawalLimit: 3000,
    minWithdrawal: 300,
    maxWithdrawal: 5000,
    isActive: false,
  },
];

const WalletManagement: React.FC = () => {
  const transactionColumns = [
    {
      key: 'userName',
      header: 'User Name',
      cell: (transaction: Transaction) => (
        <div className="font-medium">{transaction.userName}</div>
      ),
      sortable: true,
    },
    {
      key: 'userType',
      header: 'User Type',
      cell: (transaction: Transaction) => (
        <span className="capitalize">{transaction.userType.replace('_', ' ')}</span>
      ),
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      cell: (transaction: Transaction) => (
        <div className={`flex items-center ${
          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
        }`}>
          {transaction.type === 'credit' ? (
            <ArrowDown size={16} className="mr-1" />
          ) : (
            <ArrowUp size={16} className="mr-1" />
          )}
          ₹{transaction.amount.toFixed(2)}
        </div>
      ),
      sortable: true,
    },
    {
      key: 'type',
      header: 'Type',
      cell: (transaction: Transaction) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          transaction.type === 'credit' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-orange-100 text-orange-800'
        }`}>
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'description',
      header: 'Description',
      cell: (transaction: Transaction) => transaction.description,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (transaction: Transaction) => {
        const statusClasses = {
          success: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          failed: 'bg-red-100 text-red-800',
        };
        return (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[transaction.status]}`}>
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: 'timestamp',
      header: 'Timestamp',
      cell: (transaction: Transaction) => transaction.timestamp,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (transaction: Transaction) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <Eye size={16} />
            Details
          </Button>
        </div>
      ),
    },
  ];

  const walletRuleColumns = [
    {
      key: 'userType',
      header: 'User Type',
      cell: (rule: WalletRule) => <div className="font-medium">{rule.userType}</div>,
      sortable: true,
    },
    {
      key: 'withdrawalLimit',
      header: 'Daily Limit',
      cell: (rule: WalletRule) => `₹${rule.withdrawalLimit.toLocaleString()}`,
      sortable: true,
    },
    {
      key: 'minWithdrawal',
      header: 'Min Withdrawal',
      cell: (rule: WalletRule) => `₹${rule.minWithdrawal.toLocaleString()}`,
      sortable: true,
    },
    {
      key: 'maxWithdrawal',
      header: 'Max Withdrawal',
      cell: (rule: WalletRule) => `₹${rule.maxWithdrawal.toLocaleString()}`,
      sortable: true,
    },
    {
      key: 'isActive',
      header: 'Status',
      cell: (rule: WalletRule) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          rule.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {rule.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (rule: WalletRule) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">Edit</Button>
          <Button 
            size="sm" 
            variant="outline" 
            className={rule.isActive ? 'text-red-600' : 'text-green-600'}
          >
            {rule.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Wallet Management" 
        description="Monitor wallet transactions and set withdrawal limits" 
        icon={<Wallet size={24} />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Balance" 
          value="₹4,85,000" 
          trend="up" 
          trendValue="8.2%" 
          description="Across all user accounts" 
        />
        <StatCard 
          title="Pending Withdrawals" 
          value="₹78,500" 
          trend="up" 
          trendValue="12.5%" 
          description="Awaiting processing" 
        />
        <StatCard 
          title="Failed Transactions" 
          value="₹12,750" 
          trend="down" 
          trendValue="3.8%" 
          description="Last 30 days" 
        />
      </div>
      
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="withdrawal-rules">Withdrawal Rules</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Filters</CardTitle>
              <CardDescription>Filter transactions by different criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="User Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="driver">Driver</SelectItem>
                    <SelectItem value="hotel_manager">Hotel Manager</SelectItem>
                    <SelectItem value="bus_operator">Bus Operator</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="credit">Credit</SelectItem>
                    <SelectItem value="debit">Debit</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
          
          <DataTable 
            columns={transactionColumns} 
            data={transactions} 
            searchPlaceholder="Search transactions..." 
            allowCSVExport={true}
            allowPDFExport={true}
          />
        </TabsContent>
        
        <TabsContent value="withdrawal-rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add/Edit Withdrawal Rule</CardTitle>
              <CardDescription>Set withdrawal limits for different user types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="User Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="driver">Driver</SelectItem>
                    <SelectItem value="hotel_manager">Hotel Manager</SelectItem>
                    <SelectItem value="bus_operator">Bus Operator</SelectItem>
                    <SelectItem value="bike_rider">Bike Rider</SelectItem>
                  </SelectContent>
                </Select>
                
                <div>
                  <Input type="number" placeholder="Daily Limit (₹)" />
                </div>
                
                <div>
                  <Input type="number" placeholder="Min Withdrawal (₹)" />
                </div>
                
                <div>
                  <Input type="number" placeholder="Max Withdrawal (₹)" />
                </div>
                
                <Button>Save Rule</Button>
              </div>
            </CardContent>
          </Card>
          
          <DataTable 
            columns={walletRuleColumns} 
            data={walletRules} 
            searchPlaceholder="Search rules..." 
            allowCSVExport={true}
            allowPDFExport={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WalletManagement;
