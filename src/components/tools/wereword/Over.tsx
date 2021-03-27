import {Interpreter} from "xstate";
import {WerewordContext, WerewordEvent, WerewordSchema} from "./machine";
import {useService} from "@xstate/react";
import {WerewordToolbar} from "./Toolbar";
import {WerewordImages} from "./Images";

export const WerewordOver = ({service}: { service: Interpreter<WerewordContext, WerewordSchema, WerewordEvent> }) => {
  const [state, send] = useService(service)
  return (
    <>
      <div className={'w-max m-auto relative'}>
        <WerewordImages.Logo/>
      </div>
      <div className={'text-center text-5xl my-8'}>
        游戏结束
      </div>
      <button className={'w-max m-auto btn-contain'} onClick={() => send('RESTART')}>
        再来一局
      </button>
    </>
  )
}