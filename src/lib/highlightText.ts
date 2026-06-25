export type HighlightPart = {
	text: string;
	highlight?: boolean;
};

export function parseHighlightedText(input: string): HighlightPart[] {
	const parts: HighlightPart[] = [];
	const regex = /\[\[([^\]]+)\]\]/g;
	let lastIndex = 0;

	for (const match of input.matchAll(regex)) {
		const index = match.index ?? 0;

		if (index > lastIndex) {
			parts.push({ text: input.slice(lastIndex, index) });
		}

		parts.push({ text: match[1], highlight: true });
		lastIndex = index + match[0].length;
	}

	if (lastIndex < input.length) {
		parts.push({ text: input.slice(lastIndex) });
	}

	return parts.length > 0 ? parts : [{ text: input }];
}
