import {Combination, Dui, Hand, Hu, Ke, Shun, Tile, Tiles} from "./type";

export function calculate(hand: Hand): Hu {
  if (hand.count != 14) {
    throw 'hand count must be 14'
  }


  return new Hu(new Combination([]), [])
}

function* findAllCombinations(tiles: Tiles): Generator<Combination> {
  const duis = findDui(tiles);
  if (duis.length === 0) {
    if (tiles.length < 14) {
      return
    } else {
      // bukao, yao13
    }
  } else {
    for (let [leftTiles, dui] of duis) {
      const combs = findShunKeCombinations(leftTiles)
      for (let comb of combs) {
        yield comb.with(dui)
      }
    }
  }
}

function* findShunKeCombinations(tiles: Tiles): Generator<Combination> {
  if (tiles.length === 0) {
    return
  }
  const first = tiles[0]
  for (let [left, ke] of findKe(tiles, first)) {
    for (let sub of findShunKeCombinations(left)) {
      yield sub.with(ke)
    }
  }
  for (let [left, shun] of findShun(tiles, first)) {
    for (let sub of findShunKeCombinations(left)) {
      yield sub.with(shun)
    }
  }
}

function findDui(tiles: Tiles): [Tiles, Dui][] {
  const exist = []
  const dups = []
  for (let tile of tiles.tiles) {
    if (exist.indexOf(tile) === -1) {
      exist.push(tile)
    } else if (dups.indexOf(tile) === -1) {
      dups.push(tile)
    }
  }
  const results = []
  for (let dup of dups) {
    const [left] = tiles.split(dup, dup);
    results.push([left, new Dui(dup)])
  }
  return results
}


function* findShun(tiles: Tiles, tile: Tile): Generator<[Tiles, Shun]> {
  if (tile.type === 'z') {
    return
  }
  const subTiles = tiles.filterType(tile.type).filterShunPoint(tile.point);
  if (subTiles.length < 2) {
    return
  }
  for (let [a, b] of subTiles.pairs()) {
    const diff = Math.abs(a.point - b.point)
    if (diff === 1 || diff === 2) {
      const [left] = tiles.split(a, b, tile)

      yield [left, new Shun(new Tiles([a, b, tile]).minPointTile)]
    }
  }
}

function findKe(tiles: Tiles, tile: Tile): [Tiles, Ke][] {
  const sames = tiles.filterType(tile.type).filterPoint(tile.point)
  if (sames.length > 1) {
    const [left] = tiles.split(tile, tile, tile);
    return [[left, new Ke(tile)]]
  } else {
    return []
  }
}