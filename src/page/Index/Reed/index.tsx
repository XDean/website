import reed from './reed.jpg';
import Image from '../../../../common/components/Image';
import css from './index.module.css';

export const Reed = () => {
  return (
    <div className={css.root}
         style={{
           backgroundImage: `url(${reed.src})`,
         }}
    >
      <div className={'absolute left-auto lg:w[500px] right-0 top-8 px-8 text-white text-lg lg:text-2xl'}>
        <div>
          人，是会思考的芦苇。
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