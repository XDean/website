import clsx from 'clsx';
import css from './index.module.css';
import {Meeple} from './Meeple';

export const BoardGame = () => {
  return (
    <div className={'flex flex-col items-center font-sans '}>
      <div className={clsx(css.meepleContainer)}>
        <Meeple className={'text-red-500'}/>
        <Meeple className={'text-blue-500'}/>
        <Meeple className={'text-yellow-500'}/>
      </div>
      <div>
        <ul className={'list-disc text-2xl leading-10'}>
          <li>人形规则书</li>
          <li>村规发明家</li>
          <li>德策精算师</li>
          <li>嘴炮发动机</li>
          <li>闲鱼冤大头</li>
        </ul>
      </div>
      <div>

      </div>
    </div>
  );
};