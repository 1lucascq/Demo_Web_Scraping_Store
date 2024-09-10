// pages/index.jsx
import React from 'react';
import Filters from '../components/Filters';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

const Home = ({ scrapedData }) => {
	console.log('a', scrapedData[0].name);
	return (
		<>
			<h1> ola: {scrapedData[0].name} </h1>
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
		const URL = process.env.URL || 'http://localhost:3000';
		console.log('URL ----->', URL)
		const res = await fetch(`${URL}/api/scrape`);
		const data = await res.json();
		console.log(data.data[0].name);
		return {
			props: {
				scrapedData: data.data,
			},
		};
	} catch (error) {
		console.error('error ------->', error);
		return {
			props: {
				scrapedData: ['deu ruim'],
			},
		};
	}
}

export default Home;
