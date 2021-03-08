import {Toolbar, Typography} from "@material-ui/core";
import {MyLink} from "./util/Link";

export const HeaderView = () => {
  return (
    <Toolbar>
      <MyLink href={'/'} style={{marginLeft: 0}}>
        <Typography variant={'h3'}>
          XDean
        </Typography>
      </MyLink>
      <MyLink href={'/blog'} style={{marginLeft: 30}}>
        <Typography variant={'h5'}>
          Blog
        </Typography>
      </MyLink>
      <MyLink href={'/tools'} style={{marginLeft: 20}}>
        <Typography variant={'h5'}>
          工具箱
        </Typography>
      </MyLink>
      <MyLink href={'/about'} style={{marginLeft: 20}}>
        <Typography variant={'h5'}>
          关于我
        </Typography>
      </MyLink>
    </Toolbar>
  )
}