"use client";

import { useNotes } from "../context/NotesContext";
import { NoteEditor } from "./NoteEditor";
import type { Note, NoteFormData } from "../types/note";

interface NoteEditorPageProps {
	note?: Note;
	onSave: () => void;
	onCancel: () => void;
}

export function NoteEditorPage({
	note,
	onSave,
	onCancel,
}: NoteEditorPageProps) {
	const { createNote, updateNote, isLoading } = useNotes();

	const handleSave = async (data: NoteFormData) => {
		try {
			if (note) {
				await updateNote(note.id, data);
			} else {
				await createNote(data);
			}
			onSave();
		} catch (error) {
			console.error("Failed to save note:", error);
		}
	};

	return (
		<div className="container mx-auto py-6">
			<NoteEditor note={note} onSave={handleSave} isLoading={isLoading} />
		</div>
	);
}
