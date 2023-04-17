import React from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import Cards from './components/Cards';
import Footer from './components/Footer';

export default function App() {
	return (
		<main>
			<Header></Header>
			<Filters></Filters>
			<Cards></Cards>
			<Footer></Footer>
		</main>
	);
}
