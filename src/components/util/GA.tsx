import {useEffect} from "react";
import {NextRouter} from "next/router";
import ReactGA from 'react-ga'

const id = 'UA-145930182-1'

export const useGA = (router: NextRouter) => {
  useEffect(() => {
    service.init();
    service.pageview(router.asPath)
  }, [])
  useEffect(() => {
    const handleRouteChange = (url) => service.pageview(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

const dev = {
  init: () => {
    console.info('[ga] init')
  }, pageview: (url: string) => {
    console.info('[ga] pageview', url)
  }
}

const prod = {
  init: () => ReactGA.initialize(id),
  pageview: (url: string) => ReactGA.pageview(url)
}

const service = process.env.NODE_ENV === "production" ? prod : dev