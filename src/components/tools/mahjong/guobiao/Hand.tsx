import {Hand} from "../../../../tools/mahjong/guobiao/type";
import {MingView} from "./Ming";

export const HandView = ({hand}: { hand: Hand }) => {
  return (
    <div className={''}>
      <div className={'grid grid-cols-2 auto-rows-auto'}>
        {hand.mings.map((m, i) => (
          <div className={'m-1 md:m-2'}>
            <MingView key={i} ming={m}/>
          </div>
        ))}
        {hand.count}
      </div>
    </div>
  )
}