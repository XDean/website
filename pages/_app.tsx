import Head from "next/head";
import {GA_TRACKING_ID} from '../src/util/gtag'
import {AppProps} from "next/dist/pages/_app";
import {AnimatePresence} from 'framer-motion';
import {DefaultLayout} from "../src/components/layout/Default";
import {GAScrips} from "../src/components/util/GA";
import '../assets/styles/globals.css'
import {DefaultSeo} from "next-seo";

function MyApp({Component, pageProps, router}: AppProps) {
  const Layout = (Component as any).Layout || DefaultLayout
  // noinspection HtmlRequiredTitleElement
  return (
    <>
      <DefaultSeo
        defaultTitle={'XDean的个人网站'}
        titleTemplate={'%s | XDean'}
        noindex={true}
        nofollow={false}
        openGraph={{
          locale: 'zh',
          site_name: 'XDean的个人网站',
        }}
      />
      <Head>
        <meta name='viewport'
              content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'/>
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
