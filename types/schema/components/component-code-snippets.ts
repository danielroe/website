export interface ComponentCodeSnippets {
	id: string;
	items: Array<{
		type: string | null;
		code: string | null;
	}>;
}
