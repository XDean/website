import clsx from 'clsx';
import Image from 'next/image';
import bg from 'public/bg.jpeg';
import bg2 from 'public/bg2.jpg';
import { FlipSlide } from '../../../../common/components/flipslide';
import css from './index.module.css';
import { Meeple } from './Meeple';

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
      <div className={'w-[256px] h-[256px]'}>
        <FlipSlide front={<Image src={bg}
                                 layout={'fill'}
                                 objectFit={'cover'}/>}
                   back={<Image src={bg2}
                                layout={'fill'}
                                objectFit={'cover'}/>}
        />
      </div>
    </div>
  );
};