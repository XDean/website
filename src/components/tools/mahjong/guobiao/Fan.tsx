import {Fan, Hand, Hu} from "../../../../tools/mahjong/guobiao/type";
import {useEffect, useState} from "react";
import {Data} from "../../../../util/util";
import {Loading} from "../../../util/Loading";
import {calcHu} from "../../../../tools/mahjong/guobiao/hu";
import {Fragment} from 'react'

export const FanView = ({hand}: { hand: Hand }) => {
  const [hu, setHu] = useState<Data<Hu>>({type: 'null'})
  useEffect(() => {
    if (hand.count < 14) {
      setHu({type: 'null'})
      return
    }
    setHu({type: 'loading'})
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
  }, [hand])

  switch (hu.type) {
    case "null":
      return <div>请选择{14 - hand.count}张手牌</div>
    case "loading":
      return <div>正在计算<Loading/></div>
    case "ready":
      return (
        <div className={'grid grid-cols-2 auto-rows-auto gap-x-2 text-2xl'}>
          {hu.value.fans.sort((a, b) => b.score - a.score).map((f, i) => (
            <Fragment key={i}>
              <div className={'text-right'}>{f.score}番</div>
              <div>{f.name}</div>
            </Fragment>
          ))}
          <div className={'text-right'}>共{hu.value.totalScore}番</div>
        </div>
      )
    case "error":
      return <div>错误: {hu.error}</div>
  }
}