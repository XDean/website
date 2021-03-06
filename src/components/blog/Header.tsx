import {MyLink, MyLinkProps} from "../util/Link";
import {Typography} from "@material-ui/core";

const MenuLink = ({label, ...rest}: MyLinkProps & { label: string }) => {
  return (
    <MyLink {...rest} mui={{style: {marginRight: 20}}}>
      <Typography variant={"h5"}>
        {label}
      </Typography>
    </MyLink>
  )
}

export const BlogHeaderView = () => {
  return (
    <div style={{display: 'flex'}}>
      <MenuLink href={'/blog/page/1'} label={'首页'}/>
      <MenuLink href={'/blog/archives/tag'} label={'标签'}/>
      <MenuLink href={'/blog/archives/category'} label={'分类'}/>
      <MenuLink href={'/blog/archives/year'} label={'归档'}/>
    </div>
  )
}