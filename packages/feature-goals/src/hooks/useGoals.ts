"use client";

import { useState, useEffect } from "react";
import type { Goal, Milestone, GoalFilters } from "../types/goal";

// Mock data for demonstration
const mockGoals: Goal[] = [
	{
		id: "1",
		title: "Learn TypeScript",
		description: "Master TypeScript fundamentals and advanced concepts",
		category: "learning",
		priority: "high",
		status: "in-progress",
		startDate: new Date("2024-01-01"),
		targetDate: new Date("2024-06-01"),
		progress: 65,
		milestones: [
			{
				id: "m1",
				goalId: "1",
				title: "Complete TypeScript basics",
				targetDate: new Date("2024-02-15"),
				completedDate: new Date("2024-02-10"),
				isCompleted: true,
				order: 1,
			},
			{
				id: "m2",
				goalId: "1",
				title: "Build a TypeScript project",
				targetDate: new Date("2024-04-01"),
				isCompleted: false,
				order: 2,
			},
		],
		tags: ["programming", "typescript", "development"],
		createdAt: new Date("2024-01-01"),
		updatedAt: new Date("2024-03-15"),
	},
	{
		id: "2",
		title: "Run a Marathon",
		description: "Complete a full 26.2 mile marathon race",
		category: "health",
		priority: "medium",
		status: "in-progress",
		startDate: new Date("2024-02-01"),
		targetDate: new Date("2024-10-15"),
		progress: 30,
		milestones: [
			{
				id: "m3",
				goalId: "2",
				title: "Run 5K consistently",
				targetDate: new Date("2024-03-01"),
				completedDate: new Date("2024-02-28"),
				isCompleted: true,
				order: 1,
			},
			{
				id: "m4",
				goalId: "2",
				title: "Complete 10K race",
				targetDate: new Date("2024-05-01"),
				isCompleted: false,
				order: 2,
			},
		],
		tags: ["fitness", "running", "endurance"],
		createdAt: new Date("2024-02-01"),
		updatedAt: new Date("2024-03-10"),
	},
];

export function useGoals() {
	const [goals, setGoals] = useState<Goal[]>([]);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState<GoalFilters>({});

	useEffect(() => {
		// Simulate API call
		setTimeout(() => {
			setGoals(mockGoals);
			setLoading(false);
		}, 500);
	}, []);

	const filteredGoals = goals.filter((goal) => {
		if (filters.category && goal.category !== filters.category)
			return false;
		if (filters.status && goal.status !== filters.status) return false;
		if (filters.priority && goal.priority !== filters.priority)
			return false;
		if (
			filters.search &&
			!goal.title.toLowerCase().includes(filters.search.toLowerCase())
		)
			return false;
		return true;
	});

	const addGoal = (goal: Omit<Goal, "id" | "createdAt" | "updatedAt">) => {
		const newGoal: Goal = {
			...goal,
			id: Date.now().toString(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		setGoals((prev) => [...prev, newGoal]);
	};

	const updateGoal = (id: string, updates: Partial<Goal>) => {
		setGoals((prev) =>
			prev.map((goal) =>
				goal.id === id
					? { ...goal, ...updates, updatedAt: new Date() }
					: goal
			)
		);
	};

	const deleteGoal = (id: string) => {
		setGoals((prev) => prev.filter((goal) => goal.id !== id));
	};

	const updateMilestone = (
		goalId: string,
		milestoneId: string,
		updates: Partial<Milestone>
	) => {
		setGoals((prev) =>
			prev.map((goal) => {
				if (goal.id === goalId) {
					const updatedMilestones = goal.milestones.map(
						(milestone) =>
							milestone.id === milestoneId
								? { ...milestone, ...updates }
								: milestone
					);

					// Recalculate progress based on completed milestones
					const completedMilestones = updatedMilestones.filter(
						(m) => m.isCompleted
					).length;
					const progress = Math.round(
						(completedMilestones / updatedMilestones.length) * 100
					);

					return {
						...goal,
						milestones: updatedMilestones,
						progress,
						updatedAt: new Date(),
					};
				}
				return goal;
			})
		);
	};

	return {
		goals: filteredGoals,
		allGoals: goals,
		loading,
		filters,
		setFilters,
		addGoal,
		updateGoal,
		deleteGoal,
		updateMilestone,
	};
}
