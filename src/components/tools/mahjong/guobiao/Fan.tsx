import {Fan, Hand, Hu, Tiles} from "../../../../tools/mahjong/guobiao/type";
import {useEffect, useState} from "react";
import {Data} from "../../../../util/util";
import {Loading} from "../../../util/Loading";
import {calcHu} from "../../../../tools/mahjong/guobiao/hu";
import {Fragment} from 'react'
import {Tile} from "../../../../tools/mahjong/guobiao/tile";
import {calcTing} from "../../../../tools/mahjong/guobiao/ting";
import {TileView} from "./Tile";

export const FanView = ({hand}: { hand: Hand }) => {
  const [hu, setHu] = useState<Data<Hu | Tile[]>>({type: 'null'})
  useEffect(() => {
    if (hand.count < 13) {
      setHu({type: 'null'})
      return
    }
    setHu({type: 'loading'})

    if (hand.count === 13) {
      new Promise<Tile[]>(resolve => {
        resolve(calcTing(hand.tiles))
      })
        .then(tings => {
          if (tings.length === 0) {
            setHu({type: 'error', error: '没有听牌'})
          } else {
            setHu({type: 'ready', value: tings})
          }
        })
    } else if (hand.count === 14) {
      new Promise<Hu[]>(resolve => {
        resolve(calcHu(hand))
      })
        .then(hus => {
          if (hus.length === 0) {
            setHu({type: 'error', error: '你没胡'})
          } else {
            const best = hus.reduce((a, b) => a.totalScore > b.totalScore ? a : b)
            setHu({type: 'ready', value: best})
          }
        })
    } else {
      setHu({type: 'error', error: '超过14张牌'})
    }
  }, [hand])

  switch (hu.type) {
    case "null":
      return <div className={'text-center text-2xl mt-2'}>请选择{14 - hand.count}张手牌</div>
    case "loading":
      return <div className={'text-center text-2xl mt-2'}>正在计算<Loading/></div>
    case "ready":
      const value = hu.value;
      if (value instanceof Array) {
        return (
          <div className={'text-center text-2xl mt-2 flex flex-col items-center'}>
            <div>
              听{value.length}张牌
            </div>
            <div className={`grid grid-cols-${Math.min(value.length, 5)} auto-rows-auto gap-1 m-w-max`}>
              {value.map(t => (
                <TileView tile={t} key={t.toNumber()}/>
              ))}
            </div>
          </div>
        )
      } else {
        return (
          <div className={'grid grid-cols-2 auto-rows-auto gap-x-2 text-2xl'}>
            {value.fans.sort((a, b) => b.score - a.score).map((f, i) => (
              <Fragment key={i}>
                <div className={'text-right'}>{f.score}番</div>
                <div>{f.name}</div>
              </Fragment>
            ))}
            <div className={'text-right'}>共{value.totalScore}番</div>
          </div>
        )
      }
    case "error":
      return <div>错误: {hu.error}</div>
  }
}