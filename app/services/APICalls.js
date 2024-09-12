const ML_LINKS = {
	geladeira: 'https://api.mercadolibre.com//sites/MLB/search?category=MLB181294',
	tv: 'https://api.mercadolibre.com//sites/MLB/search?category=MLB1002',
	celular: 'https://api.mercadolibre.com//sites/MLB/search?category=MLB1055',
};

const BUSCAPE_LINKS = {
	geladeira: 'https://demo-web-scraping-back.vercel.app/geladeira',
	tv: 'https://demo-web-scraping-back.vercel.app/tv',
	celular: 'https://demo-web-scraping-back.vercel.app/celular',
};

const standardizeMLData = (data) => {
	return data.map(product => {
		const { title, price, thumbnail, permalink, id } = product;
		return { title, price, thumbnail, store: 'Mercado Livre', id, link: permalink };
	});
};

const fetchData = async (url) => {
	const response = await fetch(url);
	const fridgesData = await response.json();

	return fridgesData;
};

const fetchMlData = {
	geladeira: async () => {
		const data = await fetchData(ML_LINKS.geladeira);
		const standardizedData = standardizeMLData(data.results);
		return standardizedData;
	},
	tv: async () => {
		const data = await fetchData(ML_LINKS.tv);
		const standardizedData = standardizeMLData(data.results);
		return standardizedData;
	},
	celular: async () => {
		const data = await fetchData(ML_LINKS.celular);
		const standardizedData = standardizeMLData(data.results);
		return standardizedData;
	},
};

const fetchBuscapeData = {
	geladeira: async () => await fetchData(BUSCAPE_LINKS.geladeira, { mode: 'no-cors' }),
	tv: async () => await fetchData(BUSCAPE_LINKS.tv, { mode: 'no-cors' }),
	celular: async () => await fetchData(BUSCAPE_LINKS.celular, { mode: 'no-cors' }),
};

export { fetchMlData };
