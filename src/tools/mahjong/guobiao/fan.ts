import {
  Combination,
  Dui,
  Fan,
  FengList,
  Hand,
  Ke,
  QiDui,
  Shun,
  Tile,
  TilePoint,
  Tiles,
  TileTypes,
  YaoJiuList,
  YaoList,
  YuanList,
  Yuans,
  ZiList
} from "./type";

export function calcFan(hand: Hand, comb: Combination): Fan[][] {
  return []
}

const allFans: FanCalc[] = []

class FanCalc implements Fan {
  readonly name: string;
  readonly score: number;
  readonly match: (comb: Combination, hand: Hand) => boolean | number
  readonly exclude?: Fan[]

  constructor(
    props: {
      name: string;
      score: number;
      match(comb: Combination, hand: Hand): boolean | number
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
      tiles.withoutLast.equals([1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9].map(p => new Tile(type, p as TilePoint)));
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

export const YiSeShuangLong = new FanCalc({
  score: 64,
  name: '一色双龙会',
  match: c => {
    const tiles = c.toTiles
    return tiles.equals([1, 2, 3, 1, 2, 3, 5, 5, 7, 8, 9, 7, 8, 9].map(p => new Tile(tiles.last.type, p as TilePoint)));
  },
})

export const YiSeSiTongShun = new FanCalc({
  score: 48,
  name: '一色四同顺',
  match: c => {
    const tiles = new Tiles(c.mians.filter(m => m.type === 'shun').map(m => (m as Shun).tile))
    return tiles.length === 4 && tiles.distinct.length === 1;
  },
})

export const YiSeSiTongKe = new FanCalc({
  score: 48,
  name: '一色四同刻',
  match: c => new Tiles(c.mians.filter(m => m.type === 'ke').map(m => (m as Ke).tile)).hasSameTypeAndDiff(1),
})

export const YiSeSiBuGao = new FanCalc({
  score: 32,
  name: '一色四步高',
  match: c => {
    const tiles = new Tiles(c.mians.filter(m => m.type === 'shun').map(m => (m as Shun).tile));
    return tiles.hasSameTypeAndDiff(1) || tiles.hasSameTypeAndDiff(2);
  },
})

export const SanGang = new FanCalc({
  score: 32,
  name: '三杠',
  match: c => c.mians.filter(m => m.type === 'ke' && m.gang).length === 3,
})

export const HunYaoJiu = new FanCalc({
  score: 32,
  name: '混幺九',
  match: c => c.toTiles.allIn(YaoList),
})

export const QiDuiFan = new FanCalc({
  score: 24,
  name: '七对',
  match: c => c.mians.filter(m => m.type === 'qi-dui').length === 1,
})

export const QiXingBuKao = new FanCalc({
  score: 24,
  name: '七星不靠',
  match: c => c.mians.filter(m => m.type === 'bu-kao').length === 1 && c.toTiles.contains(ZiList),
})

export const QuanShuangKe = new FanCalc({
  score: 24,
  name: '全双刻',
  match: c => c.mians.filter(m => m.type === 'ke' && m.tile.point % 2 === 0).length === 4 &&
    c.mians.filter(m => m.type === 'dui' && m.tile.point % 2 === 0).length === 1,
})

export const QingYiSe = new FanCalc({
  score: 24,
  name: '清一色',
  match: c => c.toTiles.filterType().length === 14 && c.toTiles.filterType('z').length === 0,
})

export const YiSeSanTongShun = new FanCalc({
  score: 24,
  name: '一色三同顺',
  match: c => {
    const shuns = new Tiles(c.mians.filter(m => m.type === 'shun').map(m => (m as Shun).tile))
    for (let triple of shuns.triples()) {
      if (new Tiles(triple).hasSameTypeAndDiff(0)) {
        return true
      }
    }
    return false
  },
})

export const YiSeSanJieGao = new FanCalc({
  score: 24,
  name: '一色三节高',
  match: c => {
    const tiles = new Tiles(c.mians.filter(m => m.type === 'ke').map(m => (m as Ke).tile).filter(t => t.type !== 'z'))
    for (let triple of tiles.triples()) {
      if (new Tiles(triple).hasSameTypeAndDiff(1)) {
        return true
      }
    }
    return false
  },
})

export const QuanDa = new FanCalc({
  score: 24,
  name: '全大',
  match: c => c.toTiles.tiles.every(t => t.type !== "z" && t.point <= 3),
})

export const QuanZhong = new FanCalc({
  score: 24,
  name: '全中',
  match: c => c.toTiles.tiles.every(t => t.type !== "z" && t.point >= 4 && t.point <= 6),
})

export const QuanXiao = new FanCalc({
  score: 24,
  name: '全小',
  match: c => c.toTiles.tiles.every(t => t.type !== "z" && t.point >= 7),
})

export const QingLong = new FanCalc({
  score: 16,
  name: '清龙',
  match: c => {
    const tiles = new Tiles(c.mians.filter(m => m.type === 'shun').map(m => (m as Shun).tile))
    for (let triple of tiles.triples()) {
      if (new Tiles(triple).hasSameTypeAndDiff(3)) {
        return true
      }
    }
    return false
  },
})

export const SanSesHuangLongHui = new FanCalc({
  score: 16,
  name: '三色双龙会',
  match: c => {
    if (c.toTiles.filterType('z').length > 0) {
      return false
    }
    const duis = c.mians.filter(m => m.type === 'dui')
    if (duis.length !== 1) {
      return false
    }
    const duiTile = (duis[0] as Dui).tile
    if (duiTile.point !== 5) {
      return false
    }
    const types = [...TileTypes]
    types.splice(types.indexOf('z'))
    types.splice(types.indexOf(duiTile.type))
    const shuns = new Tiles(c.mians.filter(m => m.type === 'shun').map(m => (m as Shun).tile))
    return shuns.length === 4 && shuns.equals([1, 7].flatMap(p => types.map(t => new Tile(t, p as TilePoint))))
  },
})

export const YiSeSanBuGao = new FanCalc({
  score: 16,
  name: '一色三步高',
  match: c => {
    const tiles = new Tiles(c.mians.filter(m => m.type === 'shun').map(m => (m as Shun).tile))
    for (let triple of tiles.triples()) {
      const t = new Tiles(triple)
      if (t.hasSameTypeAndDiff(1) || t.hasSameTypeAndDiff(2)) {
        return true
      }
    }
    return false
  },
})

export const QuanDaiWu = new FanCalc({
  score: 16,
  name: '全带五',
  match: c => c.mians.every(m => m.toTiles.tiles.some(t => t.type !== 'z' && t.point === 5)),
})

export const SanTongKe = new FanCalc({
  score: 16,
  name: '三同刻',
  match: c => {
    const kes = new Tiles(c.mians.filter(m => m.type === 'ke').map(m => (m as Ke).tile))
    for (let triple of kes.triples()) {
      if (new Tiles(triple).hasDiff(0)) {
        return true
      }
    }
    return false
  },
})

export const SanAnKe = new FanCalc({
  score: 16,
  name: '三暗刻',
  match: c => c.mians.filter(m => m.type === 'ke' && !m.open).length === 3,
})

export const QuanBuKao = new FanCalc({
  score: 12,
  name: '全不靠',
  match: c => c.mians.filter(m => m.type === 'bu-kao').length === 1,
})

export const ZuHeLong = new FanCalc({
  score: 12,
  name: '组合龙',
  match: c => c.mians.filter(m => m.type === 'zu-he-long').length === 1,
})

export const DaYuWu = new FanCalc({
  score: 12,
  name: '大于五',
  match: c => c.toTiles.tiles.every(t => t.type !== "z" && t.point < 5),
})

export const XiaoYuWu = new FanCalc({
  score: 12,
  name: '小于五',
  match: c => c.toTiles.tiles.every(t => t.type !== "z" && t.point > 5),
})

export const SanFengKe = new FanCalc({
  score: 12,
  name: '三风刻',
  match: c => c.mians.filter(m => m.type === 'ke' && m.tile.in(FengList)).length === 3,
})

export const HuaLong = new FanCalc({
  score: 8,
  name: '花龙',
  match: c => {
    const tiles = new Tiles(c.mians.filter(m => m.type === 'shun').map(m => (m as Shun).tile))
    for (let triple of tiles.triples()) {
      const t = new Tiles(triple)
      if (t.mostType[1] === 1 && t.hasDiff(3)) {
        return true
      }
    }
    return false
  },
})

const TuiBuDaoList: Tile[] = [
  ...([1, 2, 3, 4, 5, 8, 9].map(p => new Tile('p', p as TilePoint))),
  ...([2, 4, 5, 6, 8, 9].map(p => new Tile('s', p as TilePoint))),
  Yuans.bai,
]
export const TuiBuDao = new FanCalc({
  score: 8,
  name: '推不到',
  match: c => c.toTiles.allIn(TuiBuDaoList),
})

export const SanSeSanTongShun = new FanCalc({
  score: 8,
  name: '三色三同顺',
  match: c => new Tiles(c.mians.filter(m => m.type === 'shun').map(m => (m as Shun).tile)).mostPoint[1] === 3,
})

export const SanSeSanJieGao = new FanCalc({
  score: 8,
  name: '三色三节高',
  match: c => {
    const tiles = new Tiles(c.mians.filter(m => m.type === 'ke').map(m => (m as Ke).tile));
    for (let triple of tiles.triples()) {
      const t = new Tiles(triple)
      if (t.mostType[1] === 1 && t.hasDiff(1)) {
        return true
      }
    }
    return false
  },
})

export const WuFanHu = new FanCalc({
  score: 8,
  name: '无番和',
  match: c => false,
})

export const MiaoShouHuiChun = new FanCalc({
  score: 8,
  name: '妙手回春',
  match: (c, h) => h.option.lastTile && h.option.zimo,
})

export const HaiDiLaoYue = new FanCalc({
  score: 8,
  name: '海底捞月',
  match: (c, h) => h.option.lastTile && !h.option.zimo,
})

export const GangShangKaiHua = new FanCalc({
  score: 8,
  name: '杠上开花',
  match: (c, h) => h.option.gangShang && h.option.zimo,
})

export const QiangGangHu = new FanCalc({
  score: 8,
  name: '抢杠胡',
  match: (c, h) => h.option.gangShang && !h.option.zimo,
})

export const ShuangAnGang = new FanCalc({
  score: 8,
  name: '双暗杠',
  match: c => c.mians.filter(m => m.type === 'ke' && !m.open && m.gang).length === 2,
})

export const PengPengHu = new FanCalc({
  score: 6,
  name: '碰碰胡',
  match: c => c.mians.filter(m => m.type === 'ke').length === 4,
})

export const HunYiSe = new FanCalc({
  score: 6,
  name: '混一色',
  match: c => {
    const withoutZi = c.toTiles.removeType('z');
    return withoutZi.length === withoutZi.filterType().length
  },
})









