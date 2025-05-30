"use client";

import { useState } from "react";
import { TimeEntryList } from "../components/TimeEntryList.js";
import { TimeEntry } from "../components/TimeEntryCard.js";

export default function DashboardPage() {
	const [entries, setEntries] = useState<TimeEntry[]>([
		{
			id: "1",
			taskId: "1",
			taskTitle: "Implement authentication",
			startTime: new Date("2024-03-01T10:00:00"),
			endTime: new Date("2024-03-01T12:30:00"),
			duration: 150,
			status: "completed",
			category: "Development",
			tags: ["frontend", "auth"],
		},
		{
			id: "2",
			taskId: "2",
			taskTitle: "Design dashboard",
			startTime: new Date("2024-03-02T09:00:00"),
			endTime: new Date("2024-03-02T11:45:00"),
			duration: 165,
			status: "completed",
			category: "Design",
			tags: ["ui", "ux"],
		},
	]);

	// Mock available tasks - replace with actual tasks from your task management system
	const availableTasks = [
		{ id: "1", title: "Implement authentication" },
		{ id: "2", title: "Design dashboard" },
		{ id: "3", title: "Write documentation" },
	];

	const handleCreateEntry = (newEntry: Omit<TimeEntry, "id" | "startTime" | "endTime" | "duration" | "status">) => {
		const task = availableTasks.find(t => t.id === newEntry.taskId);
		if (!task) return;

		setEntries((prev) => [
			...prev,
			{
				...newEntry,
				id: Math.random().toString(36).substr(2, 9),
				startTime: new Date(),
				status: "running",
				duration: 0,
			},
		]);
	};

	const handleUpdateEntry = (updatedEntry: TimeEntry) => {
		setEntries((prev) =>
			prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
		);
	};

	const handleDeleteEntry = (id: string) => {
		setEntries((prev) => prev.filter((entry) => entry.id !== id));
	};

	const handleToggleTimer = (id: string) => {
		setEntries((prev) =>
			prev.map((entry) => {
				if (entry.id !== id) return entry;

				if (entry.status === "running") {
					const endTime = new Date();
					const duration = Math.floor(
						(endTime.getTime() - entry.startTime.getTime()) / (1000 * 60)
					);
					return {
						...entry,
						status: "completed",
						endTime,
						duration,
					};
				} else {
					return {
						...entry,
						status: "running",
						startTime: new Date(),
						endTime: undefined,
						duration: 0,
					};
				}
			})
		);
	};

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-4xl">
				<h1 className="mb-8 text-3xl font-bold">Time Tracking</h1>
				<TimeEntryList
					entries={entries}
					onEntryCreate={handleCreateEntry}
					onEntryUpdate={handleUpdateEntry}
					onEntryDelete={handleDeleteEntry}
					onEntryToggleTimer={handleToggleTimer}
					availableTasks={availableTasks}
				/>
			</div>
		</div>
	);
}

