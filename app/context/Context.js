// app/context/Context.js
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMlData } from '../services/APICalls';

const DataContext = createContext();

const DEFAULT_FILTERS = {
	api: 'ml',
	category: 'geladeira',
};

export const DataProvider = ({ children }) => {
	const [scrapedData, setScrapedData] = useState([]);
	const [mlData, setMlData] = useState({});
	const [buscapeData, setBuscapeData] = useState({});
	const [filters, setFilters] = useState(DEFAULT_FILTERS);
	const [activeData, setActiveData] = useState([]);
	const [activeFilteredData, setActiveFilteredData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getData() {
			setActiveData(undefined);
			setActiveFilteredData(undefined);

			if (filters.api === 'ml') {
				const filteredData = await fetchMlData[filters.category]();
				setActiveData(filteredData);
				setLoading(false);
				return;
			}

			if (filters.api === 'buscape') {
				try {
					const filteredData = buscapeData[filters.category];
					setActiveData(filteredData);
					setLoading(false);
				} catch (error) {
					console.error('~~ERROR~~');
					console.error(error);
				}
				return;
			}

			if (filters.api === 'all') {
				const mlData = await fetchMlData[filters.category]();
				setActiveData(...mlData);
				setLoading(false);
				try {
					const buscapeData = await buscapeData[filters.category];
					setActiveData((prevData) => [...prevData, ...buscapeData]);
					setLoading(false);
				} catch (error) {
					const filteredData = [...mlData];
					setActiveData(filteredData);
					setLoading(false);
					console.error('~~ERROR~~');
					console.error(error);
				}
				return;
			}
		}
		getData();
	}, [filters]);

	return (
		<DataContext.Provider
			value={{
				scrapedData,
				setScrapedData,
				mlData,
				setMlData,
				buscapeData,
				setBuscapeData,
				filters,
				setFilters,
				activeData,
				setActiveData,
				activeFilteredData,
				setActiveFilteredData,
				loading,
				setLoading,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

DataProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default DataContext;
