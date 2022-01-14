import { Image } from '../../../common/components/Image';
import avatar from './avatar.jpg';
import css from './index.module.css';

export const Index = () => {
  return (
    <div className={''}>
      <div className={'h-screen flex flex-col items-center justify-center space-y-4'}>
        <Image src={avatar} width={180} className={'rounded-full shadow overflow-hidden'}/>
        <div className={'text-6xl'}>XDean</div>
        <div className={css.links}>
          <a href={'https://blog.xdean.cn'}>博客</a>
          <a href={'https://tutorial.xdean.cn'}>教程</a>
          <a href={'https://tools.xdean.cn'}>工具</a>
          <a href={'#about'}>关于</a>
        </div>
      </div>
      <div className={'h-screen bg-black'}>

      </div>
    </div>
  );
};