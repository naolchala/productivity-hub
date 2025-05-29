"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ListFilter, Search, ArrowUpDown, Clock } from "lucide-react";
import { Button } from "@workspace/ui/components/ui/button";
import { Input } from "@workspace/ui/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/ui/select";
import { Badge } from "@workspace/ui/components/ui/badge";
import { Separator } from "@workspace/ui/components/ui/separator";
import { useEvents } from "../hooks/useEvents.js";
import type { CalendarEvent } from "../types/event.js";
import "@workspace/feature-calendar/styles/globals.css";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays } from "date-fns";

const AgendaListViewPage = () => {
  const router = useRouter();
  const { events: allEvents, loading } = useEvents(); // Using allEvents from the hook as the base
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRangeOption, setDateRangeOption] = useState("this_week"); // 'today', 'this_week', 'this_month'
  const [sortBy, setSortBy] = useState("startTime_asc"); // 'startTime_asc', 'startTime_desc'

  const getDateRange = () => {
    const now = new Date();
    switch (dateRangeOption) {
      case "today":
        return { start: startOfDay(now), end: endOfDay(now) };
      case "this_week":
        return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
      case "this_month":
        return { start: startOfMonth(now), end: endOfMonth(now) };
      default:
        return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) }; // Default to this week
    }
  };

  const filteredAndSortedEvents = useMemo(() => {
    const { start: rangeStart, end: rangeEnd } = getDateRange();

    return allEvents
      .filter(event => {
        const eventStart = event.start; // Already a Date object from useEvents
        const titleMatch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        const dateMatch = eventStart >= rangeStart && eventStart <= rangeEnd;
        return titleMatch && dateMatch;
      })
      .sort((a, b) => {
        if (sortBy === "startTime_asc") return a.start.getTime() - b.start.getTime();
        if (sortBy === "startTime_desc") return b.start.getTime() - a.start.getTime();
        return 0;
      });
  }, [allEvents, searchTerm, dateRangeOption, sortBy]);

  const formatEventTime = (date: Date, allDay?: boolean) => {
    if (allDay) return "All Day";
    return format(date, "p"); // e.g., 12:00 PM
  };

  const groupEventsByDay = (eventsToGroup: CalendarEvent[]) => {
    const grouped: { [key: string]: CalendarEvent[] } = {};
    eventsToGroup.forEach(event => {
      const dayKey = format(event.start, "PPPP"); // e.g., Monday, July 29th, 2024
      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }
      grouped[dayKey].push(event);
    });
    return grouped;
  };

  const eventsGroupedByDay = groupEventsByDay(filteredAndSortedEvents);

  if (loading) {
    return <div className="container mx-auto p-6 text-center"><p>Loading agenda...</p></div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <ListFilter className="mr-3 h-8 w-8 text-primary" />
            Agenda View
          </h1>
          <p className="text-muted-foreground">
            Your events in a chronological list.
          </p>
        </div>
        {/* Optional: Button to switch views or create event */}
      </div>

      {/* Filters and Sort Controls */}
      <Card className="mb-8">
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={dateRangeOption} onValueChange={setDateRangeOption}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setSortBy(prev => prev === "startTime_asc" ? "startTime_desc" : "startTime_asc")}
            className="w-full md:w-auto flex-shrink-0">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort ({sortBy.includes('asc') ? "Oldest First" : "Newest First"})
          </Button>
        </CardContent>
      </Card>

      {/* Agenda List */}
      {Object.keys(eventsGroupedByDay).length > 0 ? (
        Object.entries(eventsGroupedByDay).map(([day, dayEvents]) => (
          <div key={day} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-muted-foreground" />
              {day}
            </h2>
            <ul className="space-y-4">
              {dayEvents.map((event) => (
                <li key={event.id}>
                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push(`/calendar/event/${event.id}`)}
                  >
                    <CardContent className="p-4 flex flex-col sm:flex-row items-start gap-4">
                      <div className="flex sm:flex-col items-center sm:justify-center pt-1 sm:w-28 text-center">
                        <Clock className="h-5 w-5 text-primary mb-0 sm:mb-1 mr-2 sm:mr-0" />
                        <div className="flex flex-row sm:flex-col">
                          <span className="text-sm font-medium whitespace-nowrap">
                            {formatEventTime(event.start, event.allDay)}
                          </span>
                          {!event.allDay && (
                            <span className="text-xs text-muted-foreground whitespace-nowrap mx-1 sm:mx-0">
                              - {formatEventTime(event.end)}
                            </span>
                          )}
                        </div>
                      </div>
                      <Separator orientation="vertical" className="h-auto hidden sm:block" />
                      <Separator orientation="horizontal" className="w-full my-2 sm:hidden" />
                      <div className="flex-grow">
                        <CardTitle className="text-lg mb-1 hover:text-primary transition-colors">{event.title}</CardTitle>
                        {event.description && (
                          <p className="text-sm text-muted-foreground truncate max-w-md mb-1">
                            {event.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {event.category && (
                            <Badge variant="outline" className="text-xs">
                              {event.category}
                            </Badge>
                          )}
                          {event.tags && event.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <Card className="min-h-[200px]">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Events</h3>
            <p className="text-sm text-muted-foreground">
              There are no events for the selected criteria.
              {searchTerm && " Try adjusting your search term."}
              {!searchTerm && " Try a different date range or add new events!"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgendaListViewPage; 