import {useCallback, useMemo, useState} from "react";
import {createFairRandomContext, diceNumberToArray} from "./domain";
import {Die} from "./Die";
import useSound from "use-sound";
import random from "random";

export const Dice = () => {
  const [count, setCount] = useState(2)
  const [fairFactor, setFairFactor] = useState(0)
  const [dice, setDice] = useState([0, 0])
  const [history, setHistory] = useState([])
  const [playSound, soundState] = useSound('/tools/dice/die.mp3')
  const context = useMemo(() => createFairRandomContext(Math.pow(6, count), fairFactor / 100), [fairFactor, count])

  const roll = useCallback(() => {
    const value = context.next();
    const res = diceNumberToArray(count, value)
    playSound()
    let times = 0
    const intervalId = setInterval(() => {
      times++
      if (times < 10) {
        setDice(diceNumberToArray(count, random.int(0, Math.pow(6, count))))
      } else {
        clearInterval(intervalId)
        setDice(res)
        setHistory(h => [...h, res])
      }
    }, 50)
  }, [playSound, context, count])

  return (
    <div className={'w-md'}>
      <div className={'grid grid-cols-1 gap-y-2 text-2xl'}>
        <div className={'flex flex-row items-center'}>
          <div>骰子数量：{' '}</div>
          <select className={'border border-blue-400 rounded-md px-2 py-1 w-24'} value={count}
                  onChange={e => setCount(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
        <div className={'flex flex-row items-center w-'}>
          <div>公平程度：{' '}</div>
          <input type={'range'} className={'w-32'} value={fairFactor}
                 onChange={e => setFairFactor(Number(e.target.value))}/>
          <div className={'ml-1 w-8'}>
            {fairFactor}%
          </div>
        </div>
        <div className={'mt-2 text-center'}>
          <button className={'px-4 bg-blue-600 text-white hover:bg-blue-500'}
                  onClick={roll}
          >
            掷{' '}骰{' '}子
          </button>
        </div>
      </div>
      <div className={'mt-4 flex flex-row items-center justify-center'}>
        {dice.map((d, i) => (
          <div key={i} className={'m-2'}>
            <Die value={d}/>
          </div>
        ))}
      </div>
    </div>
  )
}