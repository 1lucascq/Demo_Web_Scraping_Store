import React, { useContext, useEffect } from 'react';
import Filters from '../components/Filters';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import context from '../app/context/Context';

// 'Web scraping functionality has been disabled in this deployment because Vercel does not support an internal Chromium instance required for Puppeteer scraping. Setting up an alternative environment on platforms like Heroku, AWS, or GCP would be necessary, but given the additional complexity and effort involved, it was deemed not worthwhile for this project.';

const Home = ({ URL }) => {
	const { setURL } = useContext(context);

	useEffect(() => {
		setURL(URL);
	}, [URL]);

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
