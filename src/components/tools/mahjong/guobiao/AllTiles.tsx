import {FengList, Tile, TileNumberTypes, TilePoints, YuanList} from "../../../../tools/mahjong/guobiao/type";
import {TileView} from "./Tile";
import {Button} from "@material-ui/core";

import {createBreakpoint} from "react-use";

const useBreakpoint = createBreakpoint();

export const AllTilesView = (
  {onTileClick}: { onTileClick: (tile: Tile) => void }
) => {
  const breakpoint = useBreakpoint();

  const TileButton = ({tile}: { tile: Tile }) => {
    return (
      <div className={'cursor-pointer hover:scale-125 hover:z-10 transform relative active:scale-150 transition-transform'} onClick={() => onTileClick(tile)}>
        <TileView tile={tile} scale={breakpoint === 'tablet' ? 0.7 : 1}/>
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