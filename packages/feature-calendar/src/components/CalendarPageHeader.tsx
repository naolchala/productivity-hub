'use client';

import React from 'react';
import { CalendarDays, Plus } from 'lucide-react';
import { Button } from '@workspace/ui/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/ui/dialog';
import { EventForm } from './EventForm.js'; // Assuming EventForm is in the same directory or adjust path
import type { CalendarEvent } from '../types/event.js';

interface CalendarPageHeaderProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (isOpen: boolean) => void;
  handleCreateEvent: (eventData: Omit<CalendarEvent, 'id'>) => void;
  title: string;
  description: string;
}

export const CalendarPageHeader: React.FC<CalendarPageHeaderProps> = ({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  handleCreateEvent,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <CalendarDays className="mr-3 h-8 w-8 text-primary" />
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>Add a new event to your calendar.</DialogDescription>
          </DialogHeader>
          <EventForm onSubmit={handleCreateEvent} onCancel={() => setIsCreateDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}; 