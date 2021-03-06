import {AppBar, Button, Tab, Tabs, Toolbar, Typography} from "@material-ui/core";
import Link from 'next/link'

export const HeaderView = () => {
  return (
    <Toolbar>
      <Link href={'/'}>
        <Button variant={"text"} style={{marginLeft: 0}}>
          <Typography variant={'h3'}>
            XDean
          </Typography>
        </Button>
      </Link>
      <Link href={'/blog'}>
        <Button variant={"text"} style={{marginLeft: 30}}>
          <Typography variant={'h5'}>
            Blog
          </Typography>
        </Button>
      </Link>
      <Link href={'/tools'}>
        <Button variant={"text"} style={{marginLeft: 20}}>
          <Typography variant={'h5'}>
            工具箱
          </Typography>
        </Button>
      </Link>
      <Link href={'/about'}>
        <Button variant={"text"} style={{marginLeft: 20}}>
          <Typography variant={'h5'}>
            关于我
          </Typography>
        </Button>
      </Link>
    </Toolbar>
  )
}