import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      blue: string;
      indigo: string;
      purple: string;
      pink: string;
      red: string;
      orange: string;
      yellow: string;
      green: string;
      teal: string;
      cyan: string;
      white: string;
      grayDark: string;
      primary: string;
      secondary: string;
      success: string;
      info: string;
      warning: string;
      danger: string;
      light: string;
      dark: string;
      inverse: string;
      gray: string;
      default: string;
      primaryLight: string;
      successLight: string;
      infoLight: string;
      warningLight: string;
      dangerLight: string;
    };
    fonts: {
      tiny: {
        fontFamily: string;
        MozOsxFontSmoothing: string;
        WebkitFontSmoothing: string;
        fontSize: string;
        fontWeight: number;
      };
      xSmall: {};
      small: {};
      smallPlus: {};
      medium: {};
      mediumPlus: {};
      large: {};
      xLarge: {
        fontFamily: string;
        MozOsxFontSmoothing: string;
        WebkitFontSmoothing: string;
        fontSize: string;
        fontWeight: number;
      };
      xLargePlus: {
        fontFamily: string;
        MozOsxFontSmoothing: string;
        WebkitFontSmoothing: string;
        fontSize: string;
        fontWeight: number;
      };
    };
    spacing: {
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
    };
    shadow: {
      elevation4: string;
      elevation8: string;
      elevation16: string;
      elevation64: string;
    };
  }
}
