import clsx from 'clsx';
import { Image } from 'common/components/Image';
import xdean from 'common/resources/logo.ico';
import xd from 'common/resources/xd.webp';
import { Dot } from './Dot';
import css from './index.module.css';

export const Home = () => {
  return (
    <div className={'flex flex-col items-center justify-center space-y-8'}>
      <div className={css.logoContainer}>
        <Image src={xdean} className={clsx(css.logo, css.xdean)}/>
        <Image src={xd} className={clsx(css.logo, css.xd)}/>
      </div>
      <div className={css.links}>
        <a href={'#about'}>关于我</a>
        <Dot/>
        <a href={'https://blog.xdean.cn'}>博客</a>
        <Dot/>
        <a href={'https://tutorial.xdean.cn'}>教程</a>
        <Dot/>
        <a href={'https://tool.xdean.cn'}>工具</a>
      </div>
    </div>
  );
};