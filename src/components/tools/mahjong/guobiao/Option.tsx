import {Options} from "../../../../tools/mahjong/guobiao/type";
import clsx from "clsx";
import {TilePoint} from "../../../../tools/mahjong/guobiao/tile";

export const OptionView = (
  {
    options,
    onOptionsChange
  }: {
    options: Options,
    onOptionsChange: (o: Options) => void
  }
) => {
  const BoolButton = ({label, field}: { label: string, field: keyof Options }) => (
    <button onClick={() => onOptionsChange({...options, [field]: !options[field]})}
            className={clsx('px-0.5 md:px-2 py-1 rounded-lg border-2 w-12 md:w-20 border-opacity-0',
              {'bg-blue-500 text-white shadow-lg font-bold': options[field]})}>
      {label}
    </button>
  )
  return (
    <div className={'flex flex-row items-center justify-between mb-2'}>
      <BoolButton label={'自摸'} field={"zimo"}/>
      <BoolButton label={'绝张'} field={"juezhang"}/>
      <BoolButton label={'杠开'} field={"gangShang"}/>
      <BoolButton label={'海底'} field={"lastTile"}/>
      <button onClick={() => onOptionsChange({...options, menfeng: (options.menfeng % 4 + 1) as TilePoint})}
              className={clsx('px-0.5 md:px-2 py-1 rounded-lg border-2 w-12 md:w-20 border-opacity-0')}>
        {fengStr(options.menfeng)}风
      </button>
      <button onClick={() => onOptionsChange({...options, quanfeng: (options.quanfeng % 4 + 1) as TilePoint})}
              className={clsx('px-0.5 md:px-2 py-1 rounded-lg border-2 w-12 md:w-20 border-opacity-0')}>
        {fengStr(options.quanfeng)}局
      </button>
    </div>
  )
}

function fengStr(point: TilePoint) {
  return '东南西北'[point - 1]
}