
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { ChartFilter, TimeRange } from './ChartFilter';

interface RevenueDataPoint {
  name: string;
  revenue: number;
  refunds: number;
}

// Sample data for the chart
const dailyData: RevenueDataPoint[] = [
  { name: 'Mon', revenue: 4500, refunds: 450 },
  { name: 'Tue', revenue: 5200, refunds: 320 },
  { name: 'Wed', revenue: 4800, refunds: 380 },
  { name: 'Thu', revenue: 6100, refunds: 410 },
  { name: 'Fri', revenue: 6500, refunds: 380 },
  { name: 'Sat', revenue: 7800, refunds: 520 },
  { name: 'Sun', revenue: 7000, refunds: 480 },
];

const weeklyData: RevenueDataPoint[] = [
  { name: 'Week 1', revenue: 32000, refunds: 2500 },
  { name: 'Week 2', revenue: 34500, refunds: 2700 },
  { name: 'Week 3', revenue: 38000, refunds: 3100 },
  { name: 'Week 4', revenue: 42000, refunds: 3400 },
];

const monthlyData: RevenueDataPoint[] = [
  { name: 'Jan', revenue: 120000, refunds: 8500 },
  { name: 'Feb', revenue: 115000, refunds: 7800 },
  { name: 'Mar', revenue: 130000, refunds: 9200 },
  { name: 'Apr', revenue: 145000, refunds: 10500 },
  { name: 'May', revenue: 138000, refunds: 9800 },
  { name: 'Jun', revenue: 152000, refunds: 11200 },
  { name: 'Jul', revenue: 165000, refunds: 12500 },
  { name: 'Aug', revenue: 172000, refunds: 13200 },
  { name: 'Sep', revenue: 160000, refunds: 12000 },
  { name: 'Oct', revenue: 155000, refunds: 11500 },
  { name: 'Nov', revenue: 148000, refunds: 10800 },
  { name: 'Dec', revenue: 175000, refunds: 13500 },
];

const yearlyData: RevenueDataPoint[] = [
  { name: '2018', revenue: 1250000, refunds: 85000 },
  { name: '2019', revenue: 1420000, refunds: 95000 },
  { name: '2020', revenue: 1150000, refunds: 78000 },
  { name: '2021', revenue: 1580000, refunds: 110000 },
  { name: '2022', revenue: 1850000, refunds: 135000 },
];

export const RevenueChart: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('monthly');

  // Select data based on time range
  const getData = () => {
    switch (timeRange) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      case 'yearly':
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Exporting chart as ${format}...`);
    // Implementation for export functionality
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>Revenue Overview</CardTitle>
        <ChartFilter 
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          allowExport={true}
          onExport={handleExport}
        />
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getData()}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={formatCurrency} 
                tick={{ fontSize: 12 }} 
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), ""]} 
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="revenue" 
                name="Revenue" 
                fill="#0099e6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="refunds" 
                name="Refunds" 
                fill="#f59e0b" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
