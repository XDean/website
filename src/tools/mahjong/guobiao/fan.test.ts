import {expect, test} from "@jest/globals";
import {
  BianZhang,
  BuQiuRen,
  calcFan,
  DanDiaoJiang, DaSanYuan,
  DaSiXi, DuanYao, Hua, HunYiSe, JianKe, JiuLianBaoDeng, KanZhang,
  LianQiDui, LvYiSe, MenFengKe,
  MenQianQing, MingGang, QiangGangHu, QingYaoJiu, QingYiSe, QuanFengKe, SanAnKe,
  ShiSanYao, ShuangAnGang, ShuangAnKe, ShuangTongKe,
  SiAnKe,
  SiGang, WuZi, XiaoSanYuan, XiaoSiXi, YaoJiuKe, YiBanGao, ZiMo,
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
  const log = console.log
  test(name || fans[0].name, () => {
    const hand = new Hand(new Tiles([last]), [], options);
    const comb = new Combination(mians);
    log(name || fans[0].name, comb.toTiles.unicode)
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
  fans: [DaSanYuan, SanAnKe, HunYiSe, BianZhang, BuQiuRen]
})

expectFan({
  mians: [
    new Shun(Tile.T[1]),
    new Shun(Tile.T[1]),
    new Ke(Tile.T[7], true, true),
    new Ke(Tile.Ys.fa),
    new Dui(Tile.T[5]),
  ],
  last: Tile.T[1],
  options: {hua: 3, gangShang: true},
  fans: [LvYiSe, YiBanGao, QiangGangHu, MingGang, HunYiSe, JianKe, Hua, Hua, Hua]
})

expectFan({
  mians: [
    new Ke(Tile.T[0]),
    new Shun(Tile.T[1]),
    new Shun(Tile.T[5]),
    new Ke(Tile.T[8]),
    new Dui(Tile.T[4]),
  ],
  last: Tile.T[4],
  options: {zimo: true},
  fans: [JiuLianBaoDeng, ShuangAnKe, YaoJiuKe, BuQiuRen]
})

expectFan({
  name: '九莲宝灯 - 不成',
  mians: [
    new Ke(Tile.T[0]),
    new Shun(Tile.T[1], true),
    new Shun(Tile.T[5]),
    new Ke(Tile.T[8], true),
    new Dui(Tile.T[4]),
  ],
  last: Tile.T[0],
  fans: [QingYiSe, YaoJiuKe, YaoJiuKe]
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

expectFan({
  mians: [
    new Ke(Tile.T[0]),
    new Ke(Tile.B[0]),
    new Ke(Tile.W[8], true),
    new Ke(Tile.T[8], true),
    new Dui(Tile.B[8])
  ],
  last: Tile.T[0],
  fans: [QingYaoJiu, ShuangTongKe, ShuangAnKe]
})

expectFan({
  mians: [
    ...Tile.F.slice(0, 3).map(t => new Ke(t)),
    new Shun(Tile.B[1]),
    new Dui(Tile.F[3]),
  ],
  last: Tile.B[1],
  options:{menfeng:1, quanfeng:2},
  fans: [XiaoSiXi, HunYiSe, MenFengKe, QuanFengKe, SanAnKe, MenQianQing]
})

expectFan({
  mians: [
    new Ke(Tile.Y[0]),
    new Ke(Tile.Y[1]),
    new Shun(Tile.T[0], true),
    new Shun(Tile.T[1]),
    new Dui(Tile.Y[2]),
  ],
  last: Tile.T[2],
  fans: [XiaoSanYuan, HunYiSe, KanZhang, ShuangAnKe]
})