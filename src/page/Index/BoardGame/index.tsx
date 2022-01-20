import { GiMeeple } from 'react-icons/gi';
import css from './index.module.css';

export const BoardGame = () => {
  return (
    <div className={'flex flex-col items-center font-mono'}>
      <div className={css.meepleContainer}>
        <GiMeeple className={css.meeple1}/>
        <GiMeeple className={css.meeple2}/>
        <GiMeeple className={css.meeple3}/>
      </div>

    </div>
  );
};