import React, { useState, useEffect, useContext } from 'react';
import Select from './Select';
import SearchBox from './SearchBox';
import { webOptions, categories } from '../../app/options';
import context from '../../app/context/Context';
import { fetchMlData } from '../../app/services/APICalls';

const Filters = () => {
	const { filters, setActiveData, mlData, setMlData, setLoading, buscapeData } = useContext(context);

	useEffect(() => {
		setLoading(true);

		async function getData() {
			const filteredData = await fetchMlData[filters.category]();
			const newMlData = mlData;
			newMlData[filters.category] = filteredData;

			setMlData(newMlData);
			setActiveData(filteredData);
			return;
		}

		if (filters.api === 'ml') {
			const dataAlreadyFetched = mlData[filters.category].length > 0;
			dataAlreadyFetched ? setActiveData(mlData[filters.category]) : getData();
			setLoading(false);
		}
		if (filters.api === 'buscape') {
			setActiveData(buscapeData[filters.category]);
			setLoading(false);
		}

		if (filters.api === 'all') {
			let allData = [];
			const dataAlreadyFetched = mlData[filters.category].length > 0;
			if (!dataAlreadyFetched) getData();
			allData = [...mlData[filters.category], ...buscapeData[filters.category]];
			setActiveData(allData);
			setLoading(false);
		}
	}, [filters]);

	return (
		<section className='container mx-auto'>
			<div className='flex flex-col justify-center w-[600px]'>
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
