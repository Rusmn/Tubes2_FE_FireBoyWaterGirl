// Elemen dasar
export const BASIC_ELEMENTS = ['Air', 'Earth', 'Fire', 'Water'];

// Mode pencarian
export const SEARCH_MODES = {
	SHORTEST: 'shortest',
	MULTIPLE: 'multiple'
};

// Algoritma pencarian
export const ALGORITHMS = {
	BFS: 'bfs',
	DFS: 'dfs',
	BIDIRECTIONAL: 'bidirectional'
};

// Nilai default untuk form
export const DEFAULT_FORM_VALUES = {
	targetElement: '',
	algorithm: ALGORITHMS.BFS,
	isMultiple: false,
	maxRecipes: 5
};
