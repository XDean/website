import {FengList, Tile, TileNumberTypes, TilePoints, Tiles, YuanList} from "../../../../tools/mahjong/guobiao/type";
import {TileView} from "./Tile";
import clsx from "clsx";

export const AllTilesView = (
  {onTileClick, disabledTiles}: {
    onTileClick: (tile: Tile) => void,
    disabledTiles: Tiles
  }
) => {

  const TileButton = ({tile}: { tile: Tile }) => {
    const disabled = tile.in(disabledTiles.tiles)
    return (
      <div
        className={clsx({'opacity-50': disabled},
          'cursor-pointer hover:scale-125 hover:z-10 transform relative active:scale-150 transition-transform')}
        onClick={() => !disabled && onTileClick(tile)}>
        <TileView tile={tile}/>
      </div>
    )
  }

  return (
    <table>
      <tbody>
      {TileNumberTypes.map(t => (
        <tr key={t}>
          {TilePoints.map(p => (
            <td key={p}>
              <TileButton tile={new Tile(t, p)}/>
            </td>
          ))}
        </tr>
      ))}
      <tr>
        {FengList.map(t => (
          <td key={t.point}>
            <TileButton tile={t}/>
          </td>
        ))}
        {YuanList.map(t => (
          <td key={t.point}>
            <TileButton tile={t}/>
          </td>
        ))}
      </tr>
      </tbody>
    </table>
  )
}