export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  location?: string;
  attendees?: string[];
  tags?: string[];
  category?: string; // e.g., 'Work', 'Personal', 'Holiday'
  // Add any other fields relevant to your calendar events
} 