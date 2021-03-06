import {CssBaseline, Divider, ThemeProvider} from "@material-ui/core";
import {HeaderView} from "../src/components/Header";
import Head from "next/head";
import MyTheme from '../src/theme/theme'
import {FooterView} from "../src/components/Footer";

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <title>XDean</title>
      </Head>
      <ThemeProvider theme={MyTheme}>
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <CssBaseline/>
          <div style={{position: 'fixed', backgroundColor: '#fafafa', zIndex: 100, width: '100%'}}>
            <HeaderView/>
            <Divider/>
          </div>
          <div style={{marginTop: 90}}/>
          <main style={{flexGrow: 1, margin: '0 auto', position: "relative"}}>
            <Component {...pageProps} />
          </main>
          <Divider style={{margin: '20px auto 0 auto', width: "60%"}}/>
          <div style={{margin: '10px auto 30px auto', width: 'max-content'}}>
            <FooterView/>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default MyApp
