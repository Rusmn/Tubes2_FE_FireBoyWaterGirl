import React from 'react';

function Spinner() {
	return (
		<div className="flex flex-col items-center justify-center p-8">
			<div aria-label="Loading" role="status" className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
			<p className="mt-4 text-gray-600">Mencari recipe elemen...</p>
		</div>
	);
}

export default Spinner;
