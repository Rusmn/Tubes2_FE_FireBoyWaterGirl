import React from 'react';

function ModeToggle({ isMultiple, onChange }) {
	return (
		<div className="mb-4">
			<label className="block mb-2 font-medium">Mode Pencarian:</label>
			<div className="flex items-center">
				<span className={isMultiple ? '' : 'font-bold'}>Shortest Path</span>
				<div className="relative mx-3 inline-block w-10 align-middle">
					<input
						type="checkbox"
						id="mode-toggle"
						checked={isMultiple}
						onChange={(e) => onChange(e.target.checked)}
						className="sr-only peer"
					/>
					<div className="h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-blue-500"></div>
					<div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-all peer-checked:left-5"></div>
				</div>
				<span className={isMultiple ? 'font-bold' : ''}>Multiple Recipes</span>
			</div>
		</div>
	);
}

export default ModeToggle;
