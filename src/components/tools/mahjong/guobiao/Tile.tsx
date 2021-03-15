import {createBreakpoint} from "react-use";
import {Tile} from "../../../../tools/mahjong/guobiao/tile";

const useBreakpoint = createBreakpoint();

export const TileView = ({tile, scale = 0}: { tile: Tile | null, scale?: number }) => {
  const breakpoint = useBreakpoint();
  const s = scale || (breakpoint === 'tablet' ? 0.7 : 1)

  const offset = function () {
    if (tile === null) {
      return 0
    }
    switch (tile.type) {
      case "b":
        return -900 - tile.point * 50;
      case "t":
        return -tile.point * 50
      case "w":
        return -450 - tile.point * 50;
      case "z":
        return -1350 - tile.point * 50;
    }
  }()
  return (
    <div
      style={{
        backgroundImage: 'url(/tools/mahjong/guobiao/tiles.png)',
        width: 50 * s,
        height: 72 * s,
        backgroundPositionX: offset * s,
        backgroundSize: 2700 * s
      }}/>
  )
}