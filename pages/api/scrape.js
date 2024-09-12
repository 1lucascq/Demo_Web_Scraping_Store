import puppeteer from 'puppeteer-extra';
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const stealth = StealthPlugin();
stealth.enabledEvasions.clear();
puppeteer.use(stealth);

export default async function handler(req, res) {
    const product = req.query.product || 'tv';
	const URL = `https://www.buscape.com.br/${product}`;

	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: [
				'--disable-setuid-sandbox',
				'--no-sandbox',
				'--no-single-process',
				'--no-zygote',
				'--enable-webgl',
				'--use-gl=desktop',
				'--disable-dev-shm-usage',
				'--disable-gpu',
			],
		});

		const page = await browser.newPage();

		await page.setUserAgent(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
		);

		await page.setViewport({ width: 1280, height: 800 });

		await page.setRequestInterception(true);
		page.on('request', (req) => {
			const resourceType = req.resourceType();
			if (['stylesheet', 'font', 'image'].includes(resourceType)) {
				req.abort();
			} else {
				req.continue();
			}
		});

		await page.goto(URL, {
			waitUntil: 'domcontentloaded',
		});

		await page.waitForSelector('[data-testid="product-card"]', { timeout: 15000 });

		const productsData = await page.$$eval('[data-testid="product-card::card"]', (productCards) => {
			return productCards.slice(0, 17)
				.filter(card => !card.href.includes('lead'))
				.map((card, index) => {
					const title = card.querySelector('[data-testid="product-card::name"]')?.textContent || 'No name';
					const price = card.querySelector('[data-testid="product-card::price"]')?.textContent || 'No price';
					const thumbnail = card.querySelector('[data-testid="product-card::image"] img')?.src || 'No image';
					return { title, price, thumbnail, store: 'Buscapé', id: index, link: card.href };
				});
		});

		await browser.close();

		return res.status(200).json(productsData);
	} catch (err) {
		console.error(`Error scraping product data from: ${product}`);
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
