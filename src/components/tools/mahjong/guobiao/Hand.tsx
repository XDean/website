import {Hand, Ming} from "../../../../tools/mahjong/guobiao/type";
import {MingView} from "./Ming";
import {TileView} from "./Tile";
import {Tile} from "../../../../tools/mahjong/guobiao/tile";

export const HandView = ({hand, onTileClick, onMingClick}: {
  hand: Hand,
  onMingClick: (m: Ming) => void,
  onTileClick: (t: Tile) => void,
}) => {
  return (
    <div className={''}>
      <div className={'grid grid-cols-2 auto-rows-auto'}>
        {hand.mings.map((m, i) => (
          <div key={i}
               className={'m-1 md:m-2 cursor-pointer hover:scale-105 hover:z-10 transform relative active:scale-110 transition-transform'}
               onClick={() => onMingClick(m)}>
            <MingView ming={m}/>
          </div>
        ))}
      </div>
      <div className={'grid grid-cols-7 auto-rows-auto w-max m-2 gap-1'}>
        {hand.tiles.tiles.map((t, i) => (
          <div key={i}
               className={'inline-block cursor-pointer hover:scale-105 hover:z-10 transform relative active:scale-110 transition-transform'}
               onClick={() => onTileClick(t)}>
            <TileView tile={t}/>
          </div>
        ))}
      </div>
    </div>
  )
}