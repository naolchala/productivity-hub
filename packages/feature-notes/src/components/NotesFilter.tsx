"use client";

import { Input } from "@workspace/ui/components/ui/input";
import { Button } from "@workspace/ui/components/ui/button";
import { Badge } from "@workspace/ui/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/ui/select";
import { Search, X, Filter } from "lucide-react";
import type { NotesFilter } from "../types/note";

interface NotesFilterProps {
	filter: NotesFilter;
	availableTags: string[];
	onFilterChange: (filter: Partial<NotesFilter>) => void;
	onClearFilter: () => void;
}

export function NotesFilterComponent({
	filter,
	availableTags,
	onFilterChange,
	onClearFilter,
}: NotesFilterProps) {
	const hasActiveFilters =
		filter.searchQuery || filter.selectedTags.length > 0 || filter.category;

	const handleTagToggle = (tag: string) => {
		const newTags = filter.selectedTags.includes(tag)
			? filter.selectedTags.filter((t) => t !== tag)
			: [...filter.selectedTags, tag];

		onFilterChange({ selectedTags: newTags });
	};

	const removeTag = (tag: string) => {
		onFilterChange({
			selectedTags: filter.selectedTags.filter((t) => t !== tag),
		});
	};

	return (
		<div className="space-y-4">
			{/* Search Bar */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search notes..."
					value={filter.searchQuery}
					onChange={(e) =>
						onFilterChange({ searchQuery: e.target.value })
					}
					className="pl-10"
				/>
			</div>

			{/* Filter Controls */}
			<div className="flex flex-wrap items-center gap-2">
				<div className="flex items-center gap-2">
					<Filter className="h-4 w-4 text-muted-foreground" />
					<Select
						value={filter.sortBy}
						onValueChange={(
							value: "createdAt" | "updatedAt" | "title"
						) => onFilterChange({ sortBy: value })}
					>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="updatedAt">Updated</SelectItem>
							<SelectItem value="createdAt">Created</SelectItem>
							<SelectItem value="title">Title</SelectItem>
						</SelectContent>
					</Select>

					<Select
						value={filter.sortOrder}
						onValueChange={(value: "asc" | "desc") =>
							onFilterChange({ sortOrder: value })
						}
					>
						<SelectTrigger className="w-24">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="desc">Desc</SelectItem>
							<SelectItem value="asc">Asc</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{hasActiveFilters && (
					<Button
						variant="outline"
						size="sm"
						onClick={onClearFilter}
						className="ml-auto"
					>
						<X className="h-4 w-4 mr-1" />
						Clear
					</Button>
				)}
			</div>

			{/* Selected Tags */}
			{filter.selectedTags.length > 0 && (
				<div className="flex flex-wrap gap-1">
					{filter.selectedTags.map((tag) => (
						<Badge key={tag} variant="default" className="gap-1">
							{tag}
							<X
								className="h-3 w-3 cursor-pointer"
								onClick={() => removeTag(tag)}
							/>
						</Badge>
					))}
				</div>
			)}

			{/* Available Tags */}
			{availableTags.length > 0 && (
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Tags</h4>
					<div className="flex flex-wrap gap-1">
						{availableTags.map((tag) => (
							<Badge
								key={tag}
								variant={
									filter.selectedTags.includes(tag)
										? "default"
										: "outline"
								}
								className="cursor-pointer"
								onClick={() => handleTagToggle(tag)}
							>
								{tag}
							</Badge>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
