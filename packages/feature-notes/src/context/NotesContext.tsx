"use client";

import React, {
	createContext,
	useContext,
	useReducer,
	type ReactNode,
} from "react";
import type {
	Note,
	NoteFormData,
	NotesFilter,
	NotesContextType,
} from "../types/note";

interface NotesState {
	notes: Note[];
	filter: NotesFilter;
	isLoading: boolean;
	error: string | null;
}

type NotesAction =
	| { type: "SET_LOADING"; payload: boolean }
	| { type: "SET_ERROR"; payload: string | null }
	| { type: "SET_NOTES"; payload: Note[] }
	| { type: "ADD_NOTE"; payload: Note }
	| { type: "UPDATE_NOTE"; payload: { id: string; data: Partial<Note> } }
	| { type: "DELETE_NOTE"; payload: string }
	| { type: "SET_FILTER"; payload: Partial<NotesFilter> }
	| { type: "CLEAR_FILTER" };

const initialFilter: NotesFilter = {
	searchQuery: "",
	selectedTags: [],
	category: undefined,
	sortBy: "updatedAt",
	sortOrder: "desc",
};

const initialState: NotesState = {
	notes: [
		{
			id: "1",
			title: "Welcome to Notes",
			content:
				"This is your first note! You can create, edit, and organize your notes with tags and categories. Use the navigation to explore different features.",
			tags: ["welcome", "getting-started"],
			createdAt: new Date(Date.now() - 86400000),
			updatedAt: new Date(Date.now() - 86400000),
			isPinned: true,
			category: "General",
		},
		{
			id: "2",
			title: "Project Ideas",
			content:
				"Here are some project ideas to work on:\n\n1. Build a task management app\n2. Create a personal blog\n3. Learn TypeScript\n4. Contribute to open source\n5. Build a portfolio website",
			tags: ["projects", "ideas", "development"],
			createdAt: new Date(Date.now() - 172800000),
			updatedAt: new Date(Date.now() - 3600000),
			isPinned: false,
			category: "Work",
		},
		{
			id: "3",
			title: "Meeting Notes",
			content:
				"Team meeting notes from today:\n- Discussed new feature requirements\n- Set deadlines for next sprint\n- Assigned tasks to team members",
			tags: ["meeting", "work", "team"],
			createdAt: new Date(Date.now() - 7200000),
			updatedAt: new Date(Date.now() - 1800000),
			isPinned: false,
			category: "Work",
		},
	],
	filter: initialFilter,
	isLoading: false,
	error: null,
};

function notesReducer(state: NotesState, action: NotesAction): NotesState {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, isLoading: action.payload };
		case "SET_ERROR":
			return { ...state, error: action.payload };
		case "SET_NOTES":
			return { ...state, notes: action.payload };
		case "ADD_NOTE":
			return { ...state, notes: [action.payload, ...state.notes] };
		case "UPDATE_NOTE":
			return {
				...state,
				notes: state.notes.map((note) =>
					note.id === action.payload.id
						? {
								...note,
								...action.payload.data,
								updatedAt: new Date(),
							}
						: note
				),
			};
		case "DELETE_NOTE":
			return {
				...state,
				notes: state.notes.filter((note) => note.id !== action.payload),
			};
		case "SET_FILTER":
			return { ...state, filter: { ...state.filter, ...action.payload } };
		case "CLEAR_FILTER":
			return { ...state, filter: initialFilter };
		default:
			return state;
	}
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(notesReducer, initialState);

	// Filter and sort notes
	const filteredNotes = React.useMemo(() => {
		let filtered = [...state.notes];

		// Apply search filter
		if (state.filter.searchQuery) {
			const query = state.filter.searchQuery.toLowerCase();
			filtered = filtered.filter(
				(note) =>
					note.title.toLowerCase().includes(query) ||
					note.content.toLowerCase().includes(query) ||
					note.tags.some((tag) => tag.toLowerCase().includes(query))
			);
		}

		// Apply tags filter
		if (state.filter.selectedTags.length > 0) {
			filtered = filtered.filter((note) =>
				state.filter.selectedTags.every((tag) =>
					note.tags.includes(tag)
				)
			);
		}

		// Apply category filter
		if (state.filter.category) {
			filtered = filtered.filter(
				(note) => note.category === state.filter.category
			);
		}

		// Sort notes
		filtered.sort((a, b) => {
			const { sortBy, sortOrder } = state.filter;
			let comparison = 0;

			switch (sortBy) {
				case "title":
					comparison = a.title.localeCompare(b.title);
					break;
				case "createdAt":
					comparison =
						new Date(a.createdAt).getTime() -
						new Date(b.createdAt).getTime();
					break;
				case "updatedAt":
					comparison =
						new Date(a.updatedAt).getTime() -
						new Date(b.updatedAt).getTime();
					break;
			}

			return sortOrder === "asc" ? comparison : -comparison;
		});

		// Pin notes to top
		const pinned = filtered.filter((note) => note.isPinned);
		const unpinned = filtered.filter((note) => !note.isPinned);

		return [...pinned, ...unpinned];
	}, [state.notes, state.filter]);

	const createNote = async (data: NoteFormData): Promise<Note> => {
		dispatch({ type: "SET_LOADING", payload: true });
		try {
			const newNote: Note = {
				id: Date.now().toString(),
				...data,
				createdAt: new Date(),
				updatedAt: new Date(),
				isPinned: data.isPinned || false,
			};
			dispatch({ type: "ADD_NOTE", payload: newNote });
			return newNote;
		} catch (error) {
			dispatch({ type: "SET_ERROR", payload: "Failed to create note" });
			throw error;
		} finally {
			dispatch({ type: "SET_LOADING", payload: false });
		}
	};

	const updateNote = async (id: string, data: Partial<NoteFormData>) => {
		dispatch({ type: "SET_LOADING", payload: true });
		try {
			dispatch({ type: "UPDATE_NOTE", payload: { id, data } });
		} catch (error) {
			dispatch({ type: "SET_ERROR", payload: "Failed to update note" });
			throw error;
		} finally {
			dispatch({ type: "SET_LOADING", payload: false });
		}
	};

	const deleteNote = async (id: string) => {
		try {
			dispatch({ type: "DELETE_NOTE", payload: id });
		} catch (error) {
			dispatch({ type: "SET_ERROR", payload: "Failed to delete note" });
			throw error;
		}
	};

	const togglePin = async (id: string) => {
		const note = state.notes.find((n) => n.id === id);
		if (note) {
			await updateNote(id, { isPinned: !note.isPinned });
		}
	};

	const getNoteById = (id: string): Note | undefined => {
		return state.notes.find((note) => note.id === id);
	};

	const setFilter = (filter: Partial<NotesFilter>) => {
		dispatch({ type: "SET_FILTER", payload: filter });
	};

	const clearFilter = () => {
		dispatch({ type: "CLEAR_FILTER" });
	};

	const value: NotesContextType = {
		notes: state.notes,
		filteredNotes,
		filter: state.filter,
		isLoading: state.isLoading,
		error: state.error,
		createNote,
		updateNote,
		deleteNote,
		togglePin,
		getNoteById,
		setFilter,
		clearFilter,
	};

	return (
		<NotesContext.Provider value={value}>{children}</NotesContext.Provider>
	);
}

export function useNotes() {
	const context = useContext(NotesContext);
	if (context === undefined) {
		throw new Error("useNotes must be used within a NotesProvider");
	}
	return context;
}
