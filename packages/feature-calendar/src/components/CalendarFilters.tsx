'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@workspace/ui/components/ui/input';

interface CalendarFiltersProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  // Add other filter props and handlers (e.g., view switcher, date range)
}

export const CalendarFilters: React.FC<CalendarFiltersProps> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search events by title..."
          className="pl-8 w-full"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      {/* Add other filter controls here */}
    </div>
  );
}; 