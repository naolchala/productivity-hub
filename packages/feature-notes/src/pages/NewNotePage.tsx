"use client";

import { useNotes } from "../context/NotesContext";
import { NoteEditor } from "../components/NoteEditor";
import type { NoteFormData } from "../types/note";
import "../styles/globals.css";

export default function NewNotePage() {
	const { createNote, isLoading } = useNotes();

	const handleSave = async (data: NoteFormData) => {
		await createNote(data);
	};

	return <NoteEditor onSave={handleSave} isLoading={isLoading} />;
}
