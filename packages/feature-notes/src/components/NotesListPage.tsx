"use client";

import React, { useState } from "react";
import { Button } from "@workspace/ui/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/ui/card";
import { Plus, FileText, Filter } from "lucide-react";
import { useNotes } from "../context/NotesContext";
import { NoteCard } from "./NoteCard";
import { NotesFilterComponent } from "./NotesFilter";
import type { Note } from "../types/note";

interface NotesListPageProps {
	onCreateNote: () => void;
	onEditNote: (note: Note) => void;
	onViewNote: (note: Note) => void;
}

export function NotesListPage({
	onCreateNote,
	onEditNote,
	onViewNote,
}: NotesListPageProps) {
	const {
		filteredNotes,
		filter,
		isLoading,
		deleteNote,
		togglePin,
		setFilter,
		clearFilter,
		notes,
	} = useNotes();

	const [showFilters, setShowFilters] = useState(false);

	// Get all unique tags from notes
	const availableTags = React.useMemo(() => {
		const tagSet = new Set<string>();
		notes.forEach((note) => {
			note.tags.forEach((tag) => tagSet.add(tag));
		});
		return Array.from(tagSet).sort();
	}, [notes]);

	const handleDeleteNote = async (id: string) => {
		if (window.confirm("Are you sure you want to delete this note?")) {
			await deleteNote(id);
		}
	};

	if (isLoading && notes.length === 0) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
					<p className="text-muted-foreground">Loading notes...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Notes</h1>
					<p className="text-muted-foreground">
						{filteredNotes.length} of {notes.length} notes
					</p>
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						onClick={() => setShowFilters(!showFilters)}
						className="gap-2"
					>
						<Filter className="h-4 w-4" />
						Filters
					</Button>
					<Button onClick={onCreateNote} className="gap-2">
						<Plus className="h-4 w-4" />
						New Note
					</Button>
				</div>
			</div>

			{/* Filters */}
			{showFilters && (
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Filters</CardTitle>
					</CardHeader>
					<CardContent>
						<NotesFilterComponent
							filter={filter}
							availableTags={availableTags}
							onFilterChange={setFilter}
							onClearFilter={clearFilter}
						/>
					</CardContent>
				</Card>
			)}

			{/* Notes Grid */}
			{filteredNotes.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<FileText className="h-12 w-12 text-muted-foreground mb-4" />
						<h3 className="text-lg font-semibold mb-2">
							{notes.length === 0
								? "No notes yet"
								: "No notes match your filters"}
						</h3>
						<p className="text-muted-foreground text-center mb-4">
							{notes.length === 0
								? "Create your first note to get started with organizing your thoughts."
								: "Try adjusting your search criteria or clearing the filters."}
						</p>
						{notes.length === 0 ? (
							<Button onClick={onCreateNote} className="gap-2">
								<Plus className="h-4 w-4" />
								Create Your First Note
							</Button>
						) : (
							<Button variant="outline" onClick={clearFilter}>
								Clear Filters
							</Button>
						)}
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredNotes.map((note) => (
						<NoteCard
							key={note.id}
							note={note}
							onDelete={handleDeleteNote}
							onTogglePin={togglePin}
						/>
					))}
				</div>
			)}
		</div>
	);
}
