"use client"

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
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
			<div className="flex-1 space-y-10 p-6 md:p-12 pt-10">
				{/* Header */}
				<div className="flex flex-col space-y-4 text-center md:text-left">
					<h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
						Dashboard
					</h1>
					<p className="text-slate-600 dark:text-slate-300 text-xl font-medium">
						Welcome back! Here's your productivity overview ✨
					</p>
				</div>

				{/* Stats Overview with enhanced design */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Total Tasks Card */}
					<div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-1 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105">
						<div className="relative h-full rounded-3xl bg-white/10 backdrop-blur-xl p-6">
							<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
							<div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />

							<div className="relative z-10">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-sm font-bold text-white/90 uppercase tracking-wider">Total Tasks</h3>
									<div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
										<CheckCircle2 className="h-6 w-6 text-white" />
									</div>
								</div>

								<div className="text-4xl font-black text-white mb-3">{stats.totalTasks}</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between text-white/80 text-sm">
										<span>Progress</span>
										<span className="font-bold">{completionRate}%</span>
									</div>
									<div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
										<div
											className="bg-gradient-to-r from-white to-blue-100 h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
											style={{ width: `${completionRate}%` }}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Notes Card */}
					<div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 p-1 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-105">
						<div className="relative h-full rounded-3xl bg-white/10 backdrop-blur-xl p-6">
							<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
							<div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />

							<div className="relative z-10">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-sm font-bold text-white/90 uppercase tracking-wider">Notes</h3>
									<div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
										<FileText className="h-6 w-6 text-white" />
									</div>
								</div>

								<div className="text-4xl font-black text-white mb-3">{stats.totalNotes}</div>

								<div className="flex items-center text-white/80 text-sm">
									<TrendingUp className="h-4 w-4 mr-2" />
									<span className="font-semibold">+2 from last week</span>
								</div>
							</div>
						</div>
					</div>

					{/* Upcoming Events Card */}
					<div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-600 p-1 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105">
						<div className="relative h-full rounded-3xl bg-white/10 backdrop-blur-xl p-6">
							<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
							<div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />

							<div className="relative z-10">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-sm font-bold text-white/90 uppercase tracking-wider">Upcoming Events</h3>
									<div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
										<CalendarDays className="h-6 w-6 text-white" />
									</div>
								</div>

								<div className="text-4xl font-black text-white mb-3">{stats.upcomingEvents}</div>

								<div className="flex items-center text-white/80 text-sm">
									<Clock className="h-4 w-4 mr-2" />
									<span className="font-semibold">Next: Team meeting</span>
								</div>
							</div>
						</div>
					</div>

					{/* Goals Progress Card */}
					<div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-1 shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:scale-105">
						<div className="relative h-full rounded-3xl bg-white/10 backdrop-blur-xl p-6">
							<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
							<div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />

							<div className="relative z-10">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-sm font-bold text-white/90 uppercase tracking-wider">Goals Progress</h3>
									<div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
										<Target className="h-6 w-6 text-white" />
									</div>
								</div>

								<div className="text-4xl font-black text-white mb-3">{stats.activeGoals}</div>

								<div className="flex items-center text-white/80 text-sm">
									<Star className="h-4 w-4 mr-2" />
									<span className="font-semibold">{stats.completedGoals} completed this year</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content Grid */}
				<div className="grid gap-10 lg:grid-cols-7">
					{/* Productivity Overview */}
					<div className="lg:col-span-4 group relative overflow-hidden rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-xl transition-all duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
						<div className="relative p-8">
							<div className="mb-6">
								<h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Productivity Overview</h2>
								<p className="text-slate-600 dark:text-slate-300">Your productivity metrics for the last 7 days</p>
							</div>

							<div className="h-80 flex items-center justify-center bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300/50 dark:border-slate-600/50 backdrop-blur-sm group-hover:border-blue-400/50 transition-colors duration-300">
								<div className="text-center">
									<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
										<TrendingUp className="h-8 w-8 text-white" />
									</div>
									<p className="text-slate-500 dark:text-slate-400 font-semibold text-lg">Chart placeholder</p>
									<p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Interactive charts coming soon</p>
								</div>
							</div>
						</div>
					</div>

					{/* Recent Activity */}
					<div className="lg:col-span-3 group relative overflow-hidden rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-xl transition-all duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
						<div className="relative p-8">
							<div className="mb-6">
								<h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Recent Activity</h2>
								<p className="text-slate-600 dark:text-slate-300">Latest updates across all your features</p>
							</div>

							<div className="h-80 flex items-center justify-center bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300/50 dark:border-slate-600/50 backdrop-blur-sm group-hover:border-emerald-400/50 transition-colors duration-300">
								<div className="text-center">
									<div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
										<Clock className="h-8 w-8 text-white" />
									</div>
									<p className="text-slate-500 dark:text-slate-400 font-semibold text-lg">Activity feed placeholder</p>
									<p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Real-time updates coming soon</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Secondary Content Grid */}
				<div className="grid gap-10 lg:grid-cols-7">
					{/* Tasks Overview */}
					<div className="lg:col-span-4 group relative overflow-hidden rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-xl transition-all duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
						<div className="relative p-8">
							<div className="mb-6">
								<h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Tasks Overview</h2>
								<p className="text-slate-600 dark:text-slate-300">Current task status and upcoming deadlines</p>
							</div>

							<div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300/50 dark:border-slate-600/50 backdrop-blur-sm group-hover:border-purple-400/50 transition-colors duration-300">
								<div className="text-center">
									<div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
										<CheckCircle2 className="h-8 w-8 text-white" />
									</div>
									<p className="text-slate-500 dark:text-slate-400 font-semibold text-lg">Tasks overview placeholder</p>
									<p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Task management coming soon</p>
								</div>
							</div>
						</div>
					</div>

					{/* Goals Progress */}
					<div className="lg:col-span-3 group relative overflow-hidden rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-xl transition-all duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />
						<div className="relative p-8">
							<div className="mb-6">
								<h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Goals Progress</h2>
								<p className="text-slate-600 dark:text-slate-300">Track your goal completion</p>
							</div>

							<div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300/50 dark:border-slate-600/50 backdrop-blur-sm group-hover:border-amber-400/50 transition-colors duration-300">
								<div className="text-center">
									<div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
										<Target className="h-8 w-8 text-white" />
									</div>
									<p className="text-slate-500 dark:text-slate-400 font-semibold text-lg">Goals progress placeholder</p>
									<p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Goal tracking coming soon</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Actions with enhanced styling */}
				<div className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 shadow-2xl">
					<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
					<div className="relative p-8">
						<div className="mb-8 text-center">
							<h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">Quick Actions</h2>
							<p className="text-slate-600 dark:text-slate-300 text-lg">
								Frequently used actions across your productivity suite
							</p>
						</div>

						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							<a
								href="/tasks/new"
								className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-1 shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
							>
								<div className="h-32 rounded-2xl bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 group-hover:bg-white/20 transition-colors duration-300">
									<div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
										<Plus className="h-8 w-8 text-white" />
									</div>
									<span className="font-bold text-white text-lg">New Task</span>
								</div>
							</a>

							<a
								href="/notes/new"
								className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-1 shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
							>
								<div className="h-32 rounded-2xl bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 group-hover:bg-white/20 transition-colors duration-300">
									<div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
										<FileText className="h-8 w-8 text-white" />
									</div>
									<span className="font-bold text-white text-lg">Create Note</span>
								</div>
							</a>

							<a
								href="/goals/new"
								className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-1 shadow-xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105"
							>
								<div className="h-32 rounded-2xl bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 group-hover:bg-white/20 transition-colors duration-300">
									<div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
										<Target className="h-8 w-8 text-white" />
									</div>
									<span className="font-bold text-white text-lg">Set Goal</span>
								</div>
							</a>

							<a
								href="/calendar/new"
								className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-1 shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
							>
								<div className="h-32 rounded-2xl bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 group-hover:bg-white/20 transition-colors duration-300">
									<div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
										<CalendarDays className="h-8 w-8 text-white" />
									</div>
									<span className="font-bold text-white text-lg">Schedule Event</span>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
