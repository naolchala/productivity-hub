"use client";

import { Calendar, Target } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/ui/card";
import { Badge } from "@workspace/ui/components/ui/badge";
import { Progress } from "@workspace/ui/components/ui/progress";
import type { Goal } from "../types/goal";

interface GoalCardProps {
	goal: Goal;
	onSelect?: (goal: Goal) => void;
}

export function GoalCard({ goal, onSelect }: GoalCardProps) {
	const getStatusColor = (status: Goal["status"]) => {
		switch (status) {
			case "completed":
				return "bg-green-500";
			case "in-progress":
				return "bg-blue-500";
			case "paused":
				return "bg-yellow-500";
			default:
				return "bg-gray-500";
		}
	};

	const getPriorityColor = (priority: Goal["priority"]) => {
		switch (priority) {
			case "high":
				return "destructive";
			case "medium":
				return "default";
			case "low":
				return "secondary";
		}
	};

	const daysUntilTarget = Math.ceil(
		(goal.targetDate.getTime() - new Date().getTime()) /
			(1000 * 60 * 60 * 24)
	);
	const isOverdue = daysUntilTarget < 0;
	const completedMilestones = goal.milestones.filter(
		(m) => m.isCompleted
	).length;

	return (
		<Card
			className="hover:shadow-md transition-shadow cursor-pointer border-none"
			onClick={() => onSelect?.(goal)}
		>
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="flex-1 min-w-0">
						<CardTitle className="text-lg line-clamp-2">
							{goal.title}
						</CardTitle>
						<CardDescription className="line-clamp-2 mt-1">
							{goal.description}
						</CardDescription>
					</div>
					<div className="flex flex-col gap-1 ml-2">
						<Badge variant="outline" className="capitalize text-xs">
							<div
								className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(goal.status)}`}
							/>
							{goal.status.replace("-", " ")}
						</Badge>
						<Badge
							variant={getPriorityColor(goal.priority)}
							className="capitalize text-xs"
						>
							{goal.priority}
						</Badge>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Progress</span>
						<span className="font-medium">{goal.progress}%</span>
					</div>
					<Progress value={goal.progress} className="h-2" />
				</div>

				<div className="grid grid-cols-2 gap-4 text-sm">
					<div className="flex items-center gap-2">
						<Target className="h-4 w-4 text-muted-foreground" />
						<span className="text-muted-foreground">
							{completedMilestones}/{goal.milestones.length}{" "}
							milestones
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4 text-muted-foreground" />
						<span
							className={`text-muted-foreground ${isOverdue ? "text-destructive" : ""}`}
						>
							{isOverdue
								? `${Math.abs(daysUntilTarget)}d overdue`
								: `${daysUntilTarget}d left`}
						</span>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<Badge variant="secondary" className="capitalize text-xs">
						{goal.category}
					</Badge>
					<div className="flex gap-1">
						{goal.tags.slice(0, 2).map((tag) => (
							<Badge
								key={tag}
								variant="outline"
								className="text-xs"
							>
								{tag}
							</Badge>
						))}
						{goal.tags.length > 2 && (
							<Badge variant="outline" className="text-xs">
								+{goal.tags.length - 2}
							</Badge>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
