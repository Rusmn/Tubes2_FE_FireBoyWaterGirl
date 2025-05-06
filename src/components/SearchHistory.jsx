import React from 'react';

function SearchHistory({ history, onSelect }) {
	if (!history || history.length === 0) return null;

	return (
		<div className="mt-6 pt-4 border-t">
			<h3 className="text-lg font-medium mb-3">Pencarian Terakhir</h3>
			<div className="flex flex-wrap gap-2">
				{history.map((item, index) => (
					<button
						key={index}
						onClick={() => onSelect(item)}
						className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
					>
						{item.targetElement} ({item.algorithm})
					</button>
				))}
			</div>
		</div>
	);
}

export default SearchHistory;
