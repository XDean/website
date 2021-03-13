import {Hand} from "../../../../tools/mahjong/guobiao/type";
import {MingView} from "./Ming";
import {TileView} from "./Tile";

export const HandView = ({hand}: { hand: Hand }) => {
  return (
    <div className={''}>
      <div className={'grid grid-cols-2 auto-rows-auto'}>
        {hand.mings.map((m, i) => (
          <div key={i} className={'m-1 md:m-2'}>
            <MingView ming={m}/>
          </div>
        ))}
      </div>
      <div className={'grid grid-cols-7 auto-rows-auto w-max m-2 gap-1'}>
        {hand.tiles.tiles.map((t, i) => (
          <div key={i} className={'inline-block'}>
            <TileView tile={t}/>
          </div>
        ))}
      </div>
    </div>
  )
}