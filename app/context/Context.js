import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { fetchMlData } from '../services/APICalls';
import { useDebounce } from 'use-debounce';

const DataContext = createContext();

const DEFAULT_FILTERS = {
	api: 'buscape',
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

	const [debouncedFilters] = useDebounce(filters, 300);

	useEffect(() => {
		async function getData() {
			setActiveData(undefined);
			setActiveFilteredData(undefined);

			if (debouncedFilters.api === 'ml') {
				if (mlData[debouncedFilters.category]) {
					setActiveData(mlData[debouncedFilters.category]);
					setLoading(false);
					return;
				}
				const filteredData = await fetchMlData[debouncedFilters.category]();
				setMlData((prevData) => ({ ...prevData, [debouncedFilters.category]: filteredData }));
				setActiveData(filteredData);
				setLoading(false);
				return;
			}

			if (debouncedFilters.api === 'buscape') {
				if (buscapeData[debouncedFilters.category]) {
					setActiveData(buscapeData[debouncedFilters.category]);
					setLoading(false);
					return;
				}
				try {
					const filteredData = buscapeData[debouncedFilters.category];
					setActiveData(filteredData);
					setLoading(false);
				} catch (error) {
					console.error('~~ERROR~~');
					console.error(error);
				}
				return;
			}

			if (debouncedFilters.api === 'all') {
				const mlData = await fetchMlData[debouncedFilters.category]();
				setMlData((prevData) => ({ ...prevData, [debouncedFilters.category]: mlData }));
				setActiveData(mlData);
				setLoading(false);
				try {
					const buscapeData = await buscapeData[debouncedFilters.category];
					setActiveData((prevData) => {
						const newData = [...prevData, ...buscapeData];
						if (newData !== activeData) {
							return newData;
						}
						return prevData;
					});
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
	}, [debouncedFilters, buscapeData, mlData, activeData]);

	const contextValue = useMemo(
		() => ({
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
		}),
		[scrapedData, mlData, buscapeData, filters, activeData, activeFilteredData, loading]
	);

	return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default DataContext;
