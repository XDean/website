import {Toolbar, Typography} from "@material-ui/core";
import {MyLink} from "./util/Link";

export const HeaderView = () => {
  return (
    <Toolbar>
      <MyLink href={'/'} className={'text-3xl md:text-6xl font-bold'}>
        XDean
      </MyLink>
      <MyLink href={'/blog'} className={'text-xl md:text-2xl ml-4 md:ml-12'}>
        Blog
      </MyLink>
      <MyLink href={'/tools'} className={'text-xl md:text-2xl ml-2 md:ml-8'}>
        工具箱
      </MyLink>
      <MyLink href={'/about'} className={'text-xl md:text-2xl ml-2 md:ml-8'}>
        关于我
      </MyLink>
    </Toolbar>
  )
}