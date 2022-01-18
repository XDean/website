import clsx from 'clsx';
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
import { Dot } from './Dot';
import { IconLink } from './IconLink';
import css from './index.module.css';

const birth = new Date('1995-11-07');

export const Index = () => {
  return (
    <div className={'h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth'}>
      <div className={clsx(css.page)}>
        <Image src={logo} width={180} className={'rounded-full shadow overflow-hidden'}/>
        <div className={css.links}>
          <a href={'https://blog.xdean.cn'}>博客</a>
          <Dot/>
          <a href={'https://tutorial.xdean.cn'}>教程</a>
          <Dot/>
          <a href={'https://tools.xdean.cn'}>工具</a>
          <Dot/>
          <a href={'#about'}>关于</a>
        </div>
      </div>
      <div id={'about'} className={clsx(css.page)}>
        <div className={'flex flex-col lg:flex-row items-center space-y-4 lg:space-x-4'}>
          <Image src={avatar} width={180} className={'rounded-full shadow overflow-hidden'}/>
          <ul className={'text-xl list-disc pl-8 leading-8'}>
            <li>许德安 (XDean)</li>
            <li><Age birth={birth}/> 岁</li>
            <li>一只程序员</li>
            <li>一枚桌游爱好者</li>
            <li>半个游戏玩家(前朝遗老)</li>
            <li>一棵芦苇</li>
          </ul>
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
      <div id={'about'} className={clsx(css.page)}>
        <div className={'flex flex-col items-center'}>
          <VscCode size={180} className={'rounded-full shadow overflow-hidden'}/>
          <div className={css.helloWorld}>Hello World!</div>
          <div>I like Typescript</div>
        </div>
      </div>
    </div>
  );
};