"use client";

import { useState } from "react";
import { Plus, Search, Target, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@workspace/ui/components/ui/button";
import { Input } from "@workspace/ui/components/ui/input";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@workspace/ui/components/ui/dialog";
import { useGoals } from "../hooks/useGoals";
import type { Goal } from "../types/goal";
import { GoalForm } from "../components/GoalForm";
import { GoalCard } from "../components/GoalCard";
import { Badge } from "@workspace/ui/components/ui/badge";
import "../styles/globals.css"; // Ensure global styles are imported

export default function GoalsListPage() {
	const { goals, loading, filters, setFilters, addGoal } = useGoals();
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
	const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

	const handleCreateGoal = (
		goalData: Omit<Goal, "id" | "createdAt" | "updatedAt">
	) => {
		addGoal(goalData);
		setIsCreateDialogOpen(false);
	};

	const handleSelectGoal = (goal: Goal) => {
		setSelectedGoal(goal);
		setIsDetailDialogOpen(true);
	};

	const stats = {
		total: goals.length,
		completed: goals.filter((g) => g.status === "completed").length,
		inProgress: goals.filter((g) => g.status === "in-progress").length,
		avgProgress:
			goals.length > 0
				? Math.round(
						goals.reduce((sum, g) => sum + g.progress, 0) /
							goals.length
					)
				: 0,
	};

	if (loading) {
		return (
			<div className="container mx-auto p-6">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
					{[...Array(4)].map((_, i) => (
						<Card key={i}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<div className="h-4 w-20 bg-muted animate-pulse rounded" />
								<div className="h-4 w-4 bg-muted animate-pulse rounded" />
							</CardHeader>
							<CardContent>
								<div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
								<div className="h-3 w-24 bg-muted animate-pulse rounded" />
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Goals</h1>
					<p className="text-muted-foreground">
						Track and achieve your objectives
					</p>
				</div>
				<Dialog
					open={isCreateDialogOpen}
					onOpenChange={setIsCreateDialogOpen}
				>
					<DialogTrigger asChild>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							New Goal
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>Create New Goal</DialogTitle>
							<DialogDescription>
								Set a new goal and define milestones to track
								your progress.
							</DialogDescription>
						</DialogHeader>
						<GoalForm onSubmit={handleCreateGoal} />
					</DialogContent>
				</Dialog>
			</div>

			{/* Goal Detail Dialog */}
			<Dialog
				open={isDetailDialogOpen}
				onOpenChange={setIsDetailDialogOpen}
			>
				<DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
					{selectedGoal && (
						<>
							<DialogHeader>
								<DialogTitle className="text-2xl">
									{selectedGoal.title}
								</DialogTitle>
								<DialogDescription>
									{selectedGoal.description}
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-6">
								{/* Progress Section */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold">
										Progress Overview
									</h3>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium">
												Overall Progress
											</span>
											<span className="text-sm text-muted-foreground">
												{selectedGoal.progress}%
											</span>
										</div>
										<div className="w-full bg-secondary rounded-full h-2">
											<div
												className="bg-primary h-2 rounded-full transition-all duration-300"
												style={{
													width: `${selectedGoal.progress}%`,
												}}
											/>
										</div>
									</div>
								</div>

								{/* Goal Details */}
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<span className="text-sm font-medium">
											Category
										</span>
										<div>
											<Badge
												variant="secondary"
												className="capitalize"
											>
												{selectedGoal.category}
											</Badge>
										</div>
									</div>
									<div className="space-y-2">
										<span className="text-sm font-medium">
											Priority
										</span>
										<div>
											<Badge
												variant={
													selectedGoal.priority ===
													"high"
														? "destructive"
														: selectedGoal.priority ===
															  "medium"
															? "default"
															: "secondary"
												}
												className="capitalize"
											>
												{selectedGoal.priority}
											</Badge>
										</div>
									</div>
									<div className="space-y-2">
										<span className="text-sm font-medium">
											Start Date
										</span>
										<p className="text-sm text-muted-foreground">
											{selectedGoal.startDate.toLocaleDateString()}
										</p>
									</div>
									<div className="space-y-2">
										<span className="text-sm font-medium">
											Target Date
										</span>
										<p className="text-sm text-muted-foreground">
											{selectedGoal.targetDate.toLocaleDateString()}
										</p>
									</div>
								</div>

								{/* Milestones */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold">
										Milestones (
										{
											selectedGoal.milestones.filter(
												(m) => m.isCompleted
											).length
										}
										/{selectedGoal.milestones.length})
									</h3>
									{selectedGoal.milestones.length > 0 ? (
										<div className="space-y-2">
											{selectedGoal.milestones.map(
												(milestone) => (
													<div
														key={milestone.id}
														className="flex items-center gap-3 p-3 rounded-lg  "
													>
														<div
															className={`w-4 h-4 rounded-full  -2 ${milestone.isCompleted ? "bg-green-500  -green-500" : " -muted-foreground"}`}
														/>
														<div className="flex-1">
															<h4
																className={`font-medium ${milestone.isCompleted ? "line-through text-muted-foreground" : ""}`}
															>
																{
																	milestone.title
																}
															</h4>
															<p className="text-xs text-muted-foreground">
																Target:{" "}
																{milestone.targetDate.toLocaleDateString()}
															</p>
														</div>
													</div>
												)
											)}
										</div>
									) : (
										<p className="text-muted-foreground text-sm">
											No milestones defined yet.
										</p>
									)}
								</div>

								{/* Tags */}
								{selectedGoal.tags.length > 0 && (
									<div className="space-y-2">
										<h3 className="text-lg font-semibold">
											Tags
										</h3>
										<div className="flex flex-wrap gap-1">
											{selectedGoal.tags.map((tag) => (
												<Badge
													key={tag}
													variant="outline"
													className="text-xs"
												>
													{tag}
												</Badge>
											))}
										</div>
									</div>
								)}
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Goals
						</CardTitle>
						<Target className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.total}</div>
						<p className="text-xs text-muted-foreground">
							Active objectives
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Completed
						</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.completed}
						</div>
						<p className="text-xs text-muted-foreground">
							Goals achieved
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							In Progress
						</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.inProgress}
						</div>
						<p className="text-xs text-muted-foreground">
							Currently working on
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Avg Progress
						</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats.avgProgress}%
						</div>
						<p className="text-xs text-muted-foreground">
							Overall completion
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<div className="flex flex-col sm:flex-row gap-4 mb-6">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
					<Input
						placeholder="Search goals..."
						value={filters.search || ""}
						onChange={(e) =>
							setFilters({ ...filters, search: e.target.value })
						}
						className="pl-10"
					/>
				</div>
				<Select
					value={filters.category || "all"}
					onValueChange={(value) =>
						setFilters({
							...filters,
							category:
								value === "all"
									? undefined
									: (value as Goal["category"]),
						})
					}
				>
					<SelectTrigger className="w-full sm:w-[180px]">
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						<SelectItem value="personal">Personal</SelectItem>
						<SelectItem value="professional">
							Professional
						</SelectItem>
						<SelectItem value="health">Health</SelectItem>
						<SelectItem value="learning">Learning</SelectItem>
						<SelectItem value="financial">Financial</SelectItem>
					</SelectContent>
				</Select>
				<Select
					value={filters.status || "all"}
					onValueChange={(value) =>
						setFilters({
							...filters,
							status:
								value === "all"
									? undefined
									: (value as Goal["status"]),
						})
					}
				>
					<SelectTrigger className="w-full sm:w-[180px]">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						<SelectItem value="not-started">Not Started</SelectItem>
						<SelectItem value="in-progress">In Progress</SelectItem>
						<SelectItem value="completed">Completed</SelectItem>
						<SelectItem value="paused">Paused</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Goals Grid */}
			{goals.length === 0 ? (
				<Card className="text-center py-12">
					<CardContent>
						<Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
						<h3 className="text-lg font-semibold mb-2">
							No goals found
						</h3>
						<p className="text-muted-foreground mb-4">
							{filters.search ||
							filters.category ||
							filters.status
								? "Try adjusting your filters to see more goals."
								: "Get started by creating your first goal."}
						</p>
						{!filters.search &&
							!filters.category &&
							!filters.status && (
								<Button
									onClick={() => setIsCreateDialogOpen(true)}
								>
									<Plus className="mr-2 h-4 w-4" />
									Create Your First Goal
								</Button>
							)}
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{goals.map((goal) => (
						<GoalCard
							key={goal.id}
							goal={goal}
							onSelect={handleSelectGoal}
						/>
					))}
				</div>
			)}
		</div>
	);
}
