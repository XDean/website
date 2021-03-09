import {Tile} from "../../../../tools/mahjong/guobiao/type";

export const TileView = ({tile}: { tile: Tile }) => {
  const offset = function () {
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
    <div style={{
      backgroundImage: 'url(/tools/mahjong/guobiao/tiles.png)',
      width: 50,
      height: 72,
      backgroundPositionX: offset,
    }}/>
  )
}