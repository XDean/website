import {AppProps} from 'next/dist/pages/_app';
import '../assets/styles/globals.css';
import Head from 'next/head';
import {BaiduAnalytics} from '../common/util/analytics/baidu';

function MyApp({Component, pageProps, router}: AppProps) {
  return (
    <>
      <Head>
        <title>XDean的主页</title>
        <BaiduAnalytics id={'0ed976ca2cbb9131a67d1b3b1da74aa2'}/>
      </Head>
      <Component {...pageProps}/>
    </>
  );
}

export default MyApp;
