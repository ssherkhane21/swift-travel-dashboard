
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Download } from 'lucide-react';

export type TimeRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface ChartFilterProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  allowExport?: boolean;
  onExport?: (format: 'csv' | 'pdf') => void;
  className?: string;
}

export const ChartFilter: React.FC<ChartFilterProps> = ({
  timeRange,
  onTimeRangeChange,
  allowExport = false,
  onExport,
  className,
}) => {
  const timeRangeLabels: Record<TimeRange, string> = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-2">
        <Button
          variant={timeRange === 'daily' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTimeRangeChange('daily')}
        >
          Daily
        </Button>
        <Button
          variant={timeRange === 'weekly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTimeRangeChange('weekly')}
        >
          Weekly
        </Button>
        <Button
          variant={timeRange === 'monthly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTimeRangeChange('monthly')}
        >
          Monthly
        </Button>
        <Button
          variant={timeRange === 'yearly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onTimeRangeChange('yearly')}
        >
          Yearly
        </Button>
      </div>
      
      {allowExport && onExport && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export
              <ChevronDown size={16} className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onExport('csv')}>
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport('pdf')}>
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
