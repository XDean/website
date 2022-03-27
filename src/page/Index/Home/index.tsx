import clsx from 'clsx';
import { Image } from 'common/components/Image';
import xdean from 'common/resources/logo.ico';
import xd from 'common/resources/xd.webp';
import NextImage from 'next/image';
import { BiLinkExternal } from 'react-icons/bi';
import { Dot } from './Dot';
import css from './index.module.css';
import { Link } from './Link';

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
    <div className={'h-full w-full relative flex flex-col items-center justify-center'}>
      <NextImage src={img.url}
                 objectPosition={'center'}
                 objectFit={'cover'}
                 layout={'fill'}
                 className={'pointer-events-none select-none'}
      />
      {img.title &&
      <a className={'hidden md:block absolute z-50 left-2 bottom-2 px-1 text-sm opacity-60 text-gray-700 bg-gray-300 ' +
      'transition hover:underline hover:text-gray-300 hover:bg-gray-700 hover:opacity-95 cursor-pointer ' +
      'backdrop-opacity-50 backdrop-blur-3xl'}
         href={img.link}
         target={'_blank'}
      >
        {img.title}
        <BiLinkExternal className={'inline text-lg ml-2'}/>
      </a>}
      <div className={clsx('flex flex-col items-center justify-center relative',
        'p-4 rounded drop-shadow-2xl backdrop-opacity-50 backdrop-blur-3xl bg-white/10')}>
        <div className={css.logoContainer}>
          <Image src={xdean} className={clsx(css.logo, css.xdean)}/>
          <Image src={xd} className={clsx(css.logo, css.xd)}/>
        </div>
        <div className={'text-5xl pt-4 font-mono'}
             style={{
               textShadow: '0 0 2px white, 0 0 4px black',
             }}>
          许德安
        </div>
        <div className={'text-3xl pb-4 font-mono'}
             style={{
               textShadow: '0 0 2px white, 0 0 4px black',
             }}>
          XDean
        </div>
        <div className={'flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4 text-3xl'}>
          <Link link={'#about'} text={'关于我'}/>
          <Dot/>
          <Link link={'https://blog.xdean.cn'} targetBlank text={'博客'}/>
          <Dot/>
          <Link link={'https://tutorial.xdean.cn'} targetBlank text={'教程'}/>
          <Dot/>
          <Link link={'https://tool.xdean.cn'} targetBlank text={'百宝箱'}/>
        </div>
      </div>
    </div>
  );
};