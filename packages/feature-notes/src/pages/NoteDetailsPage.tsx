"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useNotes } from "../context/NotesContext";
import { NoteEditor } from "../components/NoteEditor";
import {
	Card,
	CardContent,
	CardHeader,
} from "@workspace/ui/components/ui/card";
import { Button } from "@workspace/ui/components/ui/button";
import { Badge } from "@workspace/ui/components/ui/badge";
import { ArrowLeft, Edit, Pin, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDateTime } from "../lib/date-utils";
import type { NoteFormData } from "../types/note";

import "../styles/globals.css";

export default function NotePage() {
	const params = useParams();
	const searchParams = useSearchParams();
	const { getNoteById, updateNote, deleteNote, togglePin, isLoading } =
		useNotes();

	const noteId = params.id as string;
	const isEditing = searchParams.get("edit") === "true";
	const note = getNoteById(noteId);

	if (!note) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/notes">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Notes
						</Link>
					</Button>
				</div>
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<h3 className="text-lg font-semibold mb-2">
							Note not found
						</h3>
						<p className="text-muted-foreground mb-4">
							The note you're looking for doesn't exist.
						</p>
						<Button asChild>
							<Link href="/notes">Back to Notes</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (isEditing) {
		const handleSave = async (data: NoteFormData) => {
			await updateNote(noteId, data);
		};

		return (
			<NoteEditor note={note} onSave={handleSave} isLoading={isLoading} />
		);
	}

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this note?")) {
			await deleteNote(noteId);
			window.location.href = "/notes";
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/notes">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Notes
						</Link>
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" onClick={() => togglePin(noteId)}>
						<Pin
							className={`h-4 w-4 mr-2 ${note.isPinned ? "fill-current" : ""}`}
						/>
						{note.isPinned ? "Unpin" : "Pin"}
					</Button>
					<Button variant="outline" asChild>
						<Link href={`/notes/${noteId}?edit=true`}>
							<Edit className="h-4 w-4 mr-2" />
							Edit
						</Link>
					</Button>
					<Button variant="destructive" onClick={handleDelete}>
						<Trash2 className="h-4 w-4 mr-2" />
						Delete
					</Button>
				</div>
			</div>

			{/* Note Content */}
			<Card>
				<CardHeader>
					<div className="flex items-start justify-between">
						<div className="space-y-2">
							<h1 className="text-2xl font-bold">{note.title}</h1>
							<div className="flex items-center gap-4 text-sm text-muted-foreground">
								<span>
									Created: {formatDateTime(note.createdAt)}
								</span>
								<span>
									Updated: {formatDateTime(note.updatedAt)}
								</span>
								{note.category && (
									<span>Category: {note.category}</span>
								)}
							</div>
						</div>
						{note.isPinned && (
							<Pin className="h-5 w-5 text-primary fill-current" />
						)}
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="prose max-w-none">
						<pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
							{note.content}
						</pre>
					</div>
					{note.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{note.tags.map((tag) => (
								<Badge key={tag} variant="secondary">
									{tag}
								</Badge>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
