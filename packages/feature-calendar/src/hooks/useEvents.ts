import { useState, useEffect, useCallback } from "react";
import type { CalendarEvent } from "../types/event.js";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const LOCAL_STORAGE_KEY = "calendarEvents";

// Helper to get initial events from localStorage or use a default set
const getInitialEvents = (): CalendarEvent[] => {
  if (typeof window === "undefined") return []; // Guard for SSR
  try {
    const storedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedEvents) {
      return JSON.parse(storedEvents).map((event: any) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
    }
  } catch (error) {
    console.error("Error parsing events from localStorage:", error);
    // Fallback to default if parsing fails
  }
  // Default initial events if nothing in localStorage or an error occurs
  const today = new Date();
  return [
    {
      id: uuidv4(),
      title: "Team Standup",
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30, 0),
      category: "Work",
    },
    {
      id: uuidv4(),
      title: "Client Call - Project Phoenix",
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0, 0),
      description: "Discuss milestone 2 deliverables.",
      location: "Zoom Link",
      category: "Client",
    },
    {
      id: uuidv4(),
      title: "Dentist Appointment",
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 0, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 45, 0),
      category: "Health",
      allDay: false,
    },
  ];
};

export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(getInitialEvents);
  const [loading, setLoading] = useState(true); // Simulate loading
  const [filters, setFilters] = useState({ searchTerm: "", viewType: "month" });

  useEffect(() => {
    // Simulate async loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Persist events to localStorage whenever they change
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    }
  }, [events]);

  const addEvent = useCallback((eventData: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = { ...eventData, id: uuidv4() };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  }, []);

  const updateEvent = useCallback((id: string, updatedData: Partial<Omit<CalendarEvent, "id">>) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, ...updatedData } : event
      )
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  }, []);

  const findEventById = useCallback(
    (id: string): CalendarEvent | undefined => {
      return events.find((event) => event.id === id);
    },
    [events]
  );

  // Add more complex filtering logic here if needed based on filters state
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
    // Potentially filter by date range depending on viewType in a real scenario
  );

  return {
    events: filteredEvents,
    allEvents: events, // To get unfiltered events if needed
    loading,
    filters,
    setFilters,
    addEvent,
    updateEvent,
    deleteEvent,
    findEventById,
  };
}; 