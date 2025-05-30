"use client";

import { Button } from "@workspace/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/ui/form";
import { Input } from "@workspace/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TimeEntry } from "./TimeEntryCard.js";

const timeEntryFormSchema = z.object({
  taskId: z.string().min(1, "Task is required"),
  taskTitle: z.string().min(1, "Task title is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
});

type TimeEntryFormValues = z.infer<typeof timeEntryFormSchema>;

interface TimeEntryFormProps {
  entry?: TimeEntry;
  onSubmit: (values: TimeEntryFormValues) => void;
  onCancel: () => void;
  availableTasks: { id: string; title: string }[];
}

export function TimeEntryForm({ entry, onSubmit, onCancel, availableTasks }: TimeEntryFormProps) {
  const form = useForm<TimeEntryFormValues>({
    resolver: zodResolver(timeEntryFormSchema),
    defaultValues: {
      taskId: entry?.taskId || "",
      taskTitle: entry?.taskTitle || "",
      category: entry?.category || "",
      tags: entry?.tags.join(", ") || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="taskId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select task" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableTasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="Enter tags" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {entry ? "Update Entry" : "Start Tracking"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 