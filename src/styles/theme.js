import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, green, blue } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5bd4a5',
    },
    secondary: {
      main: '#e9e2f2',
    },
  },
  status:{
      danger: deepOrange
  }
});