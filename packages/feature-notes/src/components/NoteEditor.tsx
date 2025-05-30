"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/ui/button";
import { Input } from "@workspace/ui/components/ui/input";
import { Textarea } from "@workspace/ui/components/ui/textarea";
import { Badge } from "@workspace/ui/components/ui/badge";
import { Switch } from "@workspace/ui/components/ui/switch";
import { Label } from "@workspace/ui/components/ui/label";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/ui/card";
import { Save, X, Plus, ArrowLeft } from "lucide-react";
import type { Note, NoteFormData } from "../types/note";

interface NoteEditorProps {
	note?: Note;
	onSave: (data: NoteFormData) => Promise<void>;
	isLoading?: boolean;
}

export function NoteEditor({ note, onSave, isLoading }: NoteEditorProps) {
	const router = useRouter();
	const [formData, setFormData] = useState<NoteFormData>({
		title: "",
		content: "",
		tags: [],
		category: "",
		isPinned: false,
	});
	const [newTag, setNewTag] = useState("");

	useEffect(() => {
		if (note) {
			setFormData({
				title: note.title,
				content: note.content,
				tags: note.tags,
				category: note.category || "",
				isPinned: note.isPinned,
			});
		}
	}, [note]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.title.trim()) return;

		try {
			await onSave({
				...formData,
				title: formData.title.trim(),
				content: formData.content.trim(),
			});
			router.push("/notes");
		} catch (error) {
			console.error("Failed to save note:", error);
		}
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

	const handleCancel = () => {
		router.back();
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => router.push("/notes")}
				>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to Notes
				</Button>
				<h1 className="text-2xl font-bold">
					{note ? "Edit Note" : "Create New Note"}
				</h1>
			</div>

			<Card className="w-full max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle>
						{note ? "Edit Note" : "Create New Note"}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Title */}
						<div className="space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										title: e.target.value,
									}))
								}
								placeholder="Enter note title..."
								required
							/>
						</div>

						{/* Content */}
						<div className="space-y-2">
							<Label htmlFor="content">Content</Label>
							<Textarea
								id="content"
								value={formData.content}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										content: e.target.value,
									}))
								}
								placeholder="Write your note content here..."
								rows={12}
								className="resize-none"
							/>
						</div>

						{/* Tags */}
						<div className="space-y-2">
							<Label>Tags</Label>
							<div className="flex gap-2">
								<Input
									value={newTag}
									onChange={(e) => setNewTag(e.target.value)}
									onKeyPress={handleKeyPress}
									placeholder="Add a tag..."
									className="flex-1"
								/>
								<Button
									type="button"
									onClick={addTag}
									size="sm"
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							{formData.tags.length > 0 && (
								<div className="flex flex-wrap gap-1 mt-2">
									{formData.tags.map((tag) => (
										<Badge
											key={tag}
											variant="secondary"
											className="gap-1"
										>
											{tag}
											<X
												className="h-3 w-3 cursor-pointer"
												onClick={() => removeTag(tag)}
											/>
										</Badge>
									))}
								</div>
							)}
						</div>

						{/* Category */}
						<div className="space-y-2">
							<Label htmlFor="category">
								Category (Optional)
							</Label>
							<Input
								id="category"
								value={formData.category}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										category: e.target.value,
									}))
								}
								placeholder="Enter category..."
							/>
						</div>

						{/* Pin Toggle */}
						<div className="flex items-center space-x-2">
							<Switch
								id="pinned"
								checked={formData.isPinned}
								onCheckedChange={(checked) =>
									setFormData((prev) => ({
										...prev,
										isPinned: checked,
									}))
								}
							/>
							<Label htmlFor="pinned">Pin this note</Label>
						</div>

						{/* Actions */}
						<div className="flex justify-end gap-2 pt-4">
							<Button
								type="button"
								variant="outline"
								onClick={handleCancel}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isLoading || !formData.title.trim()}
							>
								<Save className="h-4 w-4 mr-2" />
								{isLoading ? "Saving..." : "Save Note"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
