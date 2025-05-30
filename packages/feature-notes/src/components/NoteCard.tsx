"use client";

import type React from "react";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardHeader,
} from "@workspace/ui/components/ui/card";
import { Button } from "@workspace/ui/components/ui/button";
import { Badge } from "@workspace/ui/components/ui/badge";
import { Pin, Edit, Trash2, MoreHorizontal, Eye } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@workspace/ui/components/ui/dropdown-menu";
import type { Note } from "../types/note";
import { formatDate } from "../lib/date-utils";

interface NoteCardProps {
	note: Note;
	onDelete: (id: string) => void;
	onTogglePin: (id: string) => void;
}

export function NoteCard({ note, onDelete, onTogglePin }: NoteCardProps) {
	const handleAction = (e: React.MouseEvent, action: () => void) => {
		e.preventDefault();
		e.stopPropagation();
		action();
	};

	return (
		<Card
			className={`transition-all hover:shadow-md ${note.isPinned ? "ring-2 ring-primary/20 bg-primary/5" : ""}`}
		>
			<CardHeader className="pb-2">
				<div className="flex items-start justify-between">
					<div className="flex-1 min-w-0">
						<Link href={`/notes/${note.id}`} className="block">
							<h3 className="font-semibold text-lg truncate hover:text-primary transition-colors">
								{note.title}
							</h3>
						</Link>
						<p className="text-sm text-muted-foreground">
							{formatDate(note.updatedAt)}
						</p>
					</div>
					<div
						className="flex items-center gap-1"
						onClick={(e) => e.stopPropagation()}
					>
						{note.isPinned && (
							<Pin className="h-4 w-4 text-primary fill-current" />
						)}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0"
								>
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem asChild>
									<Link href={`/notes/${note.id}`}>
										<Eye className="h-4 w-4 mr-2" />
										View
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href={`/notes/${note.id}?edit=true`}>
										<Edit className="h-4 w-4 mr-2" />
										Edit
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={(e) =>
										handleAction(e, () =>
											onTogglePin(note.id)
										)
									}
								>
									<Pin className="h-4 w-4 mr-2" />
									{note.isPinned ? "Unpin" : "Pin"}
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={(e) =>
										handleAction(e, () => onDelete(note.id))
									}
									className="text-destructive"
								>
									<Trash2 className="h-4 w-4 mr-2" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Link href={`/notes/${note.id}`} className="block">
					<p className="text-sm text-muted-foreground line-clamp-3 mb-3">
						{note.content || "No content"}
					</p>
					{note.tags.length > 0 && (
						<div className="flex flex-wrap gap-1">
							{note.tags.slice(0, 3).map((tag) => (
								<Badge
									key={tag}
									variant="secondary"
									className="text-xs"
								>
									{tag}
								</Badge>
							))}
							{note.tags.length > 3 && (
								<Badge variant="outline" className="text-xs">
									+{note.tags.length - 3}
								</Badge>
							)}
						</div>
					)}
				</Link>
			</CardContent>
		</Card>
	);
}
