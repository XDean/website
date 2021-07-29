import {MyLink} from "./util/Link";
import {useState} from "react";
import {GithubLogo} from "./util/GithubLogo";
import {Logo} from "./util/Logo";

export const HeaderView = () => {
  return (
    <div className={'pl-2 md:pl-6 py-1 md:py-2 shadow-lg bg-bg text-text flex flex-row items-center'}>
      <Logo className={'inline w-8 h-8 md:w-12 md:h-12 mr-2 md:mr-8'}/>
      <div className={'flex flex-row flex-grow items-center text-xl md:text-3xl'}>
        <MyLink href={'/blog'} className={'mr-3 md:mr-8'}>
          博客
        </MyLink>
        <MyLink href={'https://tutorial.xdean.cn'} className={'mr-3 md:mr-8'} target={'_blank'} rel={'noopener'}>
          教程
        </MyLink>
        <MyLink href={'/tools'} className={'mr-3 md:mr-8'}>
          工具箱
        </MyLink>
        <MyLink href={'/about'} className={'mr-3 md:mr-8'}>
          关于我
        </MyLink>
      </div>
      <div className={'mr-1 md:mr-4'}>
        <a href={'https://github.com/XDean/website'} target={'_blank'} rel={'noopener'}>
          <GithubLogo className={'h-7 w-7 text-gray-500'}/>
        </a>
      </div>
    </div>
  )
}