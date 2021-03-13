import {AllTilesView} from "./AllTiles";
import {HandView} from "./Hand";
import {useMemo, useState} from "react";
import {
  Chi,
  Gang,
  Hand,
  Peng,
  Tile,
  TileNumberTypes,
  TilePoint,
  Tiles,
  ZiList
} from "../../../../tools/mahjong/guobiao/type";
import clsx from "clsx";

type Mode = {
  name: string
  label: string
  add: (hand: Hand, tile: Tile) => void
  disableAll: (hand: Hand) => boolean
  disable: (hand: Hand) => Tiles
}
const modes: Mode[] = [
  {
    name: 'normal',
    label: '手牌',
    add: (h, t) => h.tiles.tiles.push(t),
    disableAll: hand => hand.count === 14,
    disable: hand => hand.allTiles.filterMoreThan(3),
  }, {
    name: 'chi',
    label: '吃',
    add: (h, t) => h.mings.push(new Chi(t)),
    disableAll: hand => hand.count >= 12,
    disable: hand => new Tiles([...ZiList, ...hand.allTiles.filterType(...TileNumberTypes).filterMoreThan(3).tiles
      .flatMap(t => [0, 1, 2]
        .map(d => t.point - d)
        .filter(p => p > 0)
        .map(p => new Tile(t.type, p as TilePoint)))])
  },
  {
    name: 'peng',
    label: '碰',
    add: (h, t) => h.mings.push(new Peng(t)),
    disableAll: hand => hand.count >= 12,
    disable: hand => hand.allTiles.filterMoreThan(1)
  },
  {
    name: 'ming-gang',
    label: '明杠',
    add: (h, t) => h.mings.push(new Gang(t, true)),
    disableAll: hand => hand.count >= 12,
    disable: hand => hand.allTiles.distinct
  },
  {
    name: 'an-gang',
    label: '暗杠',
    add: (h, t) => h.mings.push(new Gang(t, false)),
    disableAll: hand => hand.count >= 12,
    disable: hand => hand.allTiles.distinct
  },
]

export const GuoBiaoMainView = () => {
  const [hand, setHand] = useState(new Hand(new Tiles([]), []))
  const [mode, setMode] = useState(modes[0])

  const [disableAll, disabledTiles] = useMemo(() => [mode.disableAll(hand), mode.disable(hand)], [mode, hand])

  const updateHand = (f: (h: Hand) => void) => {
    const copy = hand.copy();
    f(copy)
    setHand(copy)
  }

  return (
    <div className={'w-max max-w-screen-lg'}>
      <h1 className={'text-4xl text-center mb-2 md:mb-4'}>
        国标麻将算番器
      </h1>
      <AllTilesView
        disableAll={disableAll}
        disabledTiles={disabledTiles}
        onTileClick={t => updateHand(h => mode.add(h, t))}/>
      <div className={'text-lg md:text-2xl my-2 flex flex-row items-center justify-between'}>
        {modes.map(m => (
          <button key={m.name} onClick={e => setMode(m)}
                  className={clsx('px-1 md:px-2 py-1 rounded-lg border-2 w-14 md:w-20 border-opacity-0',
                    {'border-blue-500 shadow-lg border-opacity-100': mode === m})}>
            {m.label}
          </button>
        ))}
      </div>
      <HandView hand={hand}
                onMingClick={m => updateHand(h => h.mings.splice(h.mings.indexOf(m), 1))}
                onTileClick={t => updateHand(h => h.tiles.tiles.splice(t.indexIn(h.tiles), 1))}/>
    </div>
  )
}