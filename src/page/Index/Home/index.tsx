import clsx from 'clsx';
import { Image } from 'common/components/Image';
import xdean from 'common/resources/logo.ico';
import xd from 'common/resources/xd.webp';
import NextImage from 'next/image';
import { BiLinkExternal } from 'react-icons/bi';
import { Dot } from './Dot';
import css from './index.module.css';

type Props = {
  img: {
    url: string
    title: string
    link: string
  }
}

export const Home = (props: Props) => {
  const {img} = props;
  return (
    <div className={'h-full w-full relative'}>
      <NextImage src={img.url}
                 objectPosition={'center'}
                 objectFit={'cover'}
                 layout={'fill'}
      />
      {img.title && <a className={'absolute z-50 left-2 bottom-2 text-gray-500 text-sm ' +
      'transition hover:underline hover:text-gray-300 cursor-pointer'}
                       href={img.link}
                       target={'_blank'}
      >
        {img.title}
        <BiLinkExternal className={'inline text-lg ml-2'}/>
      </a>}
      <div className={'h-full w-full flex flex-col items-center justify-center space-y-8 relative'}>
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
    </div>
  );
};