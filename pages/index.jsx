import React, { useEffect, useContext, useState } from 'react';
import Filters from '../components/Filters';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import DataContext from '../app/context/Context';
import { mockedBuscapeData } from '../app/options';

const scrapErrorMessage =
	'Web scraping functionality has been disabled in this deployment because Vercel does not support an internal Chromium instance required for Puppeteer scraping. Setting up an alternative environment on platforms like Heroku, AWS, or GCP would be necessary, but given the additional complexity and effort involved, it was deemed not worthwhile for this project.';

const Home = ({ URL }) => {
	const { setBuscapeData } = useContext(DataContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [responseTv, responseCelular, responseGeladeira] = await Promise.all([
					fetch(`${URL}/api/scrape?product=tv`),
					fetch(`${URL}/api/scrape?product=celular`),
					fetch(`${URL}/api/scrape?product=geladeira`),
				]);
				const [tv, celular, geladeira] = await Promise.all([responseTv.json(), responseCelular.json(), responseGeladeira.json()]);
				const buscapeData = { tv, celular, geladeira };

				setBuscapeData(buscapeData);
			} catch (err) {
				console.log(mockedBuscapeData)
				setBuscapeData(mockedBuscapeData);
			}
		};

		fetchData();
	}, [setBuscapeData]);

	return (
		<>
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
