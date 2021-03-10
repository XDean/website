import {MyLink} from "./util/Link";

export const HeaderView = () => {
  return (
    <div className={'pl-2 md:pl-6 py-1 md:py-2 shadow-lg bg-p text-s flex flex-row items-center'}>
      <img src={'favicon.ico'} alt={'favicon.ico'} className={'inline w-8 md:w-12 mr-2 md:mr-8'}/>
      <div className={'flex flex-row flex-grow items-center'}>
        <MyLink href={'/'} className={'text-2xl md:text-3xl mr-3 md:mr-8'}>
          主页
        </MyLink>
        <MyLink href={'/blog'} className={'text-2xl md:text-3xl mr-3 md:mr-8'}>
          博客
        </MyLink>
        <MyLink href={'/tools'} className={'text-2xl md:text-3xl mr-3 md:mr-8'}>
          工具箱
        </MyLink>
        <MyLink href={'/about'} className={'text-2xl md:text-3xl mr-3 md:mr-8'}>
          关于我
        </MyLink>
      </div>
    </div>
  )
}