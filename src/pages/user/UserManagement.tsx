import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { UserCog, Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { StatusBadge } from '@/components/common/StatusBadge';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'subadmin' | 'manager';
  status: 'approved' | 'pending' | 'rejected' | 'submitted' | 'blocked';
  lastLogin: string;
}

// Sample data
const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@swifttravel.com',
    role: 'admin',
    status: 'approved',
    lastLogin: '2023-10-15 10:30 AM',
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@swifttravel.com',
    role: 'manager',
    status: 'approved',
    lastLogin: '2023-10-14 02:45 PM',
  },
  {
    id: '3',
    name: 'Subadmin User',
    email: 'subadmin@swifttravel.com',
    role: 'subadmin',
    status: 'rejected',
    lastLogin: '2023-10-10 09:15 AM',
  },
];

const UserManagement: React.FC = () => {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      cell: (user: User) => <div className="font-medium">{user.name}</div>,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      cell: (user: User) => user.email,
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      cell: (user: User) => <span className="capitalize">{user.role}</span>,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (user: User) => <StatusBadge status={user.status} />,
      sortable: true,
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      cell: (user: User) => user.lastLogin,
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (user: User) => (
        <Link to={`/user-management/users/${user.id}`}>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <Eye size={16} />
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="User Management" 
          description="Manage role-based admin users" 
          icon={<UserCog size={24} />}
        />
        <Link to="/user-management/add-user">
          <Button className="flex items-center gap-1">
            <Plus size={16} />
            Add User
          </Button>
        </Link>
      </div>
      
      <DataTable 
        columns={columns} 
        data={users} 
        searchPlaceholder="Search users..." 
        allowCSVExport={true}
        allowPDFExport={true}
      />
    </div>
  );
};

export default UserManagement;
