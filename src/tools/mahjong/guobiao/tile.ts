import {Tiles} from "./type";

export type TileType = 'b' | 't' | 'w' | 'z'
export const TileNumberTypes: TileType[] = ['b', 't', 'w']
export const TileTypes: TileType[] = ['b', 't', 'w', 'z']
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

  in(tiles: Tile[] | Tiles) {
    return new Tiles(tiles).indexOf(this) !== -1
  }

  indexIn(tiles: Tile[] | Tiles) {
    return new Tiles(tiles).indexOf(this)
  }

  equals(tile: Tile) {
    return this.point === tile.point && this.type === tile.type;
  }


  static Tiaos = TilePoints.reduce((m, p) => m[p] = new Tile('t', p), {})
  static Bings = TilePoints.reduce((m, p) => m[p] = new Tile('b', p), {})
  static Wans = TilePoints.reduce((m, p) => m[p] = new Tile('w', p), {})
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
  new Tile('w', 1),
  new Tile('w', 9),
  new Tile('t', 1),
  new Tile('t', 9),
  new Tile('b', 1),
  new Tile('b', 9),
]
export const YaoList: Tile[] = [...ZiList, ...YaoJiuList]