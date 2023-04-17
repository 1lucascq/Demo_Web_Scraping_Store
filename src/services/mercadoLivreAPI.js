const LINKS = {
    fridges: 'https://api.mercadolibre.com//sites/MLB/search?category=MLB181294',
    tvs: 'https://api.mercadolibre.com//sites/MLB/search?category=MLB1002',
    smartphones: 'https://api.mercadolibre.com//sites/MLB/search?category=MLB1055',
}

const fetchMlData = {
    fridges: async () => {
        const response = await fetch(LINKS.fridges);
        const fridgesData = await response.json();

        return fridgesData;
    },
    tvs: async () => {
        const response = await fetch(LINKS.tvs);
        const tvsData = await response.json();

        return tvsData;
    },
    smartphones: async () => {
        const response = await fetch(LINKS.smartphones);
        const smartphonesData = await response.json();

        return smartphonesData;
    }
}

export default fetchMlData;
