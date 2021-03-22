import {createMuiTheme} from "@material-ui/core";

export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        "text-transform": "none"
      }
    }
  }
})