import {useMachine} from "@xstate/react";
import {createWerewordMachine} from "./machine";
import {context} from "@opentelemetry/api";
import {Loading} from "../../util/Loading";
import {VscRefresh} from 'react-icons/vsc'
import clsx from "clsx";
import {CSSProperties} from "react";
import {WerewordSetup} from "./Setup";
import {WerewordDayTime} from "./Daytime";
import {WerewordNight} from "./Night";
import {WerewordOver} from "./Over";

export const WerewordMain = () => {
  const [state, send, service] = useMachine(() => createWerewordMachine({nightTime: 1000}))

  return (
    <div className={'w-11/12 max-w-screen-md h-full flex flex-col'}>
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
