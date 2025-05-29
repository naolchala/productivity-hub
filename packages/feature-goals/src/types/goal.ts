export interface Goal {
	id: string;
	title: string;
	description: string;
	category: "personal" | "professional" | "health" | "learning" | "financial";
	priority: "low" | "medium" | "high";
	status: "not-started" | "in-progress" | "completed" | "paused";
	startDate: Date;
	targetDate: Date;
	completedDate?: Date;
	progress: number; // 0-100
	milestones: Milestone[];
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface Milestone {
	id: string;
	goalId: string;
	title: string;
	description?: string;
	targetDate: Date;
	completedDate?: Date;
	isCompleted: boolean;
	order: number;
}

export interface GoalFilters {
	category?: Goal["category"];
	status?: Goal["status"];
	priority?: Goal["priority"];
	search?: string;
}
