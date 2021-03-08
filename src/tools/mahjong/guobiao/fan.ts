import {Combination, Dui, Fan, FengList, Hand, QiDui, Tile, TilePoint, YaoJiuList, YuanList, Yuans} from "./type";

export function calcFan(hand: Hand, comb: Combination): Fan[][] {
  return []
}

const allFans: FanCalc[] = []

class FanCalc implements Fan {
  readonly name: string;
  readonly score: number;
  readonly match: (comb: Combination, hand: Hand) => boolean
  readonly exclude?: Fan[]

  constructor(
    props: {
      name: string;
      score: number;
      match(comb: Combination, hand: Hand): boolean
      exclude?: Fan[]
    }
  ) {
    this.name = props.name
    this.score = props.score
    this.match = props.match
    this.exclude = props.exclude
    allFans.push(this)
  }

}

export const DaSiXi = new FanCalc({
  score: 88,
  name: '大四喜',
  match: c => c.hasKe(FengList),
})

export const DaSanYuan = new FanCalc({
  score: 88,
  name: '大三元',
  match: c => c.hasKe(YuanList),
})

const LvList: Tile[] = [...([2, 3, 4, 6, 8].map(p => new Tile('s', p as TilePoint))), Yuans.fa]
export const LvYiSe = new FanCalc({
  score: 88,
  name: '绿一色',
  match: c => c.toTiles.allIn(LvList),
})

export const JiuLianBaoDeng = new FanCalc({
  score: 88,
  name: '九莲宝灯',
  match: c => {
    const tiles = c.toTiles
    const type = tiles.last.type
    return c.mians.every(m => !m.open) && // 不鸣牌 
      tiles.withoutLast.allMatch([1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9].map(p => new Tile(type, p as TilePoint)));
  }
})

export const SiGang = new FanCalc({
  score: 88,
  name: '四杠',
  match: c => c.mians.filter(m => m.type === 'ke' && m.gang).length === 4,
})

export const LianQiDui = new FanCalc({
  score: 88,
  name: '连七对',
  match: c => {
    const find = c.mians.filter(m => m.type === 'qi-dui');
    if (find.length === 0) {
      return false
    }
    const qidui = find[0] as QiDui
    const tiles = qidui.tiles.filterType(qidui.tiles.last.type).distinct;
    return tiles.length === 7 && tiles.maxPointTile.point - tiles.minPointTile.point === 6;
  }
})

export const ShiSanYao = new FanCalc({
  score: 88,
  name: '十三幺',
  match: c => c.mians.filter(m => m.type === '13yao').length === 1,
})

export const QingYaoJiu = new FanCalc({
  score: 64,
  name: '清幺九',
  match: c => c.toTiles.allIn(YaoJiuList),
})

export const XiaoSiXi = new FanCalc({
  score: 64,
  name: '小四喜',
  match: c => {
    const duis = c.mians.filter(m => m.type === 'dui')
    if (duis.length === 0) {
      return false
    }
    const dui = duis[0] as Dui
    if (!dui.tile.in(FengList)) {
      return false
    }
    const copy = [...FengList]
    copy.splice(copy.indexOf(dui.tile))
    return c.hasKe(copy);
  },
})

export const XiaoSanYuan = new FanCalc({
  score: 64,
  name: '小三元',
  match: c => {
    const duis = c.mians.filter(m => m.type === 'dui')
    if (duis.length === 0) {
      return false
    }
    const dui = duis[0] as Dui
    if (!dui.tile.in(YuanList)) {
      return false
    }
    const copy = [...YuanList]
    copy.splice(copy.indexOf(dui.tile))
    return c.hasKe(copy);
  },
})

export const ZiYiSe = new FanCalc({
  score: 64,
  name: '字一色',
  match: c => c.toTiles.filterType('z').length === 14,
})

export const SiAnKe = new FanCalc({
  score: 64,
  name: '四暗刻',
  match: c => c.mians.filter(m => m.type === 'ke' && !m.open).length === 4,
})

export const YiSeShuangLongHui = new FanCalc({
  score: 64,
  name: '一色双龙会',
  match: c => {
    const tiles = c.toTiles
    return tiles.allMatch([1, 2, 3, 1, 2, 3, 5, 5, 7, 8, 9, 7, 8, 9].map(p => new Tile(tiles.last.type, p as TilePoint)));
  },
})




