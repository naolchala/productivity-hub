'use client';

import React, { useState, useEffect } from "react";
import { CalendarIcon, Clock, MapPin, Users, Tag, Type, StickyNote } from "lucide-react";
import { Button } from "@workspace/ui/components/ui/button";
import { Input } from "@workspace/ui/components/ui/input";
import { Textarea } from "@workspace/ui/components/ui/textarea";
import { Checkbox } from "@workspace/ui/components/ui/checkbox";
import { Label } from "@workspace/ui/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/ui/popover";
import { Calendar } from "@workspace/ui/components/ui/calendar";
import { cn } from "@workspace/ui/lib/utils";
import { format } from "date-fns";
import type { CalendarEvent } from "../types/event.js";

interface EventFormProps {
  onSubmit: (data: Omit<CalendarEvent, "id">) => void;
  initialData?: Partial<CalendarEvent>;
  onCancel?: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [start, setStart] = useState<Date | undefined>(initialData?.start ? new Date(initialData.start) : new Date());
  const [startTime, setStartTime] = useState(initialData?.start ? format(new Date(initialData.start), "HH:mm") : format(new Date(), "HH:mm"));
  const [end, setEnd] = useState<Date | undefined>(initialData?.end ? new Date(initialData.end) : new Date(new Date().setHours(new Date().getHours() + 1)));
  const [endTime, setEndTime] = useState(initialData?.end ? format(new Date(initialData.end), "HH:mm") : format(new Date(new Date().setHours(new Date().getHours() + 1)), "HH:mm"));
  const [allDay, setAllDay] = useState(initialData?.allDay || false);
  const [location, setLocation] = useState(initialData?.location || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [attendeesStr, setAttendeesStr] = useState((initialData?.attendees || []).join(", "));
  const [tagsStr, setTagsStr] = useState((initialData?.tags || []).join(", "));

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStart(initialData.start ? new Date(initialData.start) : new Date());
      setStartTime(initialData.start ? format(new Date(initialData.start), "HH:mm") : format(new Date(), "HH:mm"));
      setEnd(initialData.end ? new Date(initialData.end) : new Date(new Date().setHours(new Date().getHours() + 1)));
      setEndTime(initialData.end ? format(new Date(initialData.end), "HH:mm") : format(new Date(new Date().setHours(new Date().getHours() + 1)), "HH:mm"));
      setAllDay(initialData.allDay || false);
      setLocation(initialData.location || "");
      setCategory(initialData.category || "");
      setAttendeesStr((initialData.attendees || []).join(", "));
      setTagsStr((initialData.tags || []).join(", "));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!start || !end) {
      alert("Please select start and end dates.");
      return;
    }

    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const finalStart = new Date(start.getFullYear(), start.getMonth(), start.getDate(), startHours, startMinutes);

    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const finalEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate(), endHours, endMinutes);

    if (finalEnd <= finalStart && !allDay) {
      alert("End time must be after start time.");
      return;
    }

    onSubmit({
      title,
      description,
      start: finalStart,
      end: allDay ? new Date(finalStart.getFullYear(), finalStart.getMonth(), finalStart.getDate(), 23, 59, 59) : finalEnd,
      allDay,
      location,
      category,
      attendees: attendeesStr ? attendeesStr.split(",").map(s => s.trim()).filter(s => s) : [],
      tags: tagsStr ? tagsStr.split(",").map(s => s.trim()).filter(s => s) : [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="flex items-center"><Type className="mr-2 h-4 w-4" />Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate" className="flex items-center"><CalendarIcon className="mr-2 h-4 w-4" />Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !start && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {start ? format(start, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={start} onSelect={setStart} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startTime" className="flex items-center"><Clock className="mr-2 h-4 w-4" />Start Time</Label>
          <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} disabled={allDay} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="endDate" className="flex items-center"><CalendarIcon className="mr-2 h-4 w-4" />End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !end && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {end ? format(end, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={end} onSelect={setEnd} initialFocus disabled={(date) => start ? date < start : false} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime" className="flex items-center"><Clock className="mr-2 h-4 w-4" />End Time</Label>
          <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} disabled={allDay} />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="allDay" checked={allDay} onCheckedChange={(checked) => setAllDay(Boolean(checked))} />
        <Label htmlFor="allDay" className="font-normal">
          All-day event
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="flex items-center"><StickyNote className="mr-2 h-4 w-4" />Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event details..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center"><MapPin className="mr-2 h-4 w-4" />Location (optional)</Label>
        <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Conference Room A / Zoom Link" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="flex items-center"><Tag className="mr-2 h-4 w-4" />Category (optional)</Label>
        <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Work, Personal, Meeting" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="attendees" className="flex items-center"><Users className="mr-2 h-4 w-4" />Attendees (comma-separated, optional)</Label>
        <Input id="attendees" value={attendeesStr} onChange={(e) => setAttendeesStr(e.target.value)} placeholder="e.g., user1@example.com, user2@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags" className="flex items-center"><Tag className="mr-2 h-4 w-4" />Tags (comma-separated, optional)</Label>
        <Input id="tags" value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} placeholder="e.g., project-x, urgent, team-sync" />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{initialData ? "Save Changes" : "Create Event"}</Button>
      </div>
    </form>
  );
}; 