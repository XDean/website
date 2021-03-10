import {MyLink, MyLinkProps} from "../util/Link";
import {Divider, Typography} from "@material-ui/core";

const MenuLink = ({label, ...rest}: MyLinkProps & { label: string }) => {
  return (
    <MyLink {...rest} className={'mr-2 md:mr-3 text-2xl md:text-3xl md:mt-4'}>
      {label}
    </MyLink>
  )
}

export const BlogHeaderView = () => {
  return (
    <>
      <div className={'flex ml-1'}>
        <MenuLink href={'/blog/page/1'} label={'首页'}/>
        <MenuLink href={'/blog/archives/tag'} label={'标签'}/>
        <MenuLink href={'/blog/archives/category'} label={'分类'}/>
        <MenuLink href={'/blog/archives/year'} label={'归档'}/>
      </div>
      <Divider className={'mt-1'}/>
    </>
  )
}