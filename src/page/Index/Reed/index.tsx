import clsx from 'clsx';
import Image from 'next/image';
import { useHover } from 'react-use';
import reed from './reed.jpg';

export const Reed = () => {
  const [hoverEl, hover] = useHover(
    <span className={'transition-all hover:[text-shadow:0_0_2px_white,0_0_4px_red,0_0_6px_red]'}>思考</span>);
  return (
    <div className={'w-full h-full bg-cover relative overflow-hidden'}>
      <Image src={reed}
             objectPosition={'center'}
             objectFit={'cover'}
             layout={'fill'}
             className={clsx('transition-all -m-16',
               hover ? 'blur-none' : ' blur-[8px]')}
      />
      <div className={'absolute left-auto lg:w[500px] right-0 top-8 mx-4 px-4 py-2 text-white text-lg lg:text-2xl'}>
        <div className={'absolute top-0 left-0 w-16 h-8 border-white border-t-4 border-l-4 border-double'}/>
        <div className={'absolute bottom-0 right-0 w-16 h-8 border-white border-b-4 border-r-4 border-double'}/>
        <div>
          人，是会{hoverEl}的芦苇。
        </div>
        <div>
          Man is only a reed, the weakest in nature, but he is a thinking reed.
        </div>
        <div className={'text-right'}>
          —— 帕斯卡 《思想录》
        </div>
        <div className={'text-right pr-4 text-xs text-[#20367c55] animate-pulse'}>
          别问，我没看过
        </div>
      </div>
    </div>
  );
};