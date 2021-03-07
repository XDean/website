import {Button, Toolbar, Typography} from "@material-ui/core";
import {MyLink} from "./util/Link";

export const HeaderView = () => {
  return (
    <Toolbar>
      <MyLink href={'/'}>
        <Button variant={"text"} style={{marginLeft: 0}}>
          <Typography variant={'h3'}>
            XDean
          </Typography>
        </Button>
      </MyLink>
      <MyLink href={'/blog'}>
        <Button variant={"text"} style={{marginLeft: 30}}>
          <Typography variant={'h5'}>
            Blog
          </Typography>
        </Button>
      </MyLink>
      <MyLink href={'/tools'}>
        <Button variant={"text"} style={{marginLeft: 20}}>
          <Typography variant={'h5'}>
            工具箱
          </Typography>
        </Button>
      </MyLink>
      <MyLink href={'/about'}>
        <Button variant={"text"} style={{marginLeft: 20}}>
          <Typography variant={'h5'}>
            关于我
          </Typography>
        </Button>
      </MyLink>
    </Toolbar>
  )
}