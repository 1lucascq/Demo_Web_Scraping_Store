// app/context/Context.js
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { mockedBuscapeData } from '../options';

const DataContext = createContext();

const DEFAULT_FILTERS = {
	api: 'buscape',
	category: 'geladeira',
};

export const DataProvider = ({ children }) => {
	const [mlData, setMlData] = useState({ tv: [], celular: [], geladeira: [] });
	const [buscapeData, setBuscapeData] = useState({ tv: [], celular: [], geladeira: [] });
	const [filters, setFilters] = useState(DEFAULT_FILTERS);
	const [activeData, setActiveData] = useState([]);
	const [activeFilteredData, setActiveFilteredData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [URL, setURL] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [responseTv, responseCelular, responseGeladeira] = await Promise.all([
					fetch(`${URL}/api/scrape?product=tv`),
					fetch(`${URL}/api/scrape?product=celular`),
					fetch(`${URL}/api/scrape?product=geladeira`),
				]);

				if (!responseTv.ok || !responseCelular.ok || !responseGeladeira.ok) {
					throw new Error('One or more fetch requests failed');
				}

				const [tv, celular, geladeira] = await Promise.all([responseTv.json(), responseCelular.json(), responseGeladeira.json()]);
				const buscapeData = { tv, celular, geladeira };

				setBuscapeData(buscapeData);
				setActiveData(buscapeData[filters.category]);
			} catch (err) {
				setBuscapeData(mockedBuscapeData);
				setActiveData(buscapeData[filters.category]);
			}
		};

		if (URL) {
			fetchData();
		}
	}, [URL]);

	return (
		<DataContext.Provider
			value={{
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
				URL,
				setURL,
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
