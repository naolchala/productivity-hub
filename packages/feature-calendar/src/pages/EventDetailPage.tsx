"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit3, Trash2, Users, Tag, Clock, AlignLeft, Paperclip, MapPin } from "lucide-react";
import { Button } from "@workspace/ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/ui/card";
import { Badge } from "@workspace/ui/components/ui/badge";
import { Separator } from "@workspace/ui/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@workspace/ui/components/ui/dialog";
import { useEvents } from "../hooks/useEvents.js";
import type { CalendarEvent } from "../types/event.js";
import { EventForm } from "../components/EventForm.js";
import "@workspace/feature-calendar/styles/globals.css";

const EventDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;
  const { findEventById, updateEvent, deleteEvent, loading } = useEvents();

  const [event, setEvent] = useState<CalendarEvent | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (eventId && !loading) { // Ensure events are loaded before finding
      const foundEvent = findEventById(eventId);
      setEvent(foundEvent || null);
    }
  }, [eventId, findEventById, loading]);

  const handleUpdateEvent = (data: Omit<CalendarEvent, "id">) => {
    if (event) {
      updateEvent(event.id, data);
      setEvent({ ...event, ...data }); // Update local state immediately
      setIsEditing(false);
    }
  };

  const handleDeleteEvent = () => {
    if (event && window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(event.id);
      router.push("/calendar");
    }
  };

  const formatDateRange = (start: Date, end: Date, allDay?: boolean) => {
    const startDateStr = start.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
    if (allDay) return startDateStr + " (All day)";
    const startTimeStr = start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const endTimeStr = end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const endDateStr = end.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });

    if (startDateStr === endDateStr) {
      return `${startDateStr}, ${startTimeStr} - ${endTimeStr}`;
    }
    return `${startDateStr}, ${startTimeStr} - ${endDateStr}, ${endTimeStr}`;
  };

  if (loading) {
    return <div className="container mx-auto p-6 text-center"><p>Loading event details...</p></div>;
  }

  if (!event) {
    return <div className="container mx-auto p-6 text-center"><p>Event not found.</p></div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Button variant="outline" onClick={() => router.back()} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit3 className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="destructive" onClick={handleDeleteEvent}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/30 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl lg:text-3xl font-bold mb-1">{event.title}</CardTitle>
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {event.category && (
              <Badge variant="default" className="text-sm whitespace-nowrap">
                {event.category}
              </Badge>
            )}
          </div>
          <CardDescription className="flex items-center text-base text-muted-foreground mt-2">
            <Clock className="mr-2 h-5 w-5" />
            <span>{formatDateRange(event.start, event.end, event.allDay)}</span>
          </CardDescription>
          {event.location && (
            <CardDescription className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {event.description && (
            <section>
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <AlignLeft className="mr-2 h-5 w-5 text-primary" /> Description
              </h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {event.description}
              </p>
            </section>
          )}

          {event.attendees && event.attendees.length > 0 && (
            <section>
              <Separator className="my-4" />
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" /> Attendees ({event.attendees.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {event.attendees.map((attendee) => (
                  <Badge key={attendee} variant="outline" className="py-1 px-2">
                    {attendee}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {/* Placeholder for Attachments, could be implemented similarly if needed */}
          {/* {event.attachments && event.attachments.length > 0 && ( ... )} */}
          
        </CardContent>
      </Card>
      
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Make changes to your event details.</DialogDescription>
          </DialogHeader>
          {event && ( // Ensure event data is available before rendering form
            <EventForm 
              onSubmit={handleUpdateEvent} 
              initialData={event} 
              onCancel={() => setIsEditing(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetailPage; 