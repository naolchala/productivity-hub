"use client"

import {
	Card,
	CardHeader,
	CardContent,
	
	CardTitle,
	CardDescription,
	CardAction,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar";
import { CalendarDays, CheckCircle2, FileText, Plus, Target, TrendingUp, Clock, Star, User } from "lucide-react";

export default function DashboardPage() {
	// Mock data
	const stats = {
		totalTasks: 24,
		completedTasks: 18,
		totalNotes: 12,
		upcomingEvents: 5,
		activeGoals: 3,
		completedGoals: 7,
	};
	const completionRate = Math.round((stats.completedTasks / stats.totalTasks) * 100);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			<div className="max-w-7xl mx-auto flex-1 space-y-10 p-6 md:p-10 pt-8">
				{/* Header with Avatar */}
				<div className="flex items-center justify-between mb-2">
					<div>
						<h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
							Welcome back, <span className="inline-block align-middle">Abdu</span>
						</h1>
						<p className="text-slate-600 dark:text-slate-400 text-lg mt-1">
							Here's your productivity overview.
						</p>
					</div>
					<Avatar className="size-16">
						<AvatarImage src="/avatar.png" alt="User avatar" />
						<AvatarFallback>
							<User className="w-8 h-8 text-slate-400" />
						</AvatarFallback>
					</Avatar>
				</div>

				{/* Stats Cards */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					<Card className="border-0 shadow-lg">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-base font-semibold">Total Tasks</CardTitle>
							<CardAction>
								<Badge variant="secondary" className="bg-blue-100 text-blue-700">
									<CheckCircle2 className="w-4 h-4 mr-1" />
									Tasks
								</Badge>
							</CardAction>
						</CardHeader>
						<CardContent>
							<div className="flex items-end gap-2">
								<span className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.totalTasks}</span>
								<span className="text-xs text-blue-500">{stats.completedTasks} done</span>
							</div>
							<Progress value={completionRate} className="mt-2" />
							<span className="text-xs text-blue-500">{completionRate}% completed</span>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-base font-semibold">Notes</CardTitle>
							<CardAction>
								<Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
									<FileText className="w-4 h-4 mr-1" />
									Notes
								</Badge>
							</CardAction>
						</CardHeader>
						<CardContent>
							<div className="flex items-end gap-2">
								<span className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{stats.totalNotes}</span>
								<Badge variant="outline" className="text-xs text-emerald-500 border-emerald-200 bg-emerald-50 ml-2">
									<TrendingUp className="w-3 h-3 mr-1" />+2
								</Badge>
							</div>
							<span className="text-xs text-emerald-500">from last week</span>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-base font-semibold">Upcoming Events</CardTitle>
							<CardAction>
								<Badge variant="secondary" className="bg-purple-100 text-purple-700">
									<CalendarDays className="w-4 h-4 mr-1" />
									Events
								</Badge>
							</CardAction>
						</CardHeader>
						<CardContent>
							<div className="flex items-end gap-2">
								<span className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.upcomingEvents}</span>
								<Badge variant="outline" className="text-xs text-purple-500 border-purple-200 bg-purple-50 ml-2">
									<Clock className="w-3 h-3 mr-1" />Next: Team meeting
								</Badge>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 shadow-lg">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-base font-semibold">Goals Progress</CardTitle>
							<CardAction>
								<Badge variant="secondary" className="bg-amber-100 text-amber-700">
									<Target className="w-4 h-4 mr-1" />
									Goals
								</Badge>
							</CardAction>
						</CardHeader>
						<CardContent>
							<div className="flex items-end gap-2">
								<span className="text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.activeGoals}</span>
								<Badge variant="outline" className="text-xs text-amber-500 border-amber-200 bg-amber-50 ml-2">
									<Star className="w-3 h-3 mr-1" />{stats.completedGoals} done
								</Badge>
							</div>
							<span className="text-xs text-amber-500">this year</span>
						</CardContent>
					</Card>
				</div>

				{/* Main Content Grid */}
				<div className="grid gap-8 lg:grid-cols-7 mt-8">
					{/* Productivity Overview */}
					<Card className="lg:col-span-4 border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl font-semibold">Productivity Overview</CardTitle>
							<CardDescription>Your productivity metrics for the last 7 days</CardDescription>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="h-80 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
								<span className="text-slate-500 dark:text-slate-400 font-medium">Chart placeholder</span>
							</div>
						</CardContent>
					</Card>

					{/* Recent Activity */}
					<Card className="lg:col-span-3 border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
							<CardDescription>Latest updates across all your features</CardDescription>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="h-80 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
								<span className="text-slate-500 dark:text-slate-400 font-medium">Activity feed placeholder</span>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Secondary Content Grid */}
				<div className="grid gap-8 lg:grid-cols-7 mt-8">
					{/* Tasks Overview */}
					<Card className="lg:col-span-4 border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl font-semibold">Tasks Overview</CardTitle>
							<CardDescription>Current task status and upcoming deadlines</CardDescription>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
								<span className="text-slate-500 dark:text-slate-400 font-medium">Tasks overview placeholder</span>
							</div>
						</CardContent>
					</Card>

					{/* Goals Progress */}
					<Card className="lg:col-span-3 border-0 shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl font-semibold">Goals Progress</CardTitle>
							<CardDescription>Track your goal completion</CardDescription>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
								<span className="text-slate-500 dark:text-slate-400 font-medium">Goals progress placeholder</span>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions */}
				<Card className="border-0 shadow-lg mt-8">
					<CardHeader className="pb-6">
						<CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
						<CardDescription>Frequently used actions across your productivity suite</CardDescription>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							<Button
								variant="outline"
								className="h-24 flex-col space-y-2 border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 dark:border-blue-700 dark:hover:border-blue-500 dark:hover:bg-blue-950 transition-all duration-300 group"
								asChild
							>
								<a href="/tasks/new">
									<Plus className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
									<span className="font-semibold text-blue-700 dark:text-blue-300">New Task</span>
								</a>
							</Button>
							<Button
								variant="outline"
								className="h-24 flex-col space-y-2 border-2 border-dashed border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 dark:border-emerald-700 dark:hover:border-emerald-500 dark:hover:bg-emerald-950 transition-all duration-300 group"
								asChild
							>
								<a href="/notes/new">
									<FileText className="h-8 w-8 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
									<span className="font-semibold text-emerald-700 dark:text-emerald-300">Create Note</span>
								</a>
							</Button>
							<Button
								variant="outline"
								className="h-24 flex-col space-y-2 border-2 border-dashed border-amber-300 hover:border-amber-500 hover:bg-amber-50 dark:border-amber-700 dark:hover:border-amber-500 dark:hover:bg-amber-950 transition-all duration-300 group"
								asChild
							>
								<a href="/goals/new">
									<Target className="h-8 w-8 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-200" />
									<span className="font-semibold text-amber-700 dark:text-amber-300">Set Goal</span>
								</a>
							</Button>
							<Button
								variant="outline"
								className="h-24 flex-col space-y-2 border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-500 dark:hover:bg-purple-950 transition-all duration-300 group"
								asChild
							>
								<a href="/calendar/new">
									<CalendarDays className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-200" />
									<span className="font-semibold text-purple-700 dark:text-purple-300">Schedule Event</span>
								</a>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}