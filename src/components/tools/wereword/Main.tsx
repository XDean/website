import {useMachine} from "@xstate/react";
import {createWerewordMachine} from "./machine";
import React from "react";
import {WerewordSetup} from "./Setup";
import {WerewordDayTime} from "./Daytime";
import {WerewordNight} from "./Night";
import {WerewordOver} from "./Over";
import {useRouter} from "next/router";
import {MySeo} from "../../util/Seo";

export const WerewordMain = () => {
  const [state, send, service] = useMachine(() => createWerewordMachine({}))
  const router = useRouter()
  return (
    <div className={'w-11/12 max-w-screen-md h-full flex flex-col'}>
      <MySeo
        title={'狼人真言网页版'}
        description={'桌游 - 狼人真言 - 辅助工具 - 网页版App'}
        openGraph={{
          type: 'website',
          images: [{
            url: '/tools/wereword/logo.webp',
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
      {state.matches('over')&&<WerewordOver service={service}/>}
    </div>
  )
}
