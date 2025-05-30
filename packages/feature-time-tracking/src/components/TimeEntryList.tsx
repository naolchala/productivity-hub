"use client";

import { useState } from "react";
import { TimeEntry, TimeEntryCard } from "./TimeEntryCard.js";
import { Button } from "@workspace/ui/components/ui/button";
import { Plus } from "lucide-react";
import { TimeEntryForm } from "./TimeEntryForm.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/ui/select";

interface TimeEntryListProps {
  entries: TimeEntry[];
  onEntryCreate: (entry: Omit<TimeEntry, "id" | "startTime" | "endTime" | "duration" | "status">) => void;
  onEntryUpdate: (entry: TimeEntry) => void;
  onEntryDelete: (id: string) => void;
  onEntryToggleTimer: (id: string) => void;
  availableTasks: { id: string; title: string }[];
}

export function TimeEntryList({
  entries,
  onEntryCreate,
  onEntryUpdate,
  onEntryDelete,
  onEntryToggleTimer,
  availableTasks,
}: TimeEntryListProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | undefined>();
  const [filter, setFilter] = useState<"all" | "running" | "completed">("all");
  const [sortBy, setSortBy] = useState<"duration" | "startTime">("startTime");

  const filteredEntries = entries
    .filter((entry) => {
      if (filter === "running") return entry.status === "running";
      if (filter === "completed") return entry.status === "completed";
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "duration") {
        return b.duration - a.duration;
      }
      if (sortBy === "startTime") {
        return b.startTime.getTime() - a.startTime.getTime();
      }
      return 0;
    });

  const handleCreateEntry = (values: any) => {
    onEntryCreate({
      ...values,
      tags: values.tags ? values.tags.split(",").map((tag: string) => tag.trim()) : [],
    });
    setIsCreateDialogOpen(false);
  };

  const handleUpdateEntry = (values: any) => {
    if (editingEntry) {
      onEntryUpdate({
        ...editingEntry,
        ...values,
        tags: values.tags ? values.tags.split(",").map((tag: string) => tag.trim()) : [],
      });
      setEditingEntry(undefined);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter entries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entries</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="duration">Sort by Duration</SelectItem>
              <SelectItem value="startTime">Sort by Start Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Time Entry
        </Button>
      </div>

      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <TimeEntryCard
            key={entry.id}
            entry={entry}
            onToggleTimer={onEntryToggleTimer}
            onEdit={setEditingEntry}
            onDelete={onEntryDelete}
          />
        ))}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Time Tracking</DialogTitle>
          </DialogHeader>
          <TimeEntryForm
            onSubmit={handleCreateEntry}
            onCancel={() => setIsCreateDialogOpen(false)}
            availableTasks={availableTasks}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingEntry} onOpenChange={() => setEditingEntry(undefined)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Time Entry</DialogTitle>
          </DialogHeader>
          {editingEntry && (
            <TimeEntryForm
              entry={editingEntry}
              onSubmit={handleUpdateEntry}
              onCancel={() => setEditingEntry(undefined)}
              availableTasks={availableTasks}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 