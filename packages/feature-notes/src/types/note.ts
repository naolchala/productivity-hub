export interface Note {
	id: string;
	title: string;
	content: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
	isPinned: boolean;
	category?: string;
}

export interface NoteFormData {
	title: string;
	content: string;
	tags: string[];
	category?: string;
	isPinned?: boolean;
}

export interface NotesFilter {
	searchQuery: string;
	selectedTags: string[];
	category?: string;
	sortBy: "createdAt" | "updatedAt" | "title";
	sortOrder: "asc" | "desc";
}

export interface NotesContextType {
	notes: Note[];
	filteredNotes: Note[];
	filter: NotesFilter;
	isLoading: boolean;
	error: string | null;
	createNote: (data: NoteFormData) => Promise<Note>;
	updateNote: (id: string, data: Partial<NoteFormData>) => Promise<void>;
	deleteNote: (id: string) => Promise<void>;
	togglePin: (id: string) => Promise<void>;
	setFilter: (filter: Partial<NotesFilter>) => void;
	clearFilter: () => void;
	getNoteById: (id: string) => Note | undefined;
}
