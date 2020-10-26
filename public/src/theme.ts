import { createMuiTheme, colors } from '@material-ui/core';
const theme = createMuiTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#3f51b5'
    },
    secondary: {
      main: '#3f51b5'
    },
    text: {
      primary: '#263238',
      secondary: '#546e7a'
    }
  },
  shadows: [
    'none',
    '0 0 0 1px rgba(63,63,68,0.05), 0 1px 2px 0 rgba(63,63,68,0.15)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 2px 2px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 8px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 5px 8px -2px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 6px 12px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 12px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 6px 16px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 7px 16px -4px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 8px 18px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 9px 18px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 10px 20px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 11px 20px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 12px 22px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 13px 22px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 14px 24px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 16px 28px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 18px 30px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 20px 32px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 22px 34px -8px rgba(0,0,0,0.25)',
    '0 0 1px 0 rgba(0,0,0,0.31), 0 24px 36px -8px rgba(0,0,0,0.25)'
  ],
  typography: {
    htmlFontSize: 10,
    h1: {
      fontWeight: 500,
      fontSize: '3.5rem',
      letterSpacing: '-0.24px'
    },
    h2: {
      fontWeight: 500,
      fontSize: '2.9rem',
      letterSpacing: '-0.24px'
    },
    h3: {
      fontWeight: 500,
      fontSize: '2.4rem',
      letterSpacing: '-0.06px'
    },
    h4: {
      fontWeight: 500,
      fontSize: '2rem',
      letterSpacing: '-0.06px'
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.6rem',
      letterSpacing: '-0.05px'
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.4rem'
    },
    body1: {
      fontWeight: 400,
      fontSize: '1.4rem'
    },
    overline: {
      fontWeight: 500
    }
  },
  overrides: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: '62.5%'
        },
        body: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          backgroundColor: '#f4f6f8'
        }
      }
    }
  }
});

console.log(theme);

export { theme };
