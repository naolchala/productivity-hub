"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/ui/card";
import { Badge } from "@workspace/ui/components/ui/badge";
import { Button } from "@workspace/ui/components/ui/button";
import { MoreHorizontal, Pencil, Trash, Play, Square } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/ui/dropdown-menu";

export interface TimeEntry {
  id: string;
  taskId: string;
  taskTitle: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  status: 'running' | 'completed';
  category: string;
  tags: string[];
}

interface TimeEntryCardProps {
  entry: TimeEntry;
  onEdit: (entry: TimeEntry) => void;
  onDelete: (id: string) => void;
  onToggleTimer: (id: string) => void;
}

export function TimeEntryCard({ entry, onEdit, onDelete, onToggleTimer }: TimeEntryCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-lg font-medium">{entry.taskTitle}</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleTimer(entry.id)}
            className={entry.status === 'running' ? 'text-red-500' : 'text-green-500'}
          >
            {entry.status === 'running' ? (
              <Square className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(entry)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(entry.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 flex items-center space-x-2">
          <Badge variant={entry.status === 'running' ? 'default' : 'secondary'}>
            {entry.status}
          </Badge>
          <Badge variant="outline">
            {formatDuration(entry.duration)}
          </Badge>
          <Badge variant="outline">
            {entry.category}
          </Badge>
        </div>
        {entry.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-gray-100">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 