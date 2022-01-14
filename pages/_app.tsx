import { AppProps } from 'next/dist/pages/_app';
import '../assets/styles/globals.css';

function MyApp({Component, pageProps, router}: AppProps) {
  // useGA(router);
  return (
    <Component {...pageProps}/>
  );
}

export default MyApp;
