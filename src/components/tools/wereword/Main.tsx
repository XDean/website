import {useMachine} from "@xstate/react";
import {createWerewordMachine} from "./machine";
import {context} from "@opentelemetry/api";
import {Loading} from "../../util/Loading";

export const WerewordMain = () => {
  const [state, send] = useMachine(() => createWerewordMachine({}))
  return (
    <div className={'flex items-center justify-evenly w-full'}>
      <div className={'grid grid-cols-1 gap-20'}>
        <div>
          {state.context.leftSeconds > 0 && (
            <button className={'btn-blue'} onClick={() => send('TICK_ALL')}>快进</button>
          )}
          <button className={'btn-blue'} onClick={() => send('STOP')}>停止</button>
        </div>
        {state.matches('prepare') && <Loading/>}
        {state.matches('waiting') && (
          <div>
            {state.context.allWordSet.map(s => (
              <div key={s.id}>
                <input type="checkbox" checked={state.context.wordSet.indexOf(s) !== -1}
                       onChange={e => send(({type: 'SELECT_WORD_SET', value: s, check: e.target.checked}))}
                       className="h-6 w-6"/>
                <span>{s.name}</span>
              </div>
            ))}
            <button className={'btn-blue'} onClick={() => send('START')}>开始游戏
            </button>
          </div>
        )}
        {state.matches('night.start') && (
          <div>
            夜晚开始，全体闭眼
          </div>
        )}
        {state.matches('night.cunzhang.select') && (
          <div>
            <div>
              村长阶段
            </div>
            {state.context.words.map((w, i) => (
              <button key={i} className={'block btn-blue'} onClick={() => send({type: 'SELECT_WORD', value: w})}>
                {w}
              </button>
            ))}
            <button className={'btn-blue'} onClick={() => send('CHANGE_WORD')}>换一组词</button>
          </div>
        )}
        {state.matches('night.cunzhang.confirm') && (
          <div>
            确认魔法咒语 ({state.context.leftSeconds}秒)
            <div>
              {state.context.answer}
            </div>
          </div>
        )}
        {state.matches('night.xianzhi') && (
          <div>
            先知阶段 ({state.context.leftSeconds}秒)
            <div>
              {state.context.answer}
            </div>
          </div>
        )}
        {state.matches('night.langren') && (
          <div>
            狼人阶段 ({state.context.leftSeconds}秒)
            <div>
              {state.context.answer}
            </div>
          </div>
        )}
        {state.matches('night.end') && (
          <div>
            夜晚结束，全体睁眼
          </div>
        )}
        {state.matches('daytime') && (
          <div>
            剩余({state.context.leftSeconds}秒)
            <button className={'btn-blue'}
                    onClick={() => send('PAUSE')}>{state.matches('daytime.running') ? '暂停' : '继续'}</button>
            <button className={'btn-blue'}
                    onClick={() => send('RIGHT')}>猜对了
            </button>
            <button className={'btn-blue'}
                    onClick={() => send('WRONG')}>Token用完了
            </button>
          </div>
        )}
        {state.matches('find') && (
          <div>
            找出{state.context.findAnswer ? '先知' : '狼人'}
            <div>
              剩余({state.context.leftSeconds}秒)
            </div>
          </div>
        )}
      </div>
    </div>
  )
}