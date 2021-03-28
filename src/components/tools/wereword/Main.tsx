import {useMachine} from "@xstate/react";
import {createWerewordMachine} from "./machine";
import {context} from "@opentelemetry/api";
import {Loading} from "../../util/Loading";
import {VscRefresh} from 'react-icons/vsc'
import clsx from "clsx";
import React, {CSSProperties} from "react";
import {WerewordSetup} from "./Setup";
import {WerewordDayTime} from "./Daytime";
import {WerewordNight} from "./Night";
import {WerewordOver} from "./Over";
import Head from "next/head";
import {motion} from "framer-motion";
import {NextSeo} from "next-seo";

export const WerewordMain = () => {
  const [state, send, service] = useMachine(() => createWerewordMachine({}))

  return (
    <div className={'w-11/12 max-w-screen-md h-full flex flex-col'}>
      <Head>
        <title>狼人真言网页版 - XDean</title>
      </Head>
      {typeof window !=='undefined'&&<NextSeo
        title={'狼人真言网页版'}
        description={'桌游 - 狼人真言 - 辅助工具 - 网页版App'}
        openGraph={{
          type: 'website',
          url: window.location.href,
          images: [{
            url: new URL('/tools/wereword/logo.webp', window.location.href).toString(),
          }],
        }}
      />}
      {state.matches('setup') && <WerewordSetup service={service}/>}
      {state.matches('play') && (
        <>
          {state.matches('play.night') && <WerewordNight service={service}/>}
          {state.matches('play.daytime') && <WerewordDayTime service={service}/>}
        </>
      )}
      {state.matches('over')&&<WerewordOver service={service}/>}
    </div>
  )
}
