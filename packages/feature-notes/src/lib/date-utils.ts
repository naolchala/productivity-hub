export function formatDate(date: Date): string {
	const now = new Date();
	const diffInMs = now.getTime() - date.getTime();
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	if (diffInDays === 0) {
		return "Today";
	} else if (diffInDays === 1) {
		return "Yesterday";
	} else if (diffInDays < 7) {
		return `${diffInDays} days ago`;
	} else {
		return date.toLocaleDateString();
	}
}

export function formatDateTime(date: Date): string {
	return date.toLocaleString();
}
