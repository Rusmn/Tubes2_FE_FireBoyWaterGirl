import React, { useState } from 'react';
import AlgorithmSelector from './AlgorithmSelector';
import ElementInput from './ElementInput';
import ModeToggle from './ModeToggle';
import RecipeCounter from './RecipeCounter';
import { DEFAULT_FORM_VALUES } from '../utils/Constants';

function SearchForm({ onSearch }) {
	const [formState, setFormState] = useState(DEFAULT_FORM_VALUES);

	const handleChange = (field, value) => {
		setFormState(prev => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch({
			...formState,
			mode: formState.isMultiple ? 'multiple' : 'shortest'
		});
	};

	return (
		<form onSubmit={handleSubmit} className="p-4 border rounded">
			<ElementInput 
				value={formState.targetElement}
				onChange={(value) => handleChange('targetElement', value)}
			/>

			<AlgorithmSelector
				selected={formState.algorithm}
				onChange={(value) => handleChange('algorithm', value)}
			/>

			<ModeToggle
				isMultiple={formState.isMultiple}
				onChange={(value) => handleChange('isMultiple', value)}
			/>

			{formState.isMultiple && (
				<RecipeCounter
					value={formState.maxRecipes}
					onChange={(value) => handleChange('maxRecipes', value)}
				/>
			)}

			<button
				type="submit"
				disabled={!formState.targetElement}
				className="w-full p-2 rounded text-white bg-blue-500 disabled:bg-gray-300"
			>
				Cari Resep
			</button>
		</form>
	);
}

export default SearchForm;
