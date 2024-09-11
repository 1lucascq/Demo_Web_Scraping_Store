// pages/_app.js
import '../styles/main.css';
import { DataProvider } from '../app/context/Context';

function MyApp({ Component, pageProps }) {
	return (
		<DataProvider>
			<Component {...pageProps} />
		</DataProvider>
	);
}

export default MyApp;
