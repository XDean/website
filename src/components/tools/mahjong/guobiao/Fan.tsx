import {Fan, Hand, Hu} from "../../../../tools/mahjong/guobiao/type";
import {useEffect, useState} from "react";
import {Data} from "../../../../util/util";
import {Loading} from "../../../util/Loading";
import {calculate} from "../../../../tools/mahjong/guobiao/main";

export const FanView = ({hand}: { hand: Hand }) => {
  const [hu, setHu] = useState<Data<Hu>>({type: 'null'})
  useEffect(() => {
    if (hand.count < 14) {
      setHu({type: 'null'})
      return
    }
    setHu({type: 'loading'})
    new Promise<Hu[]>(resolve => {
      resolve(calculate(hand))
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
      return <div>请先选择14张手牌</div>
    case "loading":
      return <div>正在计算<Loading/></div>
    case "ready":
      return <div>ready</div>
    case "error":
      return <div>错误: {hu.error}</div>
  }
}