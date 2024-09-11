import React, { useEffect, useContext, useState } from 'react';
import Filters from '../components/Filters';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import DataContext from '../app/context/Context';
import { mockedBuscapeData } from '../app/options';

const scrapErrorMessage =
	'Web scraping functionality has been disabled in this deployment because Vercel does not support an internal Chromium instance required for Puppeteer scraping. Setting up an alternative environment on platforms like Heroku, AWS, or GCP would be necessary, but given the additional complexity and effort involved, it was deemed not worthwhile for this project.';

const Home = ({ errorMessage }) => {
	const { setBuscapeData } = useContext(DataContext);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const baseURL = process.env.URL || 'http://localhost:3000';

				const [responseTv, responseCelular, responseGeladeira] = await Promise.all([
					fetch(`${baseURL}/api/scrape?product=tv`),
					fetch(`${baseURL}/api/scrape?product=celular`),
					fetch(`${baseURL}/api/scrape?product=geladeira`),
				]);
				const [tv, celular, geladeira] = await Promise.all([responseTv.json(), responseCelular.json(), responseGeladeira.json()]);
				const buscapeData = { tv, celular, geladeira };

				setBuscapeData(buscapeData);
			} catch (err) {
				setBuscapeData(mockedBuscapeData);
				setError(scrapErrorMessage);
			}
		};

		fetchData();
	}, [setBuscapeData]);

	return (
		<>
			<h1>{error ? errorMessage : null}</h1>
			<Header />
			<Filters />
			<main>
				<Cards />
			</main>
			<Footer />
		</>
	);
};

export async function getServerSideProps() {
	try {
		// Mock data, or you can return an error message as needed
		return {
			props: {
				errorMessage: 'There was an issue fetching data from the server.',
			},
		};
	} catch (error) {
		console.error('Error --->', error);
		return {
			props: {
				errorMessage:
					'Web scraping functionality has been disabled in this deployment because Vercel does not support an internal Chromium instance required for Puppeteer scraping. Setting up an alternative environment on platforms like Heroku, AWS, or GCP would be necessary, but given the additional complexity and effort involved, it was deemed not worthwhile for this project.',
			},
		};
	}
}

export default Home;
