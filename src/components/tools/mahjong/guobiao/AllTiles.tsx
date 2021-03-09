import {FengList, Tile, TileNumberTypes, TilePoints, YuanList} from "../../../../tools/mahjong/guobiao/type";
import {TileView} from "./Tile";
import {Button} from "@material-ui/core";

export const AllTilesView = () => {

  const TileButton = ({tile}: { tile: Tile }) => {
    return (
      <TileView tile={tile}/>
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