import {CssBaseline, Divider, ThemeProvider} from "@material-ui/core";
import {HeaderView} from "../src/components/Header";
import Head from "next/head";
import MyTheme from '../src/theme/theme'
import {FooterView} from "../src/components/Footer";
import "tailwindcss/tailwind.css";

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <title>XDean</title>
      </Head>
      <div className={'flex flex-col m-h-screen w-full font-mono text-p bg-p'}>
        <div className={'z-50 sticky top-0 w-full mb-3 md:mb-6'}>
          <HeaderView/>
        </div>
        <main className={"flex relative w-full m-w-max flex-grow flex-row justify-around color-p"}>
          <Component {...pageProps} />
        </main>
        <Divider style={{margin: '20px auto 0 auto', width: "60%"}}/>
        <div style={{margin: '10px auto 30px auto', width: 'max-content'}}>
          <FooterView/>
        </div>
      </div>
    </>
  )
}

export default MyApp
