import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a4a4a4',
      main: '#757575',
      dark: '#494949',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffc947',
      main: '#ff9800',
      dark: '#c66900',
      contrastText: '#000',
    },
  },
  themeName: "Boulder Pizazz Beetle"
});

theme = responsiveFontSizes(theme);

export default theme;
