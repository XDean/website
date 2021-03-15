import {expect, test} from "@jest/globals";
import {
  BuQiuRen,
  calcFan,
  DanDiaoJiang,
  DaSiXi, DuanYao,
  LianQiDui,
  MenQianQing,
  ShiSanYao, ShuangAnGang, ShuangAnKe,
  SiAnKe,
  SiGang, WuZi, YaoJiuKe,
  ZiYiSe
} from "./fan";
import {
  Combination,
  Dui,
  Fan,
  Gang,
  Hand,
  Ke,
  Mian,
  Options,
  Tiles,
  Yao13,
  QiDui,
  Shun,
} from "./type";
import {Fengs, Tile, Yuans} from "./tile";

function expectFan(
  {
    mians,
    last,
    options,
    fans,
    name
  }: {
    mians: Mian[],
    last: Tile,
    options?: Partial<Options>,
    fans: Fan[],
    name?: string
  }) {
  test(name || fans[0].name, () => {
    const calcFans = calcFan(new Hand(new Tiles([last]), [], options),
      new Combination(mians))
    expect(calcFans.map(f => f.name).sort()).toEqual(fans.map(f => f.name).sort())
  })
}

expectFan({
  mians: [
    new Ke(Fengs.dong, false, true),
    new Ke(Fengs.nan, false, true),
    new Ke(Fengs.xi, false, true),
    new Ke(Fengs.bei, false, true),
    new Dui(Yuans.zhong),
  ],
  last: Yuans.zhong,
  options: {zimo: true},
  fans: [DaSiXi, SiAnKe, SiGang, ZiYiSe, BuQiuRen]
})

expectFan({
  mians: [
    new Ke(Yuans.zhong),
    new Ke(Yuans.fa),
    new Ke(Yuans.bai),
    new Shun(Tile.Tiaos[1]),
    new Dui(Yuans.zhong),
  ],
  last: Yuans.zhong,
  options: {zimo: true},
  fans: [DaSiXi, SiAnKe, SiGang, ZiYiSe, BuQiuRen]
})

expectFan({
  mians: [
    new Ke(Tile.Tiaos[1], false, true),
    new Ke(Tile.Wans[2], true, true),
    new Ke(Tile.Bings[5], true, true),
    new Ke(Tile.Bings[8], false, true),
    new Dui(Tile.Bings[7]),
  ],
  last: new Tile('b', 7),
  fans: [SiGang, YaoJiuKe, WuZi, ShuangAnGang]
})

expectFan({
  mians: [
    new QiDui(Tiles.of({'t': [2, 3, 4, 5, 6, 7, 8]}))
  ],
  last: new Tile('t', 2),
  fans: [LianQiDui, DuanYao]
})

expectFan({
  mians: [
    new Yao13(Yuans.zhong)
  ],
  last: Yuans.zhong,
  fans: [ShiSanYao]
})