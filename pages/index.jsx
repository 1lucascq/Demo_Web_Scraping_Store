import React, { useContext, useEffect } from 'react';
import Filters from '../components/Filters';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import context from '../app/context/Context';
import { fetchMlData } from '../app/services/APICalls';

const scrapErrorMessage =
	'Web scraping functionality has been disabled in this deployment because Vercel does not support an internal Chromium instance required for Puppeteer scraping. Setting up an alternative environment on platforms like Heroku, AWS, or GCP would be necessary, but given the additional complexity and effort involved, it was deemed not worthwhile for this project.';

const Home = ({ URL }) => {
	const { filters, setActiveData, setURL, mlData, setMlData, setLoading, buscapeData } = useContext(context);

	useEffect(() => {
		setURL(URL);
	}, [URL]);

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
		<>
			<Header />
			<Filters />
			<main className='container mx-auto'>
				<Cards />
			</main>
			<Footer />
		</>
	);
};

export async function getServerSideProps() {
	try {
		return {
			props: {
				URL: process.env.NEXT_PUBLIC_URL || process.env.URL || 'http://localhost:3000',
			},
		};
	} catch (error) {
		console.error('Error --->', error);
		return {
			props: {
				URL: process.env.NEXT_PUBLIC_URL || process.env.URL || 'http://localhost:3000',
				errorMessage:
					'Web scraping functionality has been disabled in this deployment because Vercel does not support an internal Chromium instance required for Puppeteer scraping. Setting up an alternative environment on platforms like Heroku, AWS, or GCP would be necessary, but given the additional complexity and effort involved, it was deemed not worthwhile for this project.',
			},
		};
	}
}

export default Home;
