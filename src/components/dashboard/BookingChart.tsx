
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ChartFilter, TimeRange } from './ChartFilter';

interface BookingDataPoint {
  name: string;
  hotel: number;
  bus: number;
  taxi: number;
  bike: number;
}

// Sample data for the chart
const dailyData: BookingDataPoint[] = [
  { name: 'Mon', hotel: 45, bus: 32, taxi: 21, bike: 16 },
  { name: 'Tue', hotel: 52, bus: 38, taxi: 24, bike: 18 },
  { name: 'Wed', hotel: 48, bus: 40, taxi: 28, bike: 22 },
  { name: 'Thu', hotel: 61, bus: 52, taxi: 35, bike: 29 },
  { name: 'Fri', hotel: 65, bus: 58, taxi: 42, bike: 34 },
  { name: 'Sat', hotel: 78, bus: 62, taxi: 45, bike: 38 },
  { name: 'Sun', hotel: 70, bus: 55, taxi: 39, bike: 31 },
];

const weeklyData: BookingDataPoint[] = [
  { name: 'Week 1', hotel: 320, bus: 250, taxi: 180, bike: 120 },
  { name: 'Week 2', hotel: 345, bus: 270, taxi: 195, bike: 140 },
  { name: 'Week 3', hotel: 380, bus: 290, taxi: 220, bike: 160 },
  { name: 'Week 4', hotel: 420, bus: 310, taxi: 240, bike: 175 },
];

const monthlyData: BookingDataPoint[] = [
  { name: 'Jan', hotel: 1200, bus: 950, taxi: 750, bike: 500 },
  { name: 'Feb', hotel: 1150, bus: 900, taxi: 720, bike: 480 },
  { name: 'Mar', hotel: 1300, bus: 1000, taxi: 800, bike: 550 },
  { name: 'Apr', hotel: 1450, bus: 1100, taxi: 880, bike: 600 },
  { name: 'May', hotel: 1380, bus: 1050, taxi: 840, bike: 570 },
  { name: 'Jun', hotel: 1520, bus: 1200, taxi: 920, bike: 630 },
  { name: 'Jul', hotel: 1650, bus: 1280, taxi: 980, bike: 680 },
  { name: 'Aug', hotel: 1720, bus: 1350, taxi: 1050, bike: 720 },
  { name: 'Sep', hotel: 1600, bus: 1250, taxi: 950, bike: 650 },
  { name: 'Oct', hotel: 1550, bus: 1200, taxi: 920, bike: 630 },
  { name: 'Nov', hotel: 1480, bus: 1150, taxi: 880, bike: 600 },
  { name: 'Dec', hotel: 1750, bus: 1400, taxi: 1100, bike: 750 },
];

const yearlyData: BookingDataPoint[] = [
  { name: '2018', hotel: 12500, bus: 9800, taxi: 7200, bike: 4800 },
  { name: '2019', hotel: 14200, bus: 11000, taxi: 8500, bike: 6000 },
  { name: '2020', hotel: 11500, bus: 8000, taxi: 6500, bike: 4200 },
  { name: '2021', hotel: 15800, bus: 13000, taxi: 9800, bike: 7200 },
  { name: '2022', hotel: 18500, bus: 15700, taxi: 11500, bike: 8900 },
];

export const BookingChart: React.FC = () => {
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

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>Booking Overview</CardTitle>
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
            <AreaChart
              data={getData()}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorHotel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0099e6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0099e6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTaxi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBike" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={{ stroke: '#f0f0f0' }}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: '#f0f0f0' }} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="hotel"
                name="Hotel"
                stroke="#0099e6"
                fillOpacity={1}
                fill="url(#colorHotel)"
              />
              <Area
                type="monotone"
                dataKey="bus"
                name="Bus"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorBus)"
              />
              <Area
                type="monotone"
                dataKey="taxi"
                name="Taxi"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorTaxi)"
              />
              <Area
                type="monotone"
                dataKey="bike"
                name="Bike"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorBike)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
