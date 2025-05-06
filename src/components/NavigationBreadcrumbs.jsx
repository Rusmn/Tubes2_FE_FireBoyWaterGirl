import React from 'react';

function NavigationBreadcrumbs({ currentView, onSwitchView }) {
	return (
		<div className="py-2 px-4 bg-gray-100 text-sm flex items-center border-b">
			<span 
				className={`cursor-pointer ${currentView === 'form' ? 'font-bold' : 'text-blue-600 hover:underline'}`}
				onClick={() => onSwitchView('form')}
			>
				Form Pencarian
			</span>

			{currentView === 'results' && (
				<>
					<span className="mx-2">›</span>
					<span className="font-bold">Hasil Pencarian</span>
				</>
			)}

			{currentView === 'split' && (
				<>
					<span className="mx-2">›</span>
					<span className="font-bold">Split View</span>
				</>
			)}
		</div>
	);
}

export default NavigationBreadcrumbs;
