import {useEffect} from "react";
import * as gtag from "../../util/gtag";
import {NextRouter} from "next/router";

export const GAScrips = ({id, router}: { id: string, router: NextRouter }) => {

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
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}/>
      <script dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${id}');`
      }}/>
    </>
  )
}