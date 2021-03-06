import {Typography} from "@material-ui/core";

export const FooterView = ()=>{
  return (
    <Typography variant={"caption"}>
      Copyright © 2020-{new Date().getFullYear()} Dean Xu. All Rights reserved.
    </Typography>
  )
}