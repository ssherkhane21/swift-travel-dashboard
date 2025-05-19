
import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  LogOut, 
  Search, 
  ChevronDown 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </Button>
          
          <h1 className="text-xl font-semibold hidden md:block">SwiftTravel Admin</h1>
        </div>

        <div className="flex items-center space-x-2">
          {showSearch ? (
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search"
                placeholder="Search..." 
                className="w-[200px] pl-8 md:w-[300px]" 
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowSearch(true)}
              className="hidden md:flex"
            >
              <Search size={20} />
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">New booking received</span>
                    <span className="text-xs text-muted-foreground">5 minutes ago</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">New user registered</span>
                    <span className="text-xs text-muted-foreground">1 hour ago</span>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-center text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex items-center gap-2 pl-2 pr-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm hidden md:block">Admin User</span>
                <ChevronDown size={16} className="hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
