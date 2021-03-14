import {expect, test} from "@jest/globals";
import {Tile, Tiles} from "./type";

test('Tiles', () => {
  const tiles = Tiles.of({'t': [1, 1, 1, 2, 3], 'b': [1]})
  expect(tiles.length).toBe(6)
  expect(tiles.indexOf(new Tile('t', 2))).toBe(3)
  expect(tiles.indexOf(new Tile('b', 2))).toBe(-1)
  expect(tiles.withTile(new Tile('t', 5)).length).toBe(7)

  const split = tiles.split(new Tile('t', 2), new Tile('b', 2));
  expect(split[0].length).toBe(5)
  expect(split[1].length).toBe(1)

  expect(tiles.filterType('t', 'z').length).toBe(5)
  expect(tiles.filterType('b').length).toBe(1)
  expect(tiles.removeType('b', 'z').length).toBe(5)
  expect(tiles.filterPoint(1).length).toBe(4)
  expect(tiles.filterPoint(5).length).toBe(0)
  expect(tiles.filterTiles(Tiles.of({'t': [1], 'z': [1]})).length).toBe(3)
  expect(tiles.filterShunPoint(2).length).toBe(5)
  expect(tiles.filterMoreThan(2).length).toBe(1)
  expect(tiles.minPointTile.point).toBe(1)
  expect(tiles.maxPointTile.point).toBe(3)

  expect(tiles.distinct.length).toBe(4)
  expect(tiles.last).toEqual(new Tile('b', 1))
  expect(tiles.withoutLast.length).toEqual(5)
  expect(tiles.allIn(Tiles.of({'t': [1, 2, 3], 'b': [1]}))).toBe(true)
  expect(tiles.allIn(Tiles.of({'t': [3], 'b': [1]}))).toBe(false)
  expect(tiles.equals(Tiles.of({'t': [1, 1, 1, 2, 3], 'b': [1]}))).toBe(true)
  expect(tiles.equals(Tiles.of({'t': [1, 2, 3], 'b': [1]}))).toBe(false)
  expect(tiles.contains(Tiles.of({'t': [1, 2, 3], 'b': [1]}))).toBe(true)
  expect(tiles.contains(Tiles.of({'z': [1]}))).toBe(false)


  expect(Tiles.of({'t': [1, 2, 3, 4]}).hasSameTypeAndDiff(1)).toBe(true)
  expect(Tiles.of({'t': [1, 4, 7]}).hasSameTypeAndDiff(3)).toBe(true)
  expect(Tiles.of({'t': [1, 4, 8]}).hasSameTypeAndDiff(3)).toBe(false)
  expect(Tiles.of({'t': [1], 'b': [1]}).hasDiff(0)).toBe(true)
  expect(Tiles.of({'t': [1], 'b': [4], 'w': [7]}).hasDiff(3)).toBe(true)
  expect(Tiles.of({'t': [1], 'b': [4], 'w': [8]}).hasDiff(3)).toBe(false)

  expect(tiles.mostType).toEqual(['t', 5])
  expect(tiles.mostPoint).toEqual([1, 4])
  expect(tiles.count(new Tile('t', 1))).toBe(3)
})