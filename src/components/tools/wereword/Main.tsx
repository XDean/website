import {useMachine} from "@xstate/react";
import {createWerewordMachine} from "./machine";
import {context} from "@opentelemetry/api";
import {Loading} from "../../util/Loading";

export const WerewordMain = () => {
  const [state, send] = useMachine(() => createWerewordMachine({nightTime: 1000}))
  return (
    <div className={'w-11/12 max-w-screen-md flex flex-col'}>
      {state.matches('setup') && (
        <>
          <Logo/>
          <div className={'text-5xl mb-4 mt-2 text-center'}>狼人真言</div>
          <div className={'text-2xl mb-4 text-center'}>请先购买正版《狼人真言》<br/>然后搭配使用本工具进行游戏</div>

          {state.matches('setup.prepare') && (
            <div className={'flex flex-col items-center text-4xl'}>
              <div>正在加载</div>
              <Loading className={'h-12 w-12 text-blue-500 mt-2'}/>
            </div>
          )}
          {state.matches('setup.waiting') && (
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
        </>
      )}
      {state.matches('play') && (
        <>
          <div className={'flex items-center'}>
            <button className={'btn-blue mx-2'} disabled={state.context.leftSeconds <= 0}
                    onClick={() => send('TICK_ALL')}>快进
            </button>
            <Logo/>
            <button className={'btn-blue mx-2'} onClick={() => send('STOP')}>停止</button>
          </div>
          <div className={'flex-grow w-full relative'}>
            {state.matches('play.night.start') && (
              <div className={'text-5xl h-4/5 flex text-center items-center justify-center leading-normal'}>
                夜晚开始<br/>全体闭眼<br/>{state.context.leftSeconds}秒
              </div>
            )}
            {state.matches('play.night.cunzhang.select') && (
              <div className={'flex flex-col justify-center items-center'}>
                <div>
                  <div className={'text-5xl inline'}>
                    村长阶段
                  </div>
                  <button className={'btn-blue inline absolute'} onClick={() => send('CHANGE_WORD')}>换一组词</button>
                </div>
                <div className={'text-xl flex flex-col justify-center items-center'}>
                  {state.context.words.map((w, i) => (
                    <button key={i} className={'inline-block btn-blue my-1 w-max'}
                            onClick={() => send({type: 'SELECT_WORD', value: w})}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {state.matches('play.night.cunzhang.confirm') && (
              <div>
                确认魔法咒语 ({state.context.leftSeconds}秒)
                <div>
                  {state.context.answer}
                </div>
              </div>
            )}
            {state.matches('play.night.xianzhi') && (
              <div>
                先知阶段 ({state.context.leftSeconds}秒)
                <div>
                  {state.context.answer}
                </div>
              </div>
            )}
            {state.matches('play.night.langren') && (
              <div>
                狼人阶段 ({state.context.leftSeconds}秒)
                <div>
                  {state.context.answer}
                </div>
              </div>
            )}
            {state.matches('play.night.end') && (
              <div>
                夜晚结束，全体睁眼
              </div>
            )}
            {state.matches('play.daytime') && (
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
            {state.matches('play.find') && (
              <div>
                找出{state.context.findAnswer ? '先知' : '狼人'}
                <div>
                  剩余({state.context.leftSeconds}秒)
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

const Logo = () => (<div className={'h-32 w-32 md:h-64 md:w-64 text-center m-auto bg-contain bg-no-repeat'}
                         style={{backgroundImage: 'url(/tools/wereword/logo.webp)'}}/>)