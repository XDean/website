import { Image } from 'common/components/Image';
import githubIcon from 'public/about/github.webp';
import gmailIcon from 'public/about/gmail.webp';
import qqmailIcon from 'public/about/qqmail.webp';
import stackoverflowIcon from 'public/about/stackoverflow.webp';
import wechatIcon from 'public/about/wechat.webp';
import { Age } from './Age';
import avatar from './avatar.jpg';
import { IconLink } from './IconLink';
import css from './index.module.css';
import { Link } from './Link';

const birth = new Date('1995-11-07');

export const About = () => {
  return (
    <div className={'flex flex-col items-center justify-center space-y-8'}>
      <div className={'flex flex-col lg:flex-row items-center space-y-4 lg:space-x-4'}>
        <Image src={avatar} width={180} className={'rounded-full shadow overflow-hidden'}/>
        <div>
          <div className={'text-3xl mb-3'}>许德安 (XDean)</div>
          <ul className={css.list}>
            <li><Age birth={birth}/> 岁</li>
            <li><Link link={'#coding'} text={'程序员'}/></li>
            <li><Link link={'#board-game'} text={'桌游玩家'}/></li>
            <li><Link link={'#cook'} text={'美食爱好者'}/></li>
            <li><Link link={'#reed'} text={'芦苇'}/></li>
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
  );
};