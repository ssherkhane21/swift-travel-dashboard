
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Bus, 
  Hotel, 
  Car, 
  Bike, 
  Users, 
  UserCog, 
  Percent, 
  Wallet, 
  Bell, 
  Tag,
  Menu,
  X
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isCollapsed?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isActive, isCollapsed }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 mb-1 transition-colors rounded-md ${
        isActive
          ? 'bg-sidebar-accent text-sidebar-primary-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary-foreground'
      }`}
    >
      <Icon className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`} size={20} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const NavGroup: React.FC<{ title: string; children: React.ReactNode; isCollapsed?: boolean }> = ({ 
  title, 
  children, 
  isCollapsed 
}) => {
  return (
    <div className="mb-6">
      {!isCollapsed && (
        <h3 className="px-4 mb-2 text-xs font-semibold text-sidebar-foreground/70 uppercase">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-sidebar-DEFAULT transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 text-sidebar-foreground">
          <div className="flex items-center">
            <span className="text-xl font-bold">SwiftTravel</span>
          </div>
          <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-md lg:hidden hover:bg-sidebar-accent"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-3 py-4 overflow-y-auto scrollbar-hide">
          <NavGroup title="Core">
            <NavItem to="/" icon={Home} label="Dashboard" isActive={isActive('/')} />
          </NavGroup>

          <NavGroup title="Transportation">
            <NavItem to="/bus-management" icon={Bus} label="Bus Management" isActive={isActive('/bus-management')} />
            <NavItem to="/hotel-management" icon={Hotel} label="Hotel Management" isActive={isActive('/hotel-management')} />
            <NavItem to="/taxi-management" icon={Car} label="Taxi Management" isActive={isActive('/taxi-management')} />
            <NavItem to="/bike-management" icon={Bike} label="Bike Management" isActive={isActive('/bike-management')} />
          </NavGroup>

          <NavGroup title="Users">
            <NavItem to="/customer-management" icon={Users} label="Customer Management" isActive={isActive('/customer-management')} />
            <NavItem to="/user-management" icon={UserCog} label="User Management" isActive={isActive('/user-management')} />
          </NavGroup>

          <NavGroup title="Finance">
            <NavItem to="/commission-management" icon={Percent} label="Commission Management" isActive={isActive('/commission-management')} />
            <NavItem to="/coupons" icon={Tag} label="Coupons" isActive={isActive('/coupons')} />
            <NavItem to="/wallet" icon={Wallet} label="Wallet Management" isActive={isActive('/wallet')} />
          </NavGroup>

          <NavGroup title="Communications">
            <NavItem to="/notifications" icon={Bell} label="Notifications & Alerts" isActive={isActive('/notifications')} />
          </NavGroup>
        </div>
      </aside>
    </>
  );
};
