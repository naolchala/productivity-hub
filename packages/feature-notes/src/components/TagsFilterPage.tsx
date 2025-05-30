"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/ui/card";
import { Button } from "@workspace/ui/components/ui/button";
import { Badge } from "@workspace/ui/components/ui/badge";
import { Input } from "@workspace/ui/components/ui/input";
import { Tag, Search, X } from "lucide-react";
import { useNotes } from "../context/NotesContext";

export function TagsFilterPage() {
	const { notes, filter, setFilter } = useNotes();
	const [searchQuery, setSearchQuery] = useState("");

	// Get all tags with their usage count
	const tagStats = React.useMemo(() => {
		const tagMap = new Map<string, number>();
		notes.forEach((note) => {
			note.tags.forEach((tag) => {
				tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
			});
		});

		return Array.from(tagMap.entries())
			.map(([tag, count]) => ({ tag, count }))
			.sort((a, b) => b.count - a.count);
	}, [notes]);

	// Filter tags based on search
	const filteredTags = tagStats.filter(({ tag }) =>
		tag.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleTagClick = (tag: string) => {
		const isSelected = filter.selectedTags.includes(tag);
		const newSelectedTags = isSelected
			? filter.selectedTags.filter((t) => t !== tag)
			: [...filter.selectedTags, tag];

		setFilter({ selectedTags: newSelectedTags });
	};

	const clearSelectedTags = () => {
		setFilter({ selectedTags: [] });
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold flex items-center gap-2">
						<Tag className="h-8 w-8" />
						Tags & Filters
					</h1>
					<p className="text-muted-foreground">
						Organize and filter your notes by tags
					</p>
				</div>
			</div>

			{/* Search Tags */}
			<Card>
				<CardHeader>
					<CardTitle>Search Tags</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search tags..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Selected Tags */}
			{filter.selectedTags.length > 0 && (
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>
								Selected Tags ({filter.selectedTags.length})
							</CardTitle>
							<Button
								variant="outline"
								size="sm"
								onClick={clearSelectedTags}
							>
								<X className="h-4 w-4 mr-1" />
								Clear All
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-2">
							{filter.selectedTags.map((tag) => (
								<Badge
									key={tag}
									variant="default"
									className="gap-1 cursor-pointer"
									onClick={() => handleTagClick(tag)}
								>
									{tag}
									<X className="h-3 w-3" />
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* All Tags */}
			<Card>
				<CardHeader>
					<CardTitle>All Tags ({filteredTags.length})</CardTitle>
				</CardHeader>
				<CardContent>
					{filteredTags.length === 0 ? (
						<div className="text-center py-8">
							<Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">
								{tagStats.length === 0
									? "No tags yet"
									: "No tags found"}
							</h3>
							<p className="text-muted-foreground">
								{tagStats.length === 0
									? "Create notes with tags to organize your content."
									: "Try a different search term."}
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{/* Tag Cloud */}
							<div className="flex flex-wrap gap-2">
								{filteredTags.map(({ tag, count }) => (
									<Badge
										key={tag}
										variant={
											filter.selectedTags.includes(tag)
												? "default"
												: "outline"
										}
										className="cursor-pointer hover:bg-primary/10 transition-colors"
										onClick={() => handleTagClick(tag)}
									>
										{tag} ({count})
									</Badge>
								))}
							</div>

							{/* Tag Statistics */}
							<div className="mt-6">
								<h4 className="font-semibold mb-3">
									Tag Statistics
								</h4>
								<div className="space-y-2">
									{filteredTags
										.slice(0, 10)
										.map(({ tag, count }) => (
											<div
												key={tag}
												className="flex items-center justify-between"
											>
												<span className="text-sm">
													{tag}
												</span>
												<div className="flex items-center gap-2">
													<div className="w-20 bg-muted rounded-full h-2">
														<div
															className="bg-primary h-2 rounded-full"
															style={{
																width: `${(count / Math.max(...tagStats.map((t) => t.count))) * 100}%`,
															}}
														/>
													</div>
													<span className="text-sm text-muted-foreground w-8 text-right">
														{count}
													</span>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
