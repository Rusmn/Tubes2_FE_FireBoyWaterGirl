import React from 'react';

function TreeNode({ element, isBasic, children }) {
	return (
		<div className="relative">
			<div className={`p-2 rounded border ${isBasic ? 'bg-green-100 border-green-300' : 'bg-blue-100 border-blue-300'}`}>
				<span className="font-medium">{element}</span>
				{isBasic && <span className="text-xs ml-1 text-gray-500">(Elemen Dasar)</span>}
			</div>

			{children && (
				<div className="ml-8 mt-2 pl-2 border-l-2 border-gray-300">
					{children}
				</div>
			)}
		</div>
	);
}

export default TreeNode;
