"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/ui/card";
import { Button } from "@workspace/ui/components/ui/button";
import { CalendarDays, CheckCircle2, FileText, Plus, Target, TrendingUp, Clock, Star } from "lucide-react"

export default function DashboardPage() {
	// Mock data - in real app, this would come from your API/state management
	const stats = {
		totalTasks: 24,
		completedTasks: 18,
		totalNotes: 12,
		upcomingEvents: 5,
		activeGoals: 3,
		completedGoals: 7,
	}

	const completionRate = Math.round((stats.completedTasks / stats.totalTasks) * 100)

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			<div className="flex-1 space-y-8 p-6 md:p-10 pt-8">
				{/* Header */}
				<div className="flex flex-col space-y-2">
					<h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
						Dashboard
					</h1>
					<p className="text-slate-600 dark:text-slate-400 text-lg">
						Welcome back! Here's your productivity overview.
					</p>
				</div>

				{/* Stats Overview with enhanced design */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					<Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
						<div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
							<CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Tasks</CardTitle>
							<div className="p-2 bg-blue-500/20 rounded-lg">
								<CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">{stats.totalTasks}</div>
							<div className="flex items-center space-x-2">
								<div className="flex items-center">
									<div className="w-16 bg-blue-200 rounded-full h-2 dark:bg-blue-800">
										<div
											className="bg-blue-500 h-2 rounded-full transition-all duration-300"
											style={{ width: `${completionRate}%` }}
										/>
									</div>
									<span className="ml-2 text-xs font-medium text-blue-700 dark:text-blue-300">
										{completionRate}% done
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
						<div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -mr-10 -mt-10" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
							<CardTitle className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Notes</CardTitle>
							<div className="p-2 bg-emerald-500/20 rounded-lg">
								<FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-1">{stats.totalNotes}</div>
							<div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400">
								<TrendingUp className="h-3 w-3 mr-1" />
								<span>+2 from last week</span>
							</div>
						</CardContent>
					</Card>

					<Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
						<div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
							<CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">Upcoming Events</CardTitle>
							<div className="p-2 bg-purple-500/20 rounded-lg">
								<CalendarDays className="h-5 w-5 text-purple-600 dark:text-purple-400" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-1">{stats.upcomingEvents}</div>
							<div className="flex items-center text-xs text-purple-600 dark:text-purple-400">
								<Clock className="h-3 w-3 mr-1" />
								<span>Next: Team meeting</span>
							</div>
						</CardContent>
					</Card>

					<Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
						<div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full -mr-10 -mt-10" />
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
							<CardTitle className="text-sm font-semibold text-amber-700 dark:text-amber-300">Goals Progress</CardTitle>
							<div className="p-2 bg-amber-500/20 rounded-lg">
								<Target className="h-5 w-5 text-amber-600 dark:text-amber-400" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-1">{stats.activeGoals}</div>
							<div className="flex items-center text-xs text-amber-600 dark:text-amber-400">
								<Star className="h-3 w-3 mr-1" />
								<span>{stats.completedGoals} completed this year</span>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Main Content Grid with better spacing */}
				<div className="grid gap-8 lg:grid-cols-7">
					{/* Productivity Overview */}
					<Card className="lg:col-span-4 border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl font-semibold">Productivity Overview</CardTitle>
							<CardDescription className="text-slate-600 dark:text-slate-400">
								Your productivity metrics for the last 7 days
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="h-80 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
								<p className="text-slate-500 dark:text-slate-400 font-medium">Chart placeholder</p>
							</div>
						</CardContent>
					</Card>

					{/* Recent Activity */}
					<Card className="lg:col-span-3 border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
							<CardDescription className="text-slate-600 dark:text-slate-400">
								Latest updates across all your features
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="h-80 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
								<p className="text-slate-500 dark:text-slate-400 font-medium">Activity feed placeholder</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Secondary Content Grid */}
				<div className="grid gap-8 lg:grid-cols-7">
					{/* Tasks Overview */}
					<Card className="lg:col-span-4 border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl font-semibold">Tasks Overview</CardTitle>
							<CardDescription className="text-slate-600 dark:text-slate-400">
								Current task status and upcoming deadlines
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
								<p className="text-slate-500 dark:text-slate-400 font-medium">Tasks overview placeholder</p>
							</div>
						</CardContent>
					</Card>

					{/* Goals Progress */}
					<Card className="lg:col-span-3 border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
						<CardHeader className="pb-4">
							<CardTitle className="text-xl font-semibold">Goals Progress</CardTitle>
							<CardDescription className="text-slate-600 dark:text-slate-400">
								Track your goal completion
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
								<p className="text-slate-500 dark:text-slate-400 font-medium">Goals progress placeholder</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions with enhanced styling */}
				<Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
					<CardHeader className="pb-6">
						<CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
						<CardDescription className="text-slate-600 dark:text-slate-400">
							Frequently used actions across your productivity suite
						</CardDescription>
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
	)
}