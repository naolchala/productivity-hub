'use client';

import React from 'react';
import { CalendarDays, ListChecks } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';

interface CalendarStatsProps {
  totalEvents: number;
  upcomingEvents: number;
  // Add more stats as needed
}

export const CalendarStats: React.FC<CalendarStatsProps> = ({ totalEvents, upcomingEvents }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEvents}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming (Next 7 Days)</CardTitle>
          <ListChecks className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingEvents}</div>
        </CardContent>
      </Card>
      {/* Add more stats cards here */}
    </div>
  );
}; 