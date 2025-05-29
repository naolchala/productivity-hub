'use client';

import React from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views, SlotInfo } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns'; // Assuming these are the specific functions needed
import { enUS } from 'date-fns/locale'; // Corrected import path
import type { CalendarEvent } from '../types/event.js';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card } from '@workspace/ui/components/ui/card';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarDisplayProps {
  events: CalendarEvent[];
  currentDate: Date;
  onSelectEvent: (event: CalendarEvent) => void;
  onSelectSlot: (slotInfo: SlotInfo) => void; // SlotInfo type from react-big-calendar
  onNavigate: (newDate: Date) => void;
}

export const CalendarDisplay: React.FC<CalendarDisplayProps> = ({
  events,
  currentDate,
  onSelectEvent,
  onSelectSlot,
  onNavigate,
}) => {
  return (
    <Card className="h-[700px] p-4">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: "100%" }}
        selectable
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        defaultView={Views.MONTH}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        date={currentDate}
        onNavigate={onNavigate}
      />
    </Card>
  );
}; 