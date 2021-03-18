import {HeaderView} from "../src/components/Header";
import Head from "next/head";
import {FooterView} from "../src/components/Footer";
import "tailwindcss/tailwind.css";
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import * as gtag from '../src/util/gtag'

function MyApp({Component, pageProps}) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <title>XDean</title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-145930182-1"/>
        <script dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-145930182-1');`
        }}/>
      </Head>
      <div className={'flex flex-col w-full min-h-screen font-sans text-p bg-p'}>
        <div className={'z-50 sticky top-0 w-full mb-3 md:mb-6'}>
          <HeaderView/>
        </div>
        <main className={"flex relative w-full m-w-max flex-grow flex-row justify-around bg-p"}>
          <Component {...pageProps} />
        </main>
        <div className={'mt-2 mx-auto mb-8 w-10/12 border-t text-center'}>
          <FooterView/>
        </div>
      </div>
    </>
  )
}

export default MyApp
