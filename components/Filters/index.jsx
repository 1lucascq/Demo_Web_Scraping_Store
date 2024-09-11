import React from 'react';
import Select from './Select';
import SearchBox from './SearchBox';
import { webOptions, categories } from '../../app/options';

const Filters = () => {
	return (
		<section className='container mx-auto'>
			<div className="flex flex-col justify-center w-[600px]">
				<div className=''>
					<div className='mb-4'>
						<SearchBox />
					</div>
					<div className='grid grid-cols-2 gap-2'>
						<Select name='api' label='Api' id='api' options={webOptions} />
						<Select name='categories' label='Categorias' id='categories' options={categories} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Filters;
