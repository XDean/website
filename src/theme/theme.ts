import {createMuiTheme, Theme} from "@material-ui/core";

export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        "text-transform": "none"
      }
    }
  }
})