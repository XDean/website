import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'

const APP_NAME = 'XDean'
const APP_DESCRIPTION = 'XDean的主页'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx)
  }

  render(): JSX.Element {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html lang={'zh'}>
        <Head>
          <meta name='application-name' content={APP_NAME} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='description' content={APP_DESCRIPTION} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#FFFFFF' />
          <link rel='apple-touch-icon' sizes='180x180' href='/icons/512.webp' />
          <link rel='shortcut icon' href='/icons/192.webp' />
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument