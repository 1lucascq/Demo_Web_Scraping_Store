import React from 'react';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import Filters from './components/Filters';
import Cards from './components/Cards';
export default function App() {
	return (
		<main>
			<Header></Header>
			<SearchBox></SearchBox>
			<Filters></Filters>
			<Cards></Cards>
		</main>
	);
}
