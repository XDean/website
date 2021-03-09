import assert from "assert";


export type Options = {
  zimo: boolean
  lastTile: boolean
  gangShang:boolean
}

export type TileType = 'p' | 's' | 'm' | 'z'
export const TileTypes: TileType[] = ['p', 's', 'm', 'z']
export type TilePoint = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export const TilePoints: TilePoint[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export class Tile {
  constructor(
    readonly type: TileType,
    readonly point: TilePoint,
  ) {
  }

  get prev() {
    if (this.type === 'z' || this.point === 1) {
      throw 'cannot get prev tile'
    }
    return new Tile(this.type, (this.point - 1) as TilePoint)
  }

  get next() {
    if (this.type === 'z' || this.point === 9) {
      throw 'cannot get next tile'
    }
    return new Tile(this.type, (this.point + 1) as TilePoint)
  }

  in(tiles: Tile[]) {
    return tiles.indexOf(this) !== -1
  }
}

export const Fengs = {
  dong: new Tile('z', 1),
  nan: new Tile('z', 2),
  xi: new Tile('z', 3),
  bei: new Tile('z', 4),
}

export const FengList: Tile[] = [Fengs.dong, Fengs.nan, Fengs.xi, Fengs.bei]

export const Yuans = {
  zhong: new Tile('z', 5),
  fa: new Tile('z', 6),
  bai: new Tile('z', 7),
}
export const YuanList: Tile[] = [Yuans.zhong, Yuans.fa, Yuans.bai]

export const ZiList: Tile[] = [...FengList, ...YuanList]

export const YaoJiuList: Tile[] = [
  new Tile('m', 1),
  new Tile('m', 9),
  new Tile('s', 1),
  new Tile('s', 9),
  new Tile('p', 1),
  new Tile('p', 9),
]
export const YaoList: Tile[] = [...ZiList, ...YaoJiuList]

export class Tiles {
  constructor(
    readonly tiles: Tile[],
  ) {
  }

  get length() {
    return this.tiles.length
  }

  split(...removes: Tile[]): [Tiles, Tiles] {
    const copy = [...this.tiles]
    const removed = []
    for (let remove of removes) {
      const index = copy.indexOf(remove);
      if (index != -1) {
        copy.splice(index)
        removed.push(remove)
      }
    }
    return [new Tiles(copy), new Tiles(removed)]
  }

  filterType(...types: TileType[]) {
    if (types.length === 0) {
      types = [this.last.type]
    }
    return new Tiles(this.tiles.filter(t => types.indexOf(t.type) !== -1))
  }

  removeType(...types: TileType[]) {
    if (types.length === 0) {
      types = [this.last.type]
    }
    return new Tiles(this.tiles.filter(t => types.indexOf(t.type) === -1))
  }

  filterPoint(...points: TilePoint[]) {
    return new Tiles(this.tiles.filter(t => points.indexOf(t.point) !== -1))
  }

  filterShunPoint(point: TilePoint) {
    return new Tiles(this.tiles.filter(t => t.point !== point && Math.abs(t.point - point) < 3))
  }

  * pairs() {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = i + 1; j < this.tiles.length; j++) {
        yield [this.tiles[i], this.tiles[j]]
      }
    }
  }

  * triples() {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = i + 1; j < this.tiles.length; j++) {
        for (let k = j + 1; k < this.tiles.length; k++) {
          yield [this.tiles[i], this.tiles[j], this.tiles[k]]
        }
      }
    }
  }

  get minPointTile(): Tile {
    let min = this.tiles[0]
    for (let tile of this.tiles) {
      if (tile.point < min.point) {
        min = tile
      }
    }
    return min
  }

  get maxPointTile(): Tile {
    let max = this.tiles[0]
    for (let tile of this.tiles) {
      if (tile.point > max.point) {
        max = tile
      }
    }
    return max
  }

  get distinct(): Tiles {
    const result = []
    for (let tile of this.tiles) {
      if (result.indexOf(tile) === -1) {
        result.push(tile)
      }
    }
    return new Tiles(result)
  }

  get last(): Tile {
    return this.tiles[this.tiles.length - 1]
  }

  get withoutLast(): Tiles {
    return this.split(this.last)[0]
  }

  allIn(tiles: Tile[]) {
    return this.tiles.every(t => t.in(tiles))
  }

  equals(tiles: Tile[]) {
    const copy = [...tiles]
    for (let tile of this.tiles) {
      const index = copy.indexOf(tile);
      if (index === -1) {
        return false
      }
      copy.splice(index)
    }
    return true
  }

  contains(tiles: Tile[]) {
    const copy = [...this.tiles]
    for (let tile of tiles) {
      const index = copy.indexOf(tile);
      if (index === -1) {
        return false
      }
      copy.splice(index)
    }
    return true
  }

  hasSameTypeAndDiff(diff: number = 1) {
    const min = this.minPointTile
    for (let i = 0; i < this.length; i = i + diff) {
      const p = min.point + i;
      if (p > 9 || !new Tile(min.type, p as TilePoint).in(this.tiles)) {
        return false
      }
    }
    return true
  }

  hasDiff(diff: number = 1) {
    const min = this.minPointTile
    for (let i = 0; i < this.length; i = i + diff) {
      const p = min.point + i;
      if (p > 9 || this.filterPoint(p as TilePoint).length === 0) {
        return false
      }
    }
    return true
  }

  get mostType() {
    let maxLen = 0
    let maxType = TileTypes[0]
    for (let t of TileTypes) {
      const len = this.filterType(t).length
      if (len > maxLen) {
        maxType = t
        maxLen = len
      }
    }
    return [maxType, maxLen]
  }

  get mostPoint() {
    let maxLen = 0
    let mostPoint = 0
    for (let t of TilePoints) {
      const len = this.filterType('s', 'p', 'm').filterPoint(t).length
      if (len > maxLen) {
        mostPoint = t
        maxLen = len
      }
    }
    return [mostPoint, maxLen]
  }
}

