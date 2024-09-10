
import '../src/styles/main.css';
import Provider from '../src/app/context/Provider';

function MyApp({ Component, pageProps }) {
	return (
		<Provider>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
