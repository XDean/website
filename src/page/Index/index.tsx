import clsx from 'clsx';
import { useMemo } from 'react';
import { VscCode } from 'react-icons/vsc';
import { Image } from '../../../common/components/Image';
import logo from '../../../common/resources/logo.ico';
import githubIcon from '../../../public/about/github.webp';
import gmailIcon from '../../../public/about/gmail.webp';
import qqmailIcon from '../../../public/about/qqmail.webp';
import stackoverflowIcon from '../../../public/about/stackoverflow.webp';
import wechatIcon from '../../../public/about/wechat.webp';
import { Age } from './Age';
import avatar from './avatar.jpg';
import { CodeQuotes } from './data';
import { Dot } from './Dot';
import { IconLink } from './IconLink';
import css from './index.module.css';
import { Quotes } from './Quotes';
import { Wheel } from './Wheel';

const birth = new Date('1995-11-07');

export const Index = () => {
  return (
    <div className={'h-screen overflow-y-scroll snap-y scroll-smooth'}>
      <div id={'home'} className={clsx(css.page)}>
        <Image src={logo} width={180} className={'rounded-full shadow overflow-hidden'}/>
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
      <div id={'about'} className={clsx(css.page, css.about)}>
        <div className={'flex flex-col lg:flex-row items-center space-y-4 lg:space-x-4'}>
          <Image src={avatar} width={180} className={'rounded-full shadow overflow-hidden'}/>
          <div>
            <div className={'text-3xl mb-3'}>许德安 (XDean)</div>
            <ul className={'text-xl list-disc pl-8 leading-8'}>
              <li><Age birth={birth}/> 岁</li>
              <li>一只<a href={'#program'}>程序员</a></li>
              <li>一枚<a href={'#board-game'}>桌游爱好者</a></li>
              <li>半个<a href={'#game'}>游戏玩家</a></li>
              <li>一棵<a>芦苇</a></li>
            </ul>
          </div>
        </div>
        <div className={'flex items-center space-x-4'}>
          <IconLink href={'/about/wechat-qr.webp'}
                    blank
                    src={wechatIcon}
                    width={48}/>
          <IconLink href={'https://github.com/XDean'}
                    blank
                    src={githubIcon}
                    width={48}/>
          <IconLink href={'https://stackoverflow.com/users/7803527/dean-xu'}
                    blank
                    src={stackoverflowIcon}
                    width={48}/>
          <IconLink href={'mailto:373216024@qq.com'}
                    src={qqmailIcon}
                    width={48}/>
          <IconLink href={'mailto:xuda1107@gmail.com'}
                    src={gmailIcon}
                    width={48}/>
        </div>
      </div>
      <div id={'program'} className={clsx(css.page)}>
        <div className={'flex flex-col items-center font-mono'}>
          <VscCode size={180} className={'rounded-full shadow overflow-hidden'}/>
          <div className={css.helloWorld}>Hello World!</div>
          <div className={'flex flex-row items-center space-x-2 text-xl'}>
            <div>I like</div>
            <Wheel shuffle words={useMemo(() => [
              'Typescript',
              'Java',
              'RxJava',
              'React',
              'Next.js',
              'Spark',
              'Spring Boot',
              '42',
              'Git',
              'Github',
              'Vercel',
              'swr',
              'Tailwind CSS',
              'Golang',
              'IDEA',
              'thinking',
              <span className={'line-through'}>Python</span>,
            ], [])}/></div>
          <Quotes quotes={CodeQuotes}/>
        </div>
      </div>
      <div id={'board-game'} className={clsx(css.page)}>
      </div>
      <div id={'game'} className={clsx(css.page)}>
      </div>
    </div>
  );
};
