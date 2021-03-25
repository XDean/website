import {useMachine} from "@xstate/react";
import {createWerewordMachine} from "./machine";
import {context} from "@opentelemetry/api";
import {Loading} from "../../util/Loading";

export const WerewordMain = () => {
  const [state, send] = useMachine(() => createWerewordMachine({}))
  return (
    <div className={'w-11/12 max-w-screen-md'}>
      <div className={'h-32 w-32 text-center m-auto bg-contain bg-no-repeat'}
           style={{backgroundImage: 'url(/tools/wereword/logo.webp)'}}/>
      <div className={'text-5xl mb-4 mt-2 text-center'}>狼人真言</div>
      <div className={'text-2xl mb-4 text-center'}>请先购买正版《狼人真言》<br/>然后搭配使用本工具进行游戏</div>
      {state.matches('prepare') && (
        <div className={'flex flex-col items-center text-4xl'}>
          <div>正在加载</div>
          <Loading className={'h-12 w-12 text-blue-500 mt-2'}/>
        </div>
      )}
      {state.matches('waiting') && (
        <div>
          <button className={'btn-blue text-3xl text-center block m-auto'}
                  onClick={() => send('START')}>
            开始游戏
          </button>
          <div className={'border my-4 p-2 w-max m-auto'}>
            <div className={'text-2xl mb-1'}>选择词库</div>
            <div className={'grid grid-cols-4'}>
              {state.context.allWordSet.map(s => (
                <div key={s.id} className={'inline-flex items-center mx-2 my-1'}>
                  <input type="checkbox" checked={state.context.wordSet.indexOf(s) !== -1}
                         onChange={e => send(({type: 'SELECT_WORD_SET', value: s, check: e.target.checked}))}
                         className="h-6 w-6"/>
                  <span className={'ml-1'}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
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
      <div>
        {state.context.leftSeconds > 0 && (
          <button className={'btn-blue'} onClick={() => send('TICK_ALL')}>快进</button>
        )}
        <button className={'btn-blue'} onClick={() => send('STOP')}>停止</button>
      </div>
    </div>
  )
}