export class Hand {
  constructor(
    readonly tiles: Tiles, // last one is last card
    readonly mings: Ming[] = [],
    readonly option: Options,
  ) {
  }

  get count() {
    return this.tiles.length + 3 * this.mings.length
  }
}

export class Combination {
  constructor(
    readonly mians: Mian[]
  ) {
  }

  with = (...ms: Mian[]) => new Combination([...this.mians, ...ms])

  get toTiles(): Tiles {
    return new Tiles(this.mians.flatMap(m => m.toTiles.tiles))
  }

  has(...mians: Mian[]) {
    for (let mian of mians) {
      if (this.mians.indexOf(mian) === -1) {
        return false
      }
    }
    return true
  }

  hasKe(tiles: Tile[]) {
    for (let tile of tiles) {
      let found = false
      for (let mian of this.mians) {
        if (mian.type === 'ke' && mian.tile === tile) {
          found = true
          break
        }
      }
      if (!found) {
        return false
      }
    }
    return true
  }
}

export interface Fan {
  readonly score: number
  readonly name: string
}

export class Hu {
  constructor(
    readonly combination: Combination,
    readonly fans: Fan[],
  ) {
  }
}

export class Chi {
  readonly type = 'chi'

  constructor(
    readonly tile: Tile,
  ) {
  }

  toMian = () => new Shun(this.tile, true)
}

export class Peng {
  readonly type = 'peng'

  constructor(
    readonly tile: Tile,
  ) {
  }

  toMian = () => new Ke(this.tile, true)
}


export class Gang {
  readonly type = 'gang'

  constructor(
    readonly tile: Tile,
    readonly open: boolean,
  ) {
  }

  toMian = () => new Ke(this.tile, this.open, true)
}

export type Ming = Chi | Peng | Gang

export class Shun {
  readonly type = 'shun'

  constructor(
    readonly tile: Tile,
    readonly open: boolean = false,
  ) {
  }

  get name() {
    return this.open ? '吃' : '顺'
  }

  get toTiles() {
    return new Tiles([this.tile, this.tile.next, this.tile.next.next])
  }
}

export class Ke {
  readonly type = 'ke'

  constructor(
    readonly tile: Tile,
    readonly open: boolean = false,
    readonly gang: boolean = false,
  ) {
  }

  get name() {
    return this.gang ? (this.open ? '明杠' : '暗杠') : (this.open ? '碰' : '暗刻')
  }

  get toTiles() {
    return new Tiles([this.tile, this.tile, this.tile])
  }
}

export class Dui {
  readonly type = 'dui'
  readonly open = false

  constructor(
    readonly tile: Tile,
  ) {
  }

  get toTiles() {
    return new Tiles([this.tile, this.tile])
  }
}

export class QiDui {
  readonly type = 'qi-dui'
  readonly open = false

  constructor(
    readonly tiles: Tiles,
  ) {
    assert(tiles.length == 7)
  }

  get toTiles() {
    return new Tiles([...this.tiles.tiles, ...this.tiles.tiles])
  }
}

export class ZuHeLong {
  readonly type = 'zu-he-long'
  readonly open = false

  constructor(
    readonly tiles: Tiles,
  ) {
    assert(tiles.length == 9)
  }

  get toTiles() {
    return this.tiles
  }
}

export class BuKao {
  readonly type = 'bu-kao'
  readonly open = false

  constructor(
    readonly tiles: Tiles,
  ) {
    assert(tiles.length == 14)
  }

  get toTiles() {
    return this.tiles
  }
}

export class Yao13 {
  readonly type = '13yao'
  readonly open = false

  constructor(
    readonly tile: Tile,
  ) {
  }

  get toTiles() {
    return new Tiles([this.tile, ...YaoList])
  }
}

export type Mian = Dui | Shun | Ke | QiDui | BuKao | Yao13 | ZuHeLong