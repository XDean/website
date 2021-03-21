import Head from "next/head";
import "tailwindcss/tailwind.css";
import {GA_TRACKING_ID} from '../src/util/gtag'
import {AppProps} from "next/dist/pages/_app";
import {AnimatePresence} from 'framer-motion';
import {DefaultLayout} from "../src/components/layout/Default";
import {GAScrips} from "../src/components/util/GA";

function MyApp({Component, pageProps, router}: AppProps) {
  const Layout = (Component as any).Layout || DefaultLayout
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <title>XDean</title>
        <GAScrips id={GA_TRACKING_ID} router={router}/>
      </Head>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route}/>
        </AnimatePresence>
      </Layout>
    </>
  )
}

export default MyApp
