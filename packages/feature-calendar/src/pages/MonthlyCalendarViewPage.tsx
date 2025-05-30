"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { CalendarDays, ListChecks, Plus, Search } from "lucide-react";
import { Button } from "@workspace/ui/components/ui/button";
import { Input } from "@workspace/ui/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/ui/dialog";
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale";
import { useEvents } from "../hooks/useEvents.js";
import type { CalendarEvent } from "../types/event.js";
import { EventForm } from "../components/EventForm.js";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@workspace/feature-calendar/styles/globals.css";
import { CalendarPageHeader } from '../components/CalendarPageHeader.js';
import { CalendarStats } from '../components/CalendarStats.js';
import { CalendarFilters } from '../components/CalendarFilters.js';
import { CalendarDisplay } from '../components/CalendarDisplay.js';

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MonthlyCalendarViewPage = () => {
  const router = useRouter();
  const { events, loading, filters, setFilters, addEvent } = useEvents();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleCreateEvent = (eventData: Omit<CalendarEvent, "id">) => {
    addEvent(eventData);
    setIsCreateDialogOpen(false);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    router.push(`/calendar/event/${event.id}`);
  };

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleSelectSlot = (/* slotInfo: SlotInfo */) => {
    // Potentially pre-fill dates in EventForm based on slotInfo
    setIsCreateDialogOpen(true);
  };

  // Calculate stats (could be memoized with useMemo if complex)
  const stats = {
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.start > new Date() && e.start < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length,
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Loading calendar...</p>
        {/* You could add a spinner component here */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <CalendarPageHeader
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        handleCreateEvent={handleCreateEvent}
        title="Monthly Calendar"
        description="View and manage your events."
      />

      <CalendarStats 
        totalEvents={stats.totalEvents} 
        upcomingEvents={stats.upcomingEvents} 
      />

      <CalendarFilters 
        searchTerm={filters.searchTerm}
        onSearchTermChange={(term) => setFilters({ ...filters, searchTerm: term })}
      />

      <CalendarDisplay
        events={events}
        currentDate={currentDate}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default MonthlyCalendarViewPage;
