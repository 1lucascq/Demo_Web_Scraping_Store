import React from 'react';
import Select from './Select';
import SearchBox from './SearchBox';
import { webOptions, categories } from '../../app/options';

const Filters = () => {
	return (
		<section className='filters p-6 rounded-md shadow-md'>
			<div className='space-y-4'>
				<SearchBox />
				<Select name='api' label='Api' id='api' options={webOptions} />
				<Select name='categories' label='Categorias' id='categories' options={categories} />
			</div>
		</section>
	);
};

export default Filters;
