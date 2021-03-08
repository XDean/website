import assert from "assert";

export type TileType = 'p' | 's' | 'm' | 'z'
export type TilePoint = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Tile = {
  type: TileType
  point: TilePoint
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
    readonly tiles: Tile[],
  ) {
    assert(tiles.length == 7)
  }
}

export class ZuheLong {
  readonly type = 'zu-he-long'

  constructor(
    readonly tiles: Tile[],
  ) {
    assert(tiles.length == 9)
  }
}

export class BuKao {
  readonly type = 'bu-kao'

  constructor(
    readonly tiles: Tile[],
  ) {
    assert(tiles.length == 14)
  }
}

export class Yao13 {
  readonly type = '13yao'
}

export type Mian = Dui | Shun | Ke | QiDui | BuKao | Yao13 | ZuheLong | Gang