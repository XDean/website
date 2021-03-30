import {useMachine} from "@xstate/react";
import {createWerewordMachine} from "./machine";
import React, {useEffect} from "react";
import {WerewordSetup} from "./Setup";
import {WerewordDayTime} from "./Daytime";
import {WerewordNight} from "./Night";
import {WerewordOver} from "./Over";
import {useRouter} from "next/router";
import {MySeo} from "../../util/Seo";
import Head from "next/head";
import {motion} from "framer-motion";
import {register} from "../../../util/register_workbox";

export const WerewordMain = () => {
  const [state, send, service] = useMachine(() => createWerewordMachine({}))
  const router = useRouter()

  useEffect(() => register({
    scope: '/tools/wereword',
    start_url: '/tools/wereword',
    sw: '/tools/wereword/sw.js',
  }), [])

  return (
    <div className={'w-11/12 max-w-screen-md h-full flex flex-col'}>
      <Head>
        <link rel='manifest' href='/tools/wereword/manifest.json'/>
      </Head>
      <MySeo
        title={'狼人真言网页版'}
        description={'桌游 - 狼人真言 - 辅助工具 - 网页版App'}
        noindex={false}
        openGraph={{
          type: 'website',
          images: [{
            url: '/tools/wereword/logo_192.webp',
          }],
        }}
      />
      {state.matches('setup') && <WerewordSetup service={service}/>}
      {state.matches('play') && (
        <>
          {state.matches('play.night') && <WerewordNight service={service}/>}
          {state.matches('play.daytime') && <WerewordDayTime service={service}/>}
        </>
      )}
      {state.matches('over') && <WerewordOver service={service}/>}
    </div>
  )
}
