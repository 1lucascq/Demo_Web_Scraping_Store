const ML_LINKS = {
    geladeira: 'https://api.mercadolibre.com//sites/MLB/search?category=MLB181294',
    tv: 'https://api.mercadolibre.com//sites/MLB/search?category=MLB1002',
    celular: 'https://api.mercadolibre.com//sites/MLB/search?category=MLB1055',
}

const BUSCAPE_LINKS = {
    geladeira: 'https://lexart-labs-backend.onrender.com/geladeira',
    tv: 'https://lexart-labs-backend.onrender.com/tv',
    celular: 'https://lexart-labs-backend.onrender.com/celular',
}

const fetchData = async (url) => {
    const response = await fetch(url);
    const fridgesData = await response.json();

    return fridgesData;
}

const fetchMlData = {
    geladeira: async () => (await fetchData(ML_LINKS.geladeira)).results,
    tv: async () => (await fetchData(ML_LINKS.tv)).results,
    celular: async () => (await fetchData(ML_LINKS.celular)).results
}

const fetchBuscapeData = {
    geladeira: async () => await fetchData(BUSCAPE_LINKS.geladeira, {mode: 'no-cors'}),
    tv: async () => await fetchData(BUSCAPE_LINKS.tv, {mode: 'no-cors'}),
    celular: async () => await fetchData(BUSCAPE_LINKS.celular, {mode: 'no-cors'})
}

export {fetchMlData, fetchBuscapeData};
