import { createGlobalStyle } from 'styled-components';

const theme = {
  palette: {
    blue: '#1870dc',
    indigo: '#6610f2',
    purple: '#a700ae',
    pink: '#e671b8',
    red: '#f45722',
    orange: '#f0af03',
    yellow: '#ffc107',
    green: '#58d777',
    teal: '#4ebfbb',
    cyan: '#17a2b8',
    white: '#f4f4f5',
    grayDark: '#3c484f',
    primary: '#1870dc',
    secondary: 'rgba(244,244,245,0.9)',
    success: '#58d777',
    info: '#4ebfbb',
    warning: '#f0af03',
    danger: '#f45722',
    light: '#f8f9fa',
    dark: '#495057',
    inverse: '#30314e',
    gray: '#595d78',
    default: '#474d84',
    primaryLight: '#dee4ee',
    successLight: '#ecfaec',
    infoLight: '#f2fafa',
    warningLight: '#fdf7e6',
    dangerLight: '#fff2ef'
  },
  fonts: {
    tiny: {
      fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif",
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontSize: '10px',
      fontWeight: 400
    },
    xSmall: {},
    small: {},
    smallPlus: {},
    medium: {},
    mediumPlus: {},
    large: {},
    xLarge: {
      fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif",
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontSize: '20px',
      fontWeight: 600
    },
    xLargePlus: {
      fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif",
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontSize: '24px',
      fontWeight: 600
    }
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 20,
    xl: 32
  },
  shadow: {
    elevation4: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
    elevation8: '0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)',
    elevation16: '0 6.4px 14.4px 0 rgba(0, 0, 0, 0.132), 0 1.2px 3.6px 0 rgba(0, 0, 0, 0.108)',
    elevation64: '0 25.6px 57.6px 0 rgba(0, 0, 0, 0.22), 0 4.8px 14.4px 0 rgba(0, 0, 0, 0.18)'
  }
};

export const GlobalStyle = createGlobalStyle`
html {
  line-height: 1.15; 
  -webkit-text-size-adjust: 100%; 
}


body {
  margin: 0;
}

main {
  display: block;
}


h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

hr {
  box-sizing: content-box; 
  height: 0; 
  overflow: visible; 
}

pre {
  font-family: monospace, monospace; 
  font-size: 1em; 
}
 

a {
  background-color: transparent;
}


abbr[title] {
  border-bottom: none; 
  text-decoration: underline; 
  text-decoration: underline dotted; 
}


b,
strong {
  font-weight: bolder;
}


code,
kbd,
samp {
  font-family: monospace, monospace; 
  font-size: 1em; 
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

img {
  border-style: none;
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; 
  font-size: 100%; 
  line-height: 1.15; 
  margin: 0; 
}

button,
input { 
  overflow: visible;
}

button,
select { 
  text-transform: none;
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

legend {
  box-sizing: border-box; 
  color: inherit; 
  display: table; 
  max-width: 100%; 
  padding: 0; 
  white-space: normal; 
}
 

progress {
  vertical-align: baseline;
}


textarea {
  overflow: auto;
}


[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; 
  padding: 0; 
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}


[type="search"] {
  -webkit-appearance: textfield; 
  outline-offset: -2px; 
}

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button; 
  font: inherit; 
}

details {
  display: block;
}

summary {
  display: list-item;
}

template {
  display: none;
}

[hidden] {
  display: none;
}
`;
export { theme };
/*
breakpoint-xs: 0;
breakpoint-sm: 576px;
breakpoint-md: 768px;
breakpoint-lg: 992px;
breakpoint-xl: 1200px;

      fontFamily: "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif",
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontSize: '18px',
      fontWeight: 400,

      font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace
 */
