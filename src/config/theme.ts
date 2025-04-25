'use client';

import { Link } from '@/navigation';
import { GlobalStylesProps, ThemeOptions, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const globalStyles: GlobalStylesProps['styles'] = (theme) => ({
  a: {
    textDecoration: 'none !important',
  },
  ':root': {
    '--swiper-pagination-color': '#000',
    '--swiper-navigation-color': '#000',
    '--swiper-navigation-size': '28px',
    '--color-icon-low-emphasis': theme.palette.grey[500],
    '--color-icon-medium-emphasis': theme.palette.grey[800],
    '--toastify-font-family': theme.typography.fontFamily,
  },
  '.swiper-button-next,.swiper-button-prev': {
    textShadow: '0px 0px 2px ' + grey[500],
    border: '1px solid',
    borderColor: theme.palette.divider,
    background: theme.palette.common.black,
    color: 'white',
    borderRadius: '50%',
    width: 36,
    height: 36,
    transform: 'translate(0, -50%)',
  },
  '.swiper-button-prev:after, .swiper-button-next:after': {
    fontSize: '0.7rem',
  },
  '.swiper-pagination': {
    left: '50% !important',
    transform: 'translateX(-50%)',
    width: 'fit-content !important',
    transition: 'all 200ms ease',
  },
  '.swiper-pagination-bullet.swiper-pagination-bullet-active': {
    width: 16,
    borderRadius: 8,
  },
});

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#0f4c75',
      dark: '#0a3f63',
      light: '#2878ad',
      contrastText: '#000',
    },
    secondary: {
      main: '#AE8625',
      dark: '#EDC967',
      light: '#F7EF8A',
      contrastText: '#000',
    },
    background: {
      default: '#fcfcfc',
      // paper: '#ffffff',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: '2.375rem',
      lineHeight: 1.21,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.27,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.33,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66,
    },
    overline: {
      lineHeight: 1.66,
    },
    button: {
      textTransform: 'capitalize',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: Link,
      },
    },
    MuiBottomNavigationAction: {
      defaultProps: {
        component: Link,
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
    @font-face {
      font-family: 'iransans';
      src: url('/assets/fonts/iransansWeb/woff/IRANSansWeb.woff') format('truetype');
    }
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 100;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum01Hairline.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum01Hairline.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum01Hairline.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum01Hairline.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 200;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum02Thin.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum02Thin.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum02Thin.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum02Thin.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 300;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum03Light.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum03Light.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum03Light.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum03Light.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 400;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum04Regular.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum04Regular.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum04Regular.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum04Regular.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 500;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum05Medium.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum05Medium.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum05Medium.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum05Medium.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 600;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum06Bold.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum06Bold.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum06Bold.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum06Bold.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 700;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum07Heavy.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum07Heavy.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum07Heavy.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum07Heavy.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 800;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum08Fat.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum08Fat.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum08Fat.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum08Fat.ttf")
        format("truetype");
    }
    `,
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1366,
      xl: 1536,
    },
  },
};

export const defaultTheme = createTheme({
  ...themeOptions,
});

export const persianTheme = createTheme({
  ...themeOptions,
  direction: 'rtl',
  typography: {
    fontFamily: "'iransans'," + defaultTheme.typography.fontFamily,
    ...themeOptions.typography,
  },
});
