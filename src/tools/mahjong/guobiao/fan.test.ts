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
import {Tile} from "./tile";

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
    const hand = new Hand(new Tiles([last]), [], options);
    const comb = new Combination(mians);
    console.log(comb.toTiles.unicode)
    const calcFans = calcFan(hand, comb)
    expect(calcFans.map(f => f.name).sort()).toEqual(fans.map(f => f.name).sort())
  })
}

expectFan({
  mians: [
    ...Tile.F.map(t => new Ke(t, false, true)),
    new Dui(Tile.Y[0]),
  ],
  last: Tile.Y[0],
  options: {zimo: true},
  fans: [DaSiXi, SiAnKe, SiGang, ZiYiSe, BuQiuRen]
})

expectFan({
  mians: [
    ...Tile.Y.map(t => new Ke(t)),
    new Shun(Tile.T[0]),
    new Dui(Tile.T[1]),
  ],
  last: Tile.T[2],
  options: {zimo: true},
  fans: [DaSiXi, SiAnKe, SiGang, ZiYiSe, BuQiuRen]
})

expectFan({
  mians: [
    new Ke(Tile.T[1], false, true),
    new Ke(Tile.W[2], true, true),
    new Ke(Tile.B[5], true, true),
    new Ke(Tile.B[8], false, true),
    new Dui(Tile.B[7]),
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
    new Yao13(Tile.T[0])
  ],
  last: Tile.T[0],
  fans: [ShiSanYao]
})