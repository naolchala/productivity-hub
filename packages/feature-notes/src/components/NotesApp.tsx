"use client";

import { useState } from "react";
import { NotesProvider } from "../context/NotesContext";
import { NotesListPage } from "./NotesListPage";
import { NoteEditorPage } from "./NoteEditorPage";
import { TagsFilterPage } from "./TagsFilterPage";
import type { Note } from "../types/note";

type NotesView = "list" | "editor" | "tags";

interface NotesState {
	view: NotesView;
	editingNote?: Note;
}

export function NotesApp() {
	const [state, setState] = useState<NotesState>({ view: "list" });

	const handleCreateNote = () => {
		setState({ view: "editor", editingNote: undefined });
	};

	const handleEditNote = (note: Note) => {
		setState({ view: "editor", editingNote: note });
	};

	const handleViewNote = (note: Note) => {
		setState({ view: "editor", editingNote: note });
	};

	const handleSaveNote = () => {
		setState({ view: "list", editingNote: undefined });
	};

	const handleCancel = () => {
		setState({ view: "list", editingNote: undefined });
	};

	const handleViewTags = () => {
		setState({ view: "tags", editingNote: undefined });
	};

	const handleBackToList = () => {
		setState({ view: "list", editingNote: undefined });
	};

	return (
		<NotesProvider>
			<div className="min-h-screen bg-background">
				<div className="container mx-auto px-4 py-6">
					{/* Navigation */}
					<nav className="mb-6">
						<div className="flex items-center gap-4">
							<button
								onClick={handleBackToList}
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									state.view === "list"
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								Notes
							</button>
							<button
								onClick={handleViewTags}
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
									state.view === "tags"
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								Tags
							</button>
						</div>
					</nav>

					{/* Content */}
					{state.view === "list" && (
						<NotesListPage
							onCreateNote={handleCreateNote}
							onEditNote={handleEditNote}
							onViewNote={handleViewNote}
						/>
					)}

					{state.view === "editor" && (
						<NoteEditorPage
							note={state.editingNote}
							onSave={handleSaveNote}
							onCancel={handleCancel}
						/>
					)}

					{state.view === "tags" && <TagsFilterPage />}
				</div>
			</div>
		</NotesProvider>
	);
}
