import {CssBaseline, Divider} from "@material-ui/core";
import {HeaderView} from "../src/components/Header";
import Head from "next/head";

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <title>XDean</title>
      </Head>
      <CssBaseline/>
      <HeaderView/>
      <Divider/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
