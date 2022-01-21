import clsx from 'clsx';
import css from './index.module.css';
import { Meeple } from './Meeple';

export const BoardGame = () => {
  return (
    <div className={'flex flex-col items-center font-mono'}>
      <div className={clsx(css.meepleContainer)}>
        <Meeple className={'text-red-500'}/>
        <Meeple className={'text-blue-500'}/>
        <Meeple className={'text-yellow-500'}/>
      </div>
    </div>
  );
};