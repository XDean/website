import assert from "assert";


export type Options = {
  zimo: boolean
}

export type TileType = 'p' | 's' | 'm' | 'z'
export type TilePoint = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Tile = {
  type: TileType
  point: TilePoint
}

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

  filterType(type: TileType) {
    return new Tiles(this.tiles.filter(t => t.type === type))
  }

  filterPoint(...points: TilePoint[]) {
    return new Tiles(this.tiles.filter(t => points.indexOf(t.point) != -1))
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

  get minPointTile(): Tile {
    let min = this.tiles[0]
    for (let tile of this.tiles) {
      if (tile.point < min.point) {
        min = tile
      }
    }
    return min
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
}

export class Hand {
  constructor(
    readonly tiles: Tiles, // last one is last card
    readonly mings: Ming[] = [],
    readonly options: Options,
  ) {
  }

  get count() {
    return this.tiles.length + 3 * this.mings.length
  }

  get lastTile() {
    return this.tiles[this.tiles.length - 1]
  }
}

export class Combination {
  constructor(
    readonly mians: Mian[]
  ) {
  }

  with = (m: Mian) => new Combination([...this.mians, m])
}

export interface Fan {
  score: number
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
}

export class Ke {
  readonly type = 'ke'

  constructor(
    readonly tile: Tile,
    readonly open: boolean = false,
    readonly gang: boolean = false,
  ) {
  }
}

export class Dui {
  readonly type = 'dui'

  constructor(
    readonly tile: Tile,
  ) {
  }
}

export class QiDui {
  readonly type = 'qi-dui'

  constructor(
    readonly tiles: Tiles,
  ) {
    assert(tiles.length == 7)
  }
}

export class ZuHeLong {
  readonly type = 'zu-he-long'

  constructor(
    readonly tiles: Tiles,
  ) {
    assert(tiles.length == 9)
  }
}

export class BuKao {
  readonly type = 'bu-kao'

  constructor(
    readonly tiles: Tiles,
  ) {
    assert(tiles.length == 14)
  }
}

export class Yao13 {
  readonly type = '13yao'
}

export type Mian = Dui | Shun | Ke | QiDui | BuKao | Yao13 | ZuHeLong | Gang