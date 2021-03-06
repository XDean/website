import {Divider, Typography} from "@material-ui/core";

export const NotFoundView = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      <div style={{display: 'flex', alignItems: 'center', width: 'max-content'}}>
        <Typography variant={"h4"}>404</Typography>
        <Divider orientation={"vertical"} style={{marginLeft: 20, marginRight: 20}}/>
        <Typography variant={"h5"}>
          页面找不到
        </Typography>
      </div>
    </div>
  )
}