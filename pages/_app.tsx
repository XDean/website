import Head from "next/head";
import {AppProps} from "next/dist/pages/_app";
import {AnimatePresence} from 'framer-motion';
import {DefaultLayout} from "../src/components/layout/Default";
import {useGA} from "../src/components/util/GA";
import '../assets/styles/globals.css'
import {DefaultSeo} from "next-seo";

function MyApp({Component, pageProps, router}: AppProps) {
  const Layout = (Component as any).Layout || DefaultLayout
  useGA(router)
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
