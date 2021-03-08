import {Combination, Fan, FengList, Hand, QiDui, Tile, TilePoint, YuanList, Yuans} from "./type";

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
  match: c => c.hasKe(...FengList),
})

export const DaSanYuan = new FanCalc({
  score: 88,
  name: '大三元',
  match: c => c.hasKe(...YuanList),
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