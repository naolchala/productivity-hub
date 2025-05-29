"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@workspace/ui/components/ui/button";
import { Input } from "@workspace/ui/components/ui/input";
import { Textarea } from "@workspace/ui/components/ui/textarea";
import { Label } from "@workspace/ui/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/ui/select";
import { Badge } from "@workspace/ui/components/ui/badge";
import { X } from "lucide-react";
import type { Goal } from "../types/goal";

interface GoalFormProps {
	goal?: Goal;
	onSubmit: (goal: Omit<Goal, "id" | "createdAt" | "updatedAt">) => void;
}

export function GoalForm({ goal, onSubmit }: GoalFormProps) {
	const [formData, setFormData] = useState({
		title: goal?.title || "",
		description: goal?.description || "",
		category: goal?.category || ("personal" as Goal["category"]),
		priority: goal?.priority || ("medium" as Goal["priority"]),
		status: goal?.status || ("not-started" as Goal["status"]),
		startDate: goal?.startDate
			? goal.startDate.toISOString().split("T")[0]
			: new Date().toISOString().split("T")[0],
		targetDate: goal?.targetDate
			? goal.targetDate.toISOString().split("T")[0]
			: "",
		progress: goal?.progress || 0,
		tags: goal?.tags || [],
	});

	const [newTag, setNewTag] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		onSubmit({
			...formData,
			startDate: new Date(formData.startDate as string),
			targetDate: new Date(formData.targetDate as string),
			milestones: goal?.milestones || [],
		});
	};

	const addTag = () => {
		if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
			setFormData((prev) => ({
				...prev,
				tags: [...prev.tags, newTag.trim()],
			}));
			setNewTag("");
		}
	};

	const removeTag = (tagToRemove: string) => {
		setFormData((prev) => ({
			...prev,
			tags: prev.tags.filter((tag) => tag !== tagToRemove),
		}));
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addTag();
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid gap-4">
				<div>
					<Label htmlFor="title">Title *</Label>
					<Input
						id="title"
						value={formData.title}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								title: e.target.value,
							}))
						}
						placeholder="Enter goal title"
						required
					/>
				</div>

				<div>
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						value={formData.description}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								description: e.target.value,
							}))
						}
						placeholder="Describe your goal"
						rows={3}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<Label htmlFor="category">Category</Label>
						<Select
							value={formData.category}
							onValueChange={(value) =>
								setFormData((prev) => ({
									...prev,
									category: value as Goal["category"],
								}))
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="personal">
									Personal
								</SelectItem>
								<SelectItem value="professional">
									Professional
								</SelectItem>
								<SelectItem value="health">Health</SelectItem>
								<SelectItem value="learning">
									Learning
								</SelectItem>
								<SelectItem value="financial">
									Financial
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor="priority">Priority</Label>
						<Select
							value={formData.priority}
							onValueChange={(value) =>
								setFormData((prev) => ({
									...prev,
									priority: value as Goal["priority"],
								}))
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="low">Low</SelectItem>
								<SelectItem value="medium">Medium</SelectItem>
								<SelectItem value="high">High</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<Label htmlFor="startDate">Start Date</Label>
						<Input
							id="startDate"
							type="date"
							value={formData.startDate}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									startDate: e.target.value,
								}))
							}
							required
						/>
					</div>

					<div>
						<Label htmlFor="targetDate">Target Date *</Label>
						<Input
							id="targetDate"
							type="date"
							value={formData.targetDate}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									targetDate: e.target.value,
								}))
							}
							required
						/>
					</div>
				</div>

				{goal && (
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="status">Status</Label>
							<Select
								value={formData.status}
								onValueChange={(value) =>
									setFormData((prev) => ({
										...prev,
										status: value as Goal["status"],
									}))
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="not-started">
										Not Started
									</SelectItem>
									<SelectItem value="in-progress">
										In Progress
									</SelectItem>
									<SelectItem value="completed">
										Completed
									</SelectItem>
									<SelectItem value="paused">
										Paused
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<Label htmlFor="progress">Progress (%)</Label>
							<Input
								id="progress"
								type="number"
								min="0"
								max="100"
								value={formData.progress}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										progress:
											Number.parseInt(e.target.value) ||
											0,
									}))
								}
							/>
						</div>
					</div>
				)}

				<div>
					<Label htmlFor="tags">Tags</Label>
					<div className="space-y-2">
						<div className="flex gap-2">
							<Input
								id="tags"
								value={newTag}
								onChange={(e) => setNewTag(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Add a tag"
							/>
							<Button
								type="button"
								onClick={addTag}
								variant="outline"
							>
								Add
							</Button>
						</div>
						{formData.tags.length > 0 && (
							<div className="flex flex-wrap gap-1">
								{formData.tags.map((tag) => (
									<Badge
										key={tag}
										variant="secondary"
										className="text-xs"
									>
										{tag}
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="h-auto p-0 ml-1"
											onClick={() => removeTag(tag)}
										>
											<X className="h-3 w-3" />
										</Button>
									</Badge>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="flex justify-end gap-2">
				<Button type="submit">
					{goal ? "Update Goal" : "Create Goal"}
				</Button>
			</div>
		</form>
	);
}
