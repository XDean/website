import {AllTilesView} from "./AllTiles";
import {HandView} from "./Hand";
import {useState} from "react";
import {Chi, Gang, Hand, Peng, Tile, Tiles} from "../../../../tools/mahjong/guobiao/type";
import clsx from "clsx";

type Mode = {
  name: string
  label: string
  add: (hand: Hand, tile: Tile) => void
}
const modes: Mode[] = [
  {name: 'normal', label: '手牌', add: (h, t) => h.tiles.tiles.push(t)},
  {name: 'chi', label: '吃', add: (h, t) => h.mings.push(new Chi(t))},
  {name: 'peng', label: '碰', add: (h, t) => h.mings.push(new Peng(t))},
  {name: 'ming-gang', label: '明杠', add: (h, t) => h.mings.push(new Gang(t, true))},
  {name: 'an-gang', label: '暗杠', add: (h, t) => h.mings.push(new Gang(t, false))},
]

export const GuoBiaoMainView = () => {
  const [hand, setHand] = useState(new Hand(new Tiles([]), [], {
    zimo: false,
    menfeng: 1,
    quanfeng: 1,
    juezhang: false,
    gangShang: false,
    lastTile: false,
    hua: 0,
  }))
  const [mode, setMode] = useState(modes[0])
  return (
    <div>
      <h1 className={'text-4xl text-center mb-2 md:mb-4'}>
        国标麻将算番器
      </h1>
      <AllTilesView onTileClick={t => {
        mode.add(hand, t);
        setHand(new Hand(hand.tiles, hand.mings, hand.option))
      }}/>
      <div className={'text-lg md:text-2xl my-2 flex flex-row items-center justify-between'}>
        {modes.map(m => (
          <button key={m.name} onClick={e => setMode(m)}
                  className={clsx('px-1 md:px-2 py-1 rounded-lg border-2 w-14 md:w-20 border-opacity-0',
                    {'border-blue-500 shadow-lg border-opacity-100': mode === m})}>
            {m.label}
          </button>
        ))}
      </div>
      <HandView hand={hand}/>
    </div>
  )
}