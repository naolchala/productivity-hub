"use client";

import "@workspace/feature-tasks/styles/globals.css";
import { TaskList } from "../components/TaskList.js";
import { Task } from "../components/TaskCard.js";
import { useState } from "react";

export default function DashboardPage() {
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: "1",
			title: "Complete project documentation",
			description: "Write comprehensive documentation for the new features",
			completed: false,
			priority: "high",
			dueDate: new Date("2024-03-20"),
		},
		{
			id: "2",
			title: "Review pull requests",
			description: "Review and provide feedback on team PRs",
			completed: true,
			priority: "medium",
			dueDate: new Date("2024-03-18"),
		},
		{
			id: "3",
			title: "Update dependencies",
			description: "Update project dependencies to latest versions",
			completed: false,
			priority: "low",
		},
	]);

	const handleCreateTask = (newTask: Omit<Task, "id">) => {
		setTasks((prev) => [
			...prev,
			{
				...newTask,
				id: Math.random().toString(36).substr(2, 9),
			},
		]);
	};

	const handleUpdateTask = (updatedTask: Task) => {
		setTasks((prev) =>
			prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
		);
	};

	const handleDeleteTask = (id: string) => {
		setTasks((prev) => prev.filter((task) => task.id !== id));
	};

	const handleToggleComplete = (id: string) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-4xl">
				<h1 className="mb-8 text-3xl font-bold">Task Management</h1>
				<TaskList
					tasks={tasks}
					onTaskCreate={handleCreateTask}
					onTaskUpdate={handleUpdateTask}
					onTaskDelete={handleDeleteTask}
					onTaskToggleComplete={handleToggleComplete}
				/>
			</div>
		</div>
	);
}
