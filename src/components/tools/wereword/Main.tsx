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

export const WerewordMain = () => {
  const [state, send, service] = useMachine(() => createWerewordMachine({nightTime: 1000}))

  return (
    <div className={'w-11/12 max-w-screen-md h-full flex flex-col'}>
      <Head>
        <title>狼人真言网页版 - XDean</title>
      </Head>
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